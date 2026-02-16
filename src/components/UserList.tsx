import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Popconfirm, message, Space, Card, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { fetchUsers, deleteUser } from '../store/userSlice';
import type { RootState, AppDispatch } from '../store/store';
import UserForm from './UserForm';
import { USER_FIELDS } from '../config/fields_config';
import type { User } from '../types';

const { Title } = Typography;

const UserList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading } = useSelector((state: RootState) => state.users);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleDelete = async (id: string | number) => {
        try {
            await dispatch(deleteUser(id)).unwrap();
            message.success('User deleted successfully');
        } catch (error) {
            message.error('Failed to delete user');
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

    // Dynamically generate columns based on configuration
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
            render: (_: any, record: User) => (
                <Space size="middle">
                    <Button 
                        type="text" 
                        icon={<EditOutlined style={{ color: '#1890ff' }} />} 
                        onClick={() => handleEdit(record)}
                    />
                    <Popconfirm
                        title="Are you sure you want to delete this user?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button 
                            type="text" 
                            danger 
                            icon={<DeleteOutlined />} 
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

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
                
                <Table 
                    columns={columns} 
                    dataSource={users} 
                    rowKey="id" 
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                    bordered
                />
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
