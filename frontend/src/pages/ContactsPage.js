import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Spin } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import contactService from '../services/contactService';

function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await contactService.getContacts();
      setContacts(response.data);
    } catch (error) {
      message.error('Ошибка загрузки контактов');
    } finally {
      setLoading(false);
    }
  };

  const showModal = (contact = null) => {
    setEditingContact(contact);
    if (contact) {
      form.setFieldsValue(contact);
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
      if (editingContact) {
        await contactService.updateContact(editingContact.id, values);
        message.success('Контакт обновлен');
      } else {
        await contactService.createContact(values);
        message.success('Контакт создан');
      }
      setIsModalVisible(false);
      fetchContacts();
    } catch (error) {
      message.error('Ошибка при сохранении контакта');
    }
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: 'Удалить контакт?',
      okText: 'Удалить',
      cancelText: 'Отмена',
      onOk: async () => {
        try {
          await contactService.deleteContact(id);
          message.success('Контакт удален');
          fetchContacts();
        } catch (error) {
          message.error('Ошибка при удалении');
        }
      },
    });
  };

  const columns = [
    { title: 'Имя', dataIndex: 'name', key: 'name' },
    { title: 'WhatsApp', dataIndex: 'whatsapp_number', key: 'whatsapp_number' },
    { title: 'Instagram', dataIndex: 'instagram_username', key: 'instagram_username' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
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
          Новый контакт
        </Button>
      </div>

      <Spin spinning={loading}>
        <Table dataSource={contacts} columns={columns} rowKey="id" />
      </Spin>

      <Modal
        title={editingContact ? 'Редактировать контакт' : 'Новый контакт'}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Имя"
            rules={[{ required: true, message: 'Введите имя' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="whatsapp_number" label="Номер WhatsApp">
            <Input placeholder="+1234567890" />
          </Form.Item>

          <Form.Item name="instagram_username" label="Instagram">
            <Input placeholder="@username" />
          </Form.Item>

          <Form.Item name="email" label="Email">
            <Input type="email" />
          </Form.Item>

          <Form.Item name="tags" label="Теги">
            <Input placeholder="tag1, tag2, tag3" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ContactsPage;
