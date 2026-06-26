import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Spin, Empty } from 'antd';
import { MessageOutlined, TeamOutlined, SendOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import campaignService from '../services/campaignService';
import contactService from '../services/contactService';

function DashboardPage() {
  const [campaignCount, setCampaignCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [campaignsRes, contactsRes] = await Promise.all([
          campaignService.getCampaigns(),
          contactService.getContacts(),
        ]);
        setCampaignCount(campaignsRes.data.length);
        setContactCount(contactsRes.data.length);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="dashboard">
      <h1>Панель управления</h1>
      <Row gutter={16}>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Кампании"
              value={campaignCount}
              prefix={<MessageOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Контакты"
              value={contactCount}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Отправлено сообщений"
              value={0}
              prefix={<SendOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default DashboardPage;
