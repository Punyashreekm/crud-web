import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, message, DatePicker } from 'antd'; // Add components as needed for extensibility
import { useDispatch } from 'react-redux';
import { addUser, updateUser } from '../store/userSlice';
import { USER_FIELDS } from '../config/fields_config';
import type { FieldConfig } from '../config/fields_config';
import type { AppDispatch } from '../store/store';
import type { User } from '../types';

interface UserFormProps {
    visible: boolean;
    onCancel: () => void;
    editingUser: User | null;
}

const UserForm: React.FC<UserFormProps> = ({ visible, onCancel, editingUser }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (visible) {
            if (editingUser) {
                form.setFieldsValue(editingUser);
            } else {
                form.resetFields();
            }
        }
    }, [visible, editingUser, form]);

    const handleSubmit = async (values: any) => {
        try {
            if (editingUser) {
                await dispatch(updateUser({ ...editingUser, ...values })).unwrap();
                message.success('User updated successfully');
            } else {
                await dispatch(addUser(values)).unwrap();
                message.success('User created successfully');
            }
            onCancel();
            form.resetFields();
        } catch (error) {
            message.error(editingUser ? 'Failed to update user' : 'Failed to create user');
        }
    };

    const renderField = (field: FieldConfig) => {
        switch (field.type) {
            case 'email':
                return <Input type="email" placeholder={field.placeholder} />;
            case 'tel':
                return <Input type="tel" placeholder={field.placeholder} />;
            case 'date':
                return <DatePicker style={{ width: '100%' }} />;
            case 'text':
            default:
                return <Input placeholder={field.placeholder} />;
        }
    };

    return (
        <Modal
            title={editingUser ? "Edit User" : "Add New User"}
            open={visible}
            onCancel={onCancel}
            footer={null}
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={editingUser || {}}
            >
                {USER_FIELDS.map((field) => (
                    <Form.Item
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        rules={[
                            { required: field.required, message: `${field.label} is required` },
                            { type: field.type === 'email' ? 'email' : undefined, message: 'Invalid email format' }
                        ]}
                    >
                        {renderField(field)}
                    </Form.Item>
                ))}
                
                <Form.Item style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 0 }}>
                    <Button onClick={onCancel} style={{ marginRight: 8 }}>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                        {editingUser ? "Update" : "Create"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UserForm;
