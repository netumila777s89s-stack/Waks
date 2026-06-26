import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, message, Spin } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import campaignService from '../services/campaignService';

function CampaignPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const response = await campaignService.getCampaigns();
      setCampaigns(response.data);
    } catch (error) {
      message.error('Ошибка загрузки кампаний');
    } finally {
      setLoading(false);
    }
  };

  const showModal = (campaign = null) => {
    setEditingCampaign(campaign);
    if (campaign) {
      form.setFieldsValue(campaign);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    try {
      if (editingCampaign) {
        await campaignService.updateCampaign(editingCampaign.id, values);
        message.success('Кампания обновлена');
      } else {
        await campaignService.createCampaign(values);
        message.success('Кампания создана');
      }
      setIsModalVisible(false);
      fetchCampaigns();
    } catch (error) {
      message.error('Ошибка при сохранении кампании');
    }
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: 'Удалить кампанию?',
      okText: 'Удалить',
      cancelText: 'Отмена',
      onOk: async () => {
        try {
          await campaignService.deleteCampaign(id);
          message.success('Кампания удалена');
          fetchCampaigns();
        } catch (error) {
          message.error('Ошибка при удалении');
        }
      },
    });
  };

  const columns = [
    { title: 'Название', dataIndex: 'title', key: 'title' },
    { title: 'Платформа', dataIndex: 'platform', key: 'platform' },
    { title: 'Статус', dataIndex: 'status', key: 'status' },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          >
            Редактировать
          </Button>
          <Button
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
          Новая кампания
        </Button>
      </div>

      <Spin spinning={loading}>
        <Table dataSource={campaigns} columns={columns} rowKey="id" />
      </Spin>

      <Modal
        title={editingCampaign ? 'Редактировать кампанию' : 'Новая кампания'}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="title"
            label="Название"
            rules={[{ required: true, message: 'Введите название' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Описание">
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            name="platform"
            label="Платформа"
            rules={[{ required: true, message: 'Выберите платформу' }]}
          >
            <Select>
              <Select.Option value="whatsapp">WhatsApp</Select.Option>
              <Select.Option value="instagram">Instagram</Select.Option>
              <Select.Option value="both">Обе платформы</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="template_text"
            label="Текст сообщения"
            rules={[{ required: true, message: 'Введите текст сообщения' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default CampaignPage;
