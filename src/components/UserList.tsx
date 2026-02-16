import React, { useEffect, useMemo, useState } from 'react';
import { Table, Button, Popconfirm, message, Space, Card, Typography, Alert, Pagination } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import { useDeleteUserMutation, useGetUsersQuery } from '../services/usersApi';
import UserForm from './UserForm';
import { USER_FIELDS } from '../config/fields_config';
import type { User } from '../types';

const { Title } = Typography;

const UserList: React.FC = () => {
  const { data: users = [], isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = 5;

  const pageFromQuery = Number(searchParams.get('page') ?? '1');
  const currentPage = Number.isFinite(pageFromQuery) && pageFromQuery > 0 ? pageFromQuery : 1;

  useEffect(() => {
    if (!searchParams.get('page')) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set('page', '1');
      setSearchParams(nextParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const totalPages = Math.max(1, Math.ceil(users.length / pageSize));

  useEffect(() => {
    if (currentPage > totalPages) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set('page', String(totalPages));
      setSearchParams(nextParams, { replace: true });
    }
  }, [currentPage, totalPages, searchParams, setSearchParams]);

  const getErrorMessage = (apiError: unknown, fallbackMessage: string) => {
    if (typeof apiError === 'object' && apiError !== null && 'status' in apiError) {
      const errorWithData = apiError as { data?: { message?: string } };
      return errorWithData.data?.message || fallbackMessage;
    }
    return fallbackMessage;
  };

  const handleDelete = async (id: string | number) => {
    try {
      await deleteUser(id).unwrap();
      message.success('User deleted successfully');
    } catch (error) {
      message.error(getErrorMessage(error, 'Failed to delete user'));
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingUser(null);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
  };

  const dynamicColumns = USER_FIELDS.map((field) => ({
    title: field.label,
    dataIndex: field.name,
    key: field.name,
  }));

  const columns = [
    ...dynamicColumns,
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: User) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined style={{ color: '#1890ff' }} />}
            onClick={() => handleEdit(record)}
            disabled={isDeleting}
          />
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            disabled={isDeleting}
          >
            <Button type="text" danger icon={<DeleteOutlined />} loading={isDeleting} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const pagedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return users.slice(start, start + pageSize);
  }, [currentPage, users]);

  const handlePageChange = (page: number) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', String(page));
    setSearchParams(nextParams);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Title level={2} style={{ margin: 0 }}>User Management</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            size="large"
            style={{ borderRadius: '6px' }}
          >
            Add New User
          </Button>
        </div>

        {error ? (
          <Alert
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
            message={getErrorMessage(error, 'Failed to load users')}
          />
        ) : null}

        <Table
          columns={columns}
          dataSource={pagedUsers}
          rowKey="id"
          loading={isLoading}
          pagination={false}
          bordered
        />

        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={users.length}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </Card>

      <UserForm
        visible={isModalVisible}
        onCancel={handleCancel}
        editingUser={editingUser}
      />
    </div>
  );
};

export default UserList;
