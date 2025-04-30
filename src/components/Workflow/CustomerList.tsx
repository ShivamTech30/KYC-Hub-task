import React, { useState } from 'react';
import { List, Avatar, Tag, Space, Typography, Input, Select } from 'antd';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import { Customer } from '../../types';
import { getRiskColor, getRiskCategory } from '../../utils/riskCalculator';

const { Text, Title } = Typography;
const { Search } = Input;
const { Option } = Select;

interface CustomerListProps {
  customers: Customer[];
  selectedCustomerId: string | null;
  onSelectCustomer: (customerId: string) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ 
  customers, 
  selectedCustomerId, 
  onSelectCustomer 
}) => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [riskFilter, setRiskFilter] = useState<string | null>(null);
  
  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0 
    }).format(value);
  };
  
  // Filter customers
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = !searchText || 
      customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
      customer.customerId.toLowerCase().includes(searchText.toLowerCase());
      
    const matchesStatus = !statusFilter || customer.status === statusFilter;
    
    const matchesRisk = !riskFilter || getRiskCategory(customer.riskScore || 0) === riskFilter;
    
    return matchesSearch && matchesStatus && matchesRisk;
  });
  
  return (
    <div>
      <Title level={4} style={{ marginBottom: 16 }}>Customer Queue</Title>
      
      <Space direction="vertical" style={{ width: '100%', marginBottom: 16 }}>
        <Search
          placeholder="Search by name or ID"
          allowClear
          enterButton
          prefix={<SearchOutlined />}
          onSearch={value => setSearchText(value)}
          onChange={e => setSearchText(e.target.value)}
        />
        
        <Space>
          <Select
            placeholder="Filter by status"
            style={{ width: 150 }}
            allowClear
            onChange={value => setStatusFilter(value)}
          >
            <Option value="Review">Review</Option>
            <Option value="Approved">Approved</Option>
            <Option value="Rejected">Rejected</Option>
          </Select>
          
          <Select
            placeholder="Filter by risk"
            style={{ width: 150 }}
            allowClear
            onChange={value => setRiskFilter(value)}
          >
            <Option value="low">Low Risk</Option>
            <Option value="medium">Medium Risk</Option>
            <Option value="high">High Risk</Option>
            <Option value="critical">Critical Risk</Option>
          </Select>
        </Space>
      </Space>
      
      <List
        dataSource={filteredCustomers}
        renderItem={customer => (
          <List.Item
            key={customer.customerId}
            style={{ 
              cursor: 'pointer',
              padding: '12px',
              backgroundColor: selectedCustomerId === customer.customerId ? '#e6f7ff' : 'white',
              borderLeft: selectedCustomerId === customer.customerId ? '3px solid #1890ff' : 'none',
              transition: 'all 0.3s'
            }}
            onClick={() => onSelectCustomer(customer.customerId)}
          >
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{customer.name}</span>
                  <Tag color={
                    customer.status === 'Approved' ? 'green' : 
                    customer.status === 'Rejected' ? 'red' : 'blue'
                  }>
                    {customer.status}
                  </Tag>
                </div>
              }
              description={
                <Space direction="vertical" size={2} style={{ width: '100%' }}>
                  <Text type="secondary">ID: {customer.customerId}</Text>
                  <Space>
                    <Text>Income: {formatCurrency(customer.monthlyIncome)}</Text>
                    <Text>Expenses: {formatCurrency(customer.monthlyExpenses)}</Text>
                  </Space>
                </Space>
              }
            />
            <Tag color={getRiskColor(customer.riskScore || 0)} style={{ fontSize: '14px' }}>
              {customer.riskScore ?? 'N/A'}
            </Tag>
          </List.Item>
        )}
      />
    </div>
  );
};

export default CustomerList;