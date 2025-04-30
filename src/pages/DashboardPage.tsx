import React, { useState, useEffect } from 'react';
import { Layout, Typography, Spin, Row, Col, Alert } from 'antd';
import { askChatGPT, fetchCustomers } from '../api';
import { Customer, ChartDataPoint, RiskDistribution } from '../types';
import { generateIncomeExpensesChartData } from '../utils/chartData';
import { enrichCustomersWithRiskScores, getRiskDistribution } from '../utils/riskCalculator';

// Components
import FinancialMetrics from '../components/Dashboard/FinancialMetrics';
import IncomeExpensesChart from '../components/Dashboard/IncomeExpensesChart';
import RiskDistributionChart from '../components/Dashboard/RiskDistributionChart';
import CustomerTable from '../components/Dashboard/CustomerTable';

const { Content } = Layout;
const { Title } = Typography;

const DashboardPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [riskDistribution, setRiskDistribution] = useState<RiskDistribution[]>([]);
  // const [input, setInput] = useState("");
  // const [response, setResponse] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchCustomers();

        // Add risk scores to customers
        const enrichedCustomers = enrichCustomersWithRiskScores(data);
        setCustomers(enrichedCustomers);

        // Generate chart data
        setChartData(generateIncomeExpensesChartData(enrichedCustomers));

        // Generate risk distribution data
        setRiskDistribution(getRiskDistribution(enrichedCustomers));
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        {/* <Spin size="large" tip="Loading dashboard data..." /> */}
        <Spin tip="Loading..." fullscreen />
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

  console.log(customers)



  // const handleAsk = async () => {
  //   const result = await askChatGPT(input);
  //   setResponse(result);
  //   console.log({ result })
  // };

  return (
    <Content style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
      <Title level={2}>Credit Risk Dashboard</Title>

      {/* Financial Metrics */}
      <FinancialMetrics customers={customers} />

      {/* Charts */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={14}>
          <IncomeExpensesChart data={chartData} />
        </Col>
        <Col xs={24} lg={10}>
          <RiskDistributionChart data={riskDistribution} />
        </Col>
      </Row>

      {/* Customer Table */}
      <CustomerTable customers={customers} />

      {/* <div>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={handleAsk}>Ask ChatGPT</button>
        <pre>{response}</pre>
      </div> */}
    </Content>
  );
};

export default DashboardPage;

 