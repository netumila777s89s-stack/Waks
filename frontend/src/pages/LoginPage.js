import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Card, message, Space } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import authService from '../services/authService';
import '../styles/AuthPages.css';

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await authService.login(values.email, values.password);
      localStorage.setItem('access_token', response.data.access_token);
      message.success('Успешно вошли в систему');
      navigate('/');
      // Перезагрузить страницу для обновления состояния
      window.location.reload();
    } catch (error) {
      message.error(error.response?.data?.detail || 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card" title="Вход в Waks">
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Введите email' }]}
          >
            <Input
              prefix={<MailOutlined />}
              type="email"
              placeholder="your@email.com"
            />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Введите пароль' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Ваш пароль"
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={loading}>
            Войти
          </Button>
        </Form>

        <div className="auth-footer">
          Нет аккаунта? <Link to="/register">Создать</Link>
        </div>
      </Card>
    </div>
  );
}

export default LoginPage;
