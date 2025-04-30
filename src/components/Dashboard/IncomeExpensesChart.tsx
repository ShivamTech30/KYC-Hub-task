import React from 'react';
import { Card, Typography } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '../../types';

const { Title } = Typography;

interface IncomeExpensesChartProps {
  data: ChartDataPoint[];
}

const IncomeExpensesChart: React.FC<IncomeExpensesChartProps> = ({ data }) => {
  // Format currency for tooltip
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0 
    }).format(value);
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ 
          backgroundColor: '#fff', 
          padding: '10px', 
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>{`${label}`}</p>
          <p style={{ margin: 0, color: '#1890ff' }}>
            Income: {formatCurrency(payload[0].value)}
          </p>
          <p style={{ margin: 0, color: '#f5222d' }}>
            Expenses: {formatCurrency(payload[1].value)}
          </p>
          <p style={{ margin: 0, color: '#52c41a', fontWeight: 'bold' }}>
            Net: {formatCurrency(payload[0].value - payload[1].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card 
      title={<Title level={4}>Income vs Expenses</Title>}
       variant="borderless"
      style={{ height: '100%', marginBottom: 16 }}
    >
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis 
            tickFormatter={(value) => `$${value / 1000}k`} 
            label={{ 
              value: 'Amount (USD)', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle' }
            }} 
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="income" name="Income" fill="#1890ff" />
          <Bar dataKey="expenses" name="Expenses" fill="#f5222d" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IncomeExpensesChart;