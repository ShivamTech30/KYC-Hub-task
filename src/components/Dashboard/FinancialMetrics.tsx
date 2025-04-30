import React from 'react';
import { Row, Col, Card, Statistic, Typography } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { DollarSign, CreditCard, TrendingUp, Wallet } from 'lucide-react';
import { Customer } from '../../types';
import { calculateFinancialMetrics } from '../../utils/chartData';

const { Title } = Typography;

interface FinancialMetricsProps {
  customers: Customer[];
}

const FinancialMetrics: React.FC<FinancialMetricsProps> = ({ customers }) => {
  const metrics = calculateFinancialMetrics(customers);
  
  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0 
    }).format(value);
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <Title level={4} style={{ marginBottom: 16 }}>Financial Overview</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card  variant="borderless" style={{ height: '100%' }}>
            <Statistic
              title="Total Monthly Income"
              value={metrics.totalIncome}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={<DollarSign size={20} style={{ verticalAlign: 'middle' }} />}
              suffix={
                <span style={{ fontSize: '14px', color: '#3f8600' }}>
                  <ArrowUpOutlined /> {metrics.incomeGrowth}%
                </span>
              }
              formatter={(value) => formatCurrency(value as number)}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card  variant="borderless" style={{ height: '100%' }}>
            <Statistic
              title="Total Monthly Expenses"
              value={metrics.totalExpenses}
              precision={0}
              valueStyle={{ color: '#cf1322' }}
              prefix={<Wallet size={20} style={{ verticalAlign: 'middle' }} />}
              suffix={
                <span style={{ fontSize: '14px', color: '#cf1322' }}>
                  <ArrowUpOutlined /> {metrics.expenseGrowth}%
                </span>
              }
              formatter={(value) => formatCurrency(value as number)}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card  variant="borderless" style={{ height: '100%' }}>
            <Statistic
              title="Outstanding Loans"
              value={metrics.totalLoans}
              precision={0}
              valueStyle={{ color: '#1890ff' }}
              prefix={<CreditCard size={20} style={{ verticalAlign: 'middle' }} />}
              suffix={
                <span style={{ fontSize: '14px', color: '#3f8600' }}>
                  <ArrowDownOutlined /> {Math.abs(metrics.loanGrowth)}%
                </span>
              }
              formatter={(value) => formatCurrency(value as number)}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card  variant="borderless" style={{ height: '100%' }}>
            <Statistic
              title="Average Income"
              value={metrics.averageIncome}
              precision={0}
              valueStyle={{ color: '#722ed1' }}
              prefix={<TrendingUp size={20} style={{ verticalAlign: 'middle' }} />}
              formatter={(value) => formatCurrency(value as number)}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FinancialMetrics;