import React from 'react';
import { Layout, Typography, Button, Space, Avatar, Dropdown } from 'antd';
import { BarChart2, Bell, Settings, User, LogOut, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header: React.FC = () => {
  const location = useLocation();

  // Navigation items
  const navItems = [
    { key: 'KYC-Hub-task/', label: 'Dashboard', path: 'KYC-Hub-task/' },
    { key: 'KYC-Hub-task/risk-assessment', label: 'Risk Assessment', path: 'KYC-Hub-task/risk-assessment' },
    { key: 'KYC-Hub-task/workflow', label: 'Workflow', path: 'KYC-Hub-task/workflow' },
  ];

  // User dropdown menu items
  const userMenuItems = [
    { key: 'profile', label: 'Profile', icon: <User size={16} /> },
    { key: 'settings', label: 'Settings', icon: <Settings size={16} /> },
    { key: 'logout', label: 'Logout', icon: <LogOut size={16} /> },
  ];

  return (
    <AntHeader style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '0 24px',
      background: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      {/* Logo and Title */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="KYC-Hub-task/" style={{ display: 'flex', alignItems: 'center', color: '#1890ff' }}>
          <BarChart2 size={28} />
          <Title level={3} style={{ margin: '0 0 0 12px', color: '#1890ff' }}>
            FinRisk
          </Title>
        </Link>
      </div>

      {/* Navigation */}
      <Space size="large" className="desktop-nav"
      //  style={{ 
      //   display: 'flex',
      //   '@media (max-width: 768px)': {
      //     display: 'none'
      //   }
      // }}
      
      >
        {navItems.map(item => (
          <Link key={item.key} to={item.path}>
            <Button
              type={location.pathname === item.path ? 'primary' : 'text'}
              style={{ 
                fontSize: '16px',
                fontWeight: location.pathname === item.path ? 'bold' : 'normal'
              }}
            >
              {item.label}
            </Button>
          </Link>
        ))}
      </Space>

      {/* User section */}
      <Space>
        <Button shape="circle" icon={<Bell size={18} />} />
        <Dropdown
          menu={{ 
            items: userMenuItems.map(item => ({
              key: item.key,
              label: (
                <Space>
                  {item.icon}
                  {item.label}
                </Space>
              )
            }))
          }}
          trigger={['click']}
        >
          <Avatar 
            style={{ 
              backgroundColor: '#1890ff', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }} 
            icon={<User size={18} />} 
          />
        </Dropdown>
        
        {/* Mobile menu button */}
        <Button 
          className="mobile-menu-button"
          icon={<Menu size={18} />}

          // style={{ 
          //   display: 'none',
          //   '@media (max-width: 768px)': {
          //     display: 'inline-flex'
          //   }
          // }}
        />
      </Space>
    </AntHeader>
  );
};

export default Header;