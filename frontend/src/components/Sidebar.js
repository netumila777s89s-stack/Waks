import React from 'react';
import { Layout, Menu, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  SendOutlined,
  TeamOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

function Sidebar() {
  const [collapsed, setCollapsed] = React.useState(false);
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Панель управления',
    },
    {
      key: '/campaigns',
      icon: <SendOutlined />,
      label: 'Кампании',
    },
    {
      key: '/contacts',
      icon: <TeamOutlined />,
      label: 'Контакты',
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      theme="light"
      style={{
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems.map((item) => ({
          ...item,
          label: <Link to={item.key}>{item.label}</Link>,
        }))}
      />
    </Sider>
  );
}

export default Sidebar;
