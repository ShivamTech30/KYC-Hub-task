import React from 'react';
import { Card, Typography } from 'antd';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { RiskDistribution } from '../../types';

const { Title } = Typography;

interface RiskDistributionChartProps {
  data: RiskDistribution[];
}

const RiskDistributionChart: React.FC<RiskDistributionChartProps> = ({ data }) => {
  // Set minimum size for pie chart to prevent it being too small
  const renderColorfulLegendText = (value: string, entry: any) => {
    return <span style={{ color: '#333', fontWeight: 500 }}>{value}</span>;
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ 
          backgroundColor: '#fff', 
          padding: '10px', 
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}>
          <p style={{ margin: 0, fontWeight: 'bold', color: payload[0].payload.color }}>
            {`${payload[0].name}: ${payload[0].value} customers`}
          </p>
          <p style={{ margin: 0 }}>
            {`${((payload[0].value / data.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}% of total`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card 
      title={<Title level={4}>Risk Distribution</Title>}
       variant="borderless"
       
      style={{ height: '100%', marginBottom: 16 }}
    >
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            innerRadius={60}
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            formatter={renderColorfulLegendText}
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default RiskDistributionChart;