import React, { useState, useEffect } from 'react';
import { Layout, Typography, Select, Spin, Alert, Button, Empty, Space } from 'antd';
import { fetchCustomers } from '../api';
import { Customer } from '../types';
import { enrichCustomersWithRiskScores } from '../utils/riskCalculator';

// Components
import RiskScoreCard from '../components/RiskAssessment/RiskScoreCard';
import RepaymentHistoryCard from '../components/RiskAssessment/RepaymentHistoryCard';

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const RiskAssessmentPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchCustomers();
        console.log(data)
        
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
  }, [selectedCustomerId]);
  
  const selectedCustomer = customers.find(c => c.customerId === selectedCustomerId);
  
  const handleCustomerChange = (value: string) => {
    setSelectedCustomerId(value);
  };
  
  const handleNextCustomer = () => {
    if (!selectedCustomerId || customers.length === 0) return;
    
    const currentIndex = customers.findIndex(c => c.customerId === selectedCustomerId);
    const nextIndex = (currentIndex + 1) % customers.length;
    setSelectedCustomerId(customers[nextIndex].customerId);
  };
  
  const handlePrevCustomer = () => {
    if (!selectedCustomerId || customers.length === 0) return;
    
    const currentIndex = customers.findIndex(c => c.customerId === selectedCustomerId);
    const prevIndex = (currentIndex - 1 + customers.length) % customers.length;
    setSelectedCustomerId(customers[prevIndex].customerId);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Spin size="large" tip="Loading customer data..." />
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
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 24 
      }}>
        <Title level={2}>Risk Assessment</Title>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Button onClick={handlePrevCustomer}>Previous</Button>
          
          <Select
            showSearch
            style={{ width: 280 }}
            placeholder="Select a customer"
            optionFilterProp="children"
            value={selectedCustomerId}
            onChange={handleCustomerChange}
            filterOption={(input, option) =>
              (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
            }
          >
            {customers.map(customer => (
              <Option key={customer.customerId} value={customer.customerId}>
                {customer.name} (ID: {customer.customerId})
              </Option>
            ))}
          </Select>
          
          <Button onClick={handleNextCustomer}>Next</Button>
        </div>
      </div>
      
      {selectedCustomer ? (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <RiskScoreCard customer={selectedCustomer} />
          <RepaymentHistoryCard customer={selectedCustomer} />
        </Space>
      ) : (
        <Empty description="No customer selected" />
      )}
    </Content>
  );
};

export default RiskAssessmentPage;