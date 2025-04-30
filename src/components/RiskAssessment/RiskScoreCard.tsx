import React from 'react';
import { Card, Progress, Typography, Tooltip, Space, List, Statistic, Row, Col } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Activity, AlertTriangle, BarChart2, CheckCircle } from 'lucide-react';
import { Customer } from '../../types';
import { getRiskColor, getRiskCategory } from '../../utils/riskCalculator';

const { Title, Text, Paragraph } = Typography;

interface RiskScoreCardProps {
  customer: Customer;
}

const RiskScoreCard: React.FC<RiskScoreCardProps> = ({ customer }) => {
  const riskScore = customer.riskScore || 0;
  const riskColor = getRiskColor(riskScore);
  const riskCategory = getRiskCategory(riskScore);
  
  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0 
    }).format(value);
  };
  
  // Calculate loan to income ratio
  const annualIncome = customer.monthlyIncome * 12;
  const loanToIncomeRatio = (customer.outstandingLoans / annualIncome) * 100;
  
  // Calculate payment success rate
  const paymentHistory = customer.loanRepaymentHistory;
  const successRate = (paymentHistory.filter(payment => payment === 1).length / paymentHistory.length) * 100;
  
  // Risk factors to display
  const riskFactors = [
    {
      title: 'Credit Score',
      value: customer.creditScore,
      icon: <BarChart2 size={16} />,
      status: customer.creditScore >= 700 ? 'good' : customer.creditScore >= 650 ? 'medium' : 'poor',
      tooltip: 'Credit score ranges: Excellent (750+), Good (700-749), Fair (650-699), Poor (below 650)',
    },
    {
      title: 'Loan to Income Ratio',
      value: `${loanToIncomeRatio.toFixed(1)}%`,
      icon: <Activity size={16} />,
      status: loanToIncomeRatio <= 20 ? 'good' : loanToIncomeRatio <= 40 ? 'medium' : 'poor',
      tooltip: 'Lower ratios indicate less debt burden relative to income. Under 20% is ideal.',
    },
    {
      title: 'Payment Success Rate',
      value: `${successRate.toFixed(0)}%`,
      icon: <CheckCircle size={16} />,
      status: successRate >= 80 ? 'good' : successRate >= 60 ? 'medium' : 'poor',
      tooltip: 'Percentage of loan payments made on time. Higher is better.',
    },
    {
      title: 'Outstanding Loans',
      value: formatCurrency(customer.outstandingLoans),
      icon: <AlertTriangle size={16} />,
      status: customer.outstandingLoans <= 10000 ? 'good' : customer.outstandingLoans <= 30000 ? 'medium' : 'poor',
      tooltip: 'Total amount of current outstanding loans.',
    },
  ];

  // Get appropriate text for risk level
  const getRiskText = () => {
    switch (riskCategory) {
      case 'low':
        return 'Low risk. This customer has good credit history and financial stability.';
      case 'medium':
        return 'Medium risk. This customer has some risk factors to monitor.';
      case 'high':
        return 'High risk. This customer has significant risk factors that need attention.';
      case 'critical':
        return 'Critical risk. This customer has serious risk factors requiring immediate action.';
      default:
        return '';
    }
  };

  return (
    <Card 
      title={<Title level={4}>{customer.name} - Risk Assessment</Title>}
      variant="borderless"
      style={{ marginBottom: 24 }}
    >
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <Progress 
              type="dashboard"
              percent={riskScore}
              format={(percent) => `${percent}`}
              strokeColor={riskColor}
              strokeWidth={8}
              width={180}
            />
            <div style={{ marginTop: 16 }}>
              <Title level={4} style={{ textTransform: 'capitalize', color: riskColor }}>
                {riskCategory} Risk
              </Title>
              <Paragraph>{getRiskText()}</Paragraph>
            </div>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <Title level={5}>Financial Health Factors</Title>
          <List
            itemLayout="horizontal"
            dataSource={riskFactors}
            renderItem={item => (
              <List.Item>
                <Space>
                  <span style={{ color: item.status === 'good' ? '#52c41a' : item.status === 'medium' ? '#faad14' : '#f5222d' }}>
                    {item.icon}
                  </span>
                  <div>
                    <Space>
                      <Text>{item.title}</Text>
                      <Tooltip title={item.tooltip}>
                        <InfoCircleOutlined style={{ color: '#bbb' }} />
                      </Tooltip>
                    </Space>
                  </div>
                </Space>
                <Text 
                  strong 
                  style={{ 
                    color: item.status === 'good' ? '#52c41a' : item.status === 'medium' ? '#faad14' : '#f5222d'
                  }}
                >
                  {item.value}
                </Text>
              </List.Item>
            )}
          />
        </Col>
      </Row>
      
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Statistic 
            title="Monthly Income" 
            value={customer.monthlyIncome} 
            precision={0}
            formatter={(value) => formatCurrency(value as number)}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Statistic 
            title="Monthly Expenses" 
            value={customer.monthlyExpenses} 
            precision={0}
            formatter={(value) => formatCurrency(value as number)}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Statistic 
            title="Account Balance" 
            value={customer.accountBalance} 
            precision={0}
            formatter={(value) => formatCurrency(value as number)}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Statistic 
            title="Customer Status" 
            value={customer.status}
            valueStyle={{ color: customer.status === 'Approved' ? '#52c41a' : customer.status === 'Rejected' ? '#f5222d' : '#1890ff' }}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default RiskScoreCard;