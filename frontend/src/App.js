import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'antd';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CampaignPage from './pages/CampaignPage';
import ContactsPage from './pages/ContactsPage';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

import './App.css';

const { Content } = Layout;

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    // Проверка токена при загрузке приложения
    const token = localStorage.getItem('access_token');
    if (token) {
      // Валидация токена
    }
  }, [dispatch]);

  return (
    <Router>
      {isAuthenticated ? (
        <Layout style={{ minHeight: '100vh' }}>
          <Header />
          <Layout>
            <Sidebar />
            <Layout>
              <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/campaigns" element={<CampaignPage />} />
                  <Route path="/contacts" element={<ContactsPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
