import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import authService from '../services/authService';
import '../styles/AuthPages.css';

function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      message.error('Пароли не совпадают');
      return;
    }

    setLoading(true);
    try {
      await authService.register(
        values.username,
        values.email,
        values.password
      );
      message.success('Аккаунт создан успешно');
      navigate('/login');
    } catch (error) {
      message.error(error.response?.data?.detail || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card" title="Регистрация в Waks">
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Имя пользователя"
            name="username"
            rules={[{ required: true, message: 'Введите имя пользователя' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="username"
            />
          </Form.Item>

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

          <Form.Item
            label="Подтвердите пароль"
            name="confirmPassword"
            rules={[{ required: true, message: 'Подтвердите пароль' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Повторите пароль"
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={loading}>
            Создать аккаунт
          </Button>
        </Form>

        <div className="auth-footer">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </div>
      </Card>
    </div>
  );
}

export default RegisterPage;
