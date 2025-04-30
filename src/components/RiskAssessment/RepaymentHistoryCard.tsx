import React from 'react';
import { Card, Typography, Tag, Space } from 'antd';
import { CheckCircle, XCircle } from 'lucide-react';
import { Customer } from '../../types';

const { Title, Paragraph } = Typography;

interface RepaymentHistoryCardProps {
  customer: Customer;
}

const RepaymentHistoryCard: React.FC<RepaymentHistoryCardProps> = ({ customer }) => {
  const { loanRepaymentHistory } = customer;
  
  // Calculate consecutive on-time payments
  const getConsecutivePayments = () => {
    let current = 0;
    let max = 0;
    
    for (const payment of loanRepaymentHistory) {
      if (payment === 1) {
        current++;
        max = Math.max(max, current);
      } else {
        current = 0;
      }
    }
    
    return max;
  };
  
  // Calculate streak of on-time payments (current streak)
  const getCurrentStreak = () => {
    let streak = 0;
    
    for (let i = loanRepaymentHistory.length - 1; i >= 0; i--) {
      if (loanRepaymentHistory[i] === 1) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };
  
  const consecutivePayments = getConsecutivePayments();
  const currentStreak = getCurrentStreak();
  
  // Get the count of on-time and late payments
  const onTimeCount = loanRepaymentHistory.filter(payment => payment === 1).length;
  const lateCount = loanRepaymentHistory.filter(payment => payment === 0).length;
  
  // Calculate success rate
  const successRate = (onTimeCount / loanRepaymentHistory.length) * 100;
  
  return (
    <Card 
      title={<Title level={4}>Repayment History</Title>}
       variant="borderless"
      style={{ marginBottom: 24 }}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Paragraph>
            Payment history is a critical factor in determining credit risk. 
            This customer has made <strong>{onTimeCount}</strong> on-time payments 
            and has <strong>{lateCount}</strong> late or missed payments.
          </Paragraph>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16
          }}>
            <div>
              <Title level={5}>Payment Success Rate</Title>
              <Tag color={successRate >= 80 ? 'green' : successRate >= 60 ? 'orange' : 'red'} style={{ fontSize: 16, padding: '4px 8px' }}>
                {successRate.toFixed(0)}%
              </Tag>
            </div>
            
            <div>
              <Title level={5}>Best Streak</Title>
              <Tag color="blue" style={{ fontSize: 16, padding: '4px 8px' }}>
                {consecutivePayments} payments
              </Tag>
            </div>
            
            <div>
              <Title level={5}>Current Streak</Title>
              <Tag color={currentStreak > 0 ? 'green' : 'red'} style={{ fontSize: 16, padding: '4px 8px' }}>
                {currentStreak > 0 ? `${currentStreak} payments` : 'Broken'}
              </Tag>
            </div>
          </div>
        </div>
        
        <div>
          <Title level={5}>Payment Timeline</Title>
          <div style={{ 
            display: 'flex', 
            gap: '8px',
            flexWrap: 'wrap',
            padding: '12px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px'
          }}>
            {loanRepaymentHistory.map((payment, index) => (
              <div 
                key={index}
                style={{ 
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: payment === 1 ? '#f6ffed' : '#fff1f0',
                  border: `1px solid ${payment === 1 ? '#b7eb8f' : '#ffccc7'}`,
                  borderRadius: '4px',
                  position: 'relative'
                }}
              >
                {payment === 1 ? (
                  <CheckCircle size={20} color="#52c41a" />
                ) : (
                  <XCircle size={20} color="#f5222d" />
                )}
                <div style={{ 
                  position: 'absolute',
                  bottom: '-20px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <Typography.Text type="secondary">
              Payment history shown from oldest (1) to most recent ({loanRepaymentHistory.length})
            </Typography.Text>
          </div>
        </div>
      </Space>
    </Card>
  );
};

export default RepaymentHistoryCard;