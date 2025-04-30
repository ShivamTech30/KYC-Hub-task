import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, ConfigProvider } from 'antd';

// Pages
import DashboardPage from './pages/DashboardPage';
import RiskAssessmentPage from './pages/RiskAssessmentPage';
import WorkflowPage from './pages/WorkflowPage';

// Components
import Header from './components/Header';

import './index.css';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 4,
        },
      }}
    >
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Header />
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/risk-assessment" element={<RiskAssessmentPage />} />
            <Route path="/workflow" element={<WorkflowPage />} />
          </Routes>
        </Layout>
      </Router>
    </ConfigProvider>
  );
}

export default App;