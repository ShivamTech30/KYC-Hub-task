import React, { useState } from 'react';
import { Table, Tag, Typography, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Customer } from '../../types';
import { getRiskColor, getRiskCategory } from '../../utils/riskCalculator';

const { Title } = Typography;

interface CustomerTableProps {
  customers: Customer[];
}

const CustomerTable: React.FC<CustomerTableProps> = ({ customers }) => {
  
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0 
    }).format(value);
  };

  console.log(customers)

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value: string, record: any) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
  });

  const handleSearch = (selectedKeys: React.Key[], confirm: () => void, dataIndex: string) => {
    confirm();
    setSearchText(selectedKeys[0] as string);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const columns = [
    {
      title: 'Customer ID',
      dataIndex: 'customerId',
      key: 'customerId',
      ...getColumnSearchProps('customerId'),
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Monthly Income',
      dataIndex: 'monthlyIncome',
      key: 'monthlyIncome',
      sorter: (a: Customer, b: Customer) => a.monthlyIncome - b.monthlyIncome,
      render: (income: number) => formatCurrency(income),
    },
    {
      title: 'Credit Score',
      dataIndex: 'creditScore',
      key: 'creditScore',
      sorter: (a: Customer, b: Customer) => a.creditScore - b.creditScore,
    },
    {
      title: 'Outstanding Loans',
      dataIndex: 'outstandingLoans',
      key: 'outstandingLoans',
      sorter: (a: Customer, b: Customer) => a.outstandingLoans - b.outstandingLoans,
      render: (loans: number) => formatCurrency(loans),
    },
    {
      title: 'Risk Score',
      dataIndex: 'riskScore',
      key: 'riskScore',
      sorter: (a: Customer, b: Customer) => (a.riskScore || 0) - (b.riskScore || 0),
      render: (score: number) => {
        const category = getRiskCategory(score);
        const color = getRiskColor(score);
        return (
          <Tag color={color} style={{ fontWeight: 'bold' }}>
            {score} - {category.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Review', value: 'Review' },
        { text: 'Approved', value: 'Approved' },
        { text: 'Rejected', value: 'Rejected' },
      ],
      onFilter: (value: string, record: Customer) => record.status === value,
      render: (status: string) => {
        let color = '';
        switch (status) {
          case 'Review':
            color = 'blue';
            break;
          case 'Approved':
            color = 'green';
            break;
          case 'Rejected':
            color = 'red';
            break;
          default:
            color = 'default';
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <div style={{ marginBottom: 24 }}>
      <Title level={4} style={{ marginBottom: 16 }}>Customer Data</Title>
      <Table 
        columns={columns} 
        dataSource={customers}
        rowKey="customerId"
        pagination={{ pageSize: 5 }}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default CustomerTable;