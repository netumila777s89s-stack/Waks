import React from 'react';
import { Layout, Button, Dropdown, Space } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const { Header } = Layout;

function AppHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
    window.location.reload();
  };

  return (
    <Header style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, color: '#1890ff' }}>Waks</h2>
        <Space>
          <Button type="text" icon={<UserOutlined />}>
            Профиль
          </Button>
          <Button
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Выход
          </Button>
        </Space>
      </div>
    </Header>
  );
}

export default AppHeader;
