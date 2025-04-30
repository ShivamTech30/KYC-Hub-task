import React, { useState, useEffect } from 'react';
import { Layout, Typography, Row, Col, Spin, Alert, Empty } from 'antd';
import { fetchCustomers } from '../api';
import { Customer, StatusType } from '../types';
import { enrichCustomersWithRiskScores } from '../utils/riskCalculator';

// Components
import CustomerList from '../components/Workflow/CustomerList';
import CustomerStatusForm from '../components/Workflow/CustomerStatusForm';
import RiskScoreCard from '../components/RiskAssessment/RiskScoreCard';

const { Content } = Layout;
const { Title } = Typography;

const WorkflowPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchCustomers();
        
        // Add risk scores to customers
        const enrichedCustomers = enrichCustomersWithRiskScores(data);
        setCustomers(enrichedCustomers);
        
        // Select first customer by default
        if (enrichedCustomers.length > 0 && !selectedCustomerId) {
          setSelectedCustomerId(enrichedCustomers[0].customerId);
        }
      } catch (err) {
        console.error('Error loading customers:', err);
        setError('Failed to load customer data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  const handleSelectCustomer = (customerId: string) => {
    setSelectedCustomerId(customerId);
  };
  
  const handleStatusUpdated = (customerId: string, newStatus: StatusType) => {
    setCustomers(prev => prev.map(customer => 
      customer.customerId === customerId 
        ? { ...customer, status: newStatus } 
        : customer
    ));
  };
  
  const selectedCustomer = customers.find(c => c.customerId === selectedCustomerId);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Spin size="large" tip="Loading workflow data..." />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        style={{ maxWidth: '800px', margin: '100px auto' }}
      />
    );
  }

  return (
    <Content style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
      <Title level={2}>Workflow Management</Title>
      
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <CustomerList 
            customers={customers} 
            selectedCustomerId={selectedCustomerId} 
            onSelectCustomer={handleSelectCustomer} 
          />
        </Col>
        
        <Col xs={24} lg={16}>
          {selectedCustomer ? (
            <>
              <RiskScoreCard customer={selectedCustomer} />
              <CustomerStatusForm 
                customer={selectedCustomer}
                onStatusUpdated={handleStatusUpdated}
              />
            </>
          ) : (
            <Empty description="Select a customer to view details" />
          )}
        </Col>
      </Row>
    </Content>
  );
};

export default WorkflowPage;