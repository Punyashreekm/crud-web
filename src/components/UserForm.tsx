import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, message, DatePicker, Alert } from 'antd';
import { USER_FIELDS } from '../config/fields_config';
import type { FieldConfig } from '../config/fields_config';
import { useAddUserMutation, useUpdateUserMutation } from '../services/usersApi';
import type { User } from '../types';

interface UserFormProps {
  visible: boolean;
  onCancel: () => void;
  editingUser: User | null;
}

const UserForm: React.FC<UserFormProps> = ({ visible, onCancel, editingUser }) => {
  const [form] = Form.useForm();
  const [addUser, { isLoading: isAdding, error: addError }] = useAddUserMutation();
  const [updateUser, { isLoading: isUpdating, error: updateError }] = useUpdateUserMutation();

  const isSubmitting = isAdding || isUpdating;

  useEffect(() => {
    if (visible) {
      if (editingUser) {
        form.setFieldsValue(editingUser);
      } else {
        form.resetFields();
      }
    }
  }, [visible, editingUser, form]);

  const getErrorMessage = (apiError: unknown, fallbackMessage: string) => {
    if (typeof apiError === 'object' && apiError !== null && 'status' in apiError) {
      const errorWithData = apiError as { data?: { message?: string } };
      return errorWithData.data?.message || fallbackMessage;
    }
    return fallbackMessage;
  };

  const handleSubmit = async (values: Record<string, unknown>) => {
    try {
      if (editingUser) {
        await updateUser({ ...editingUser, ...values }).unwrap();
        message.success('User updated successfully');
      } else {
        await addUser(values as Omit<User, 'id'>).unwrap();
        message.success('User created successfully');
      }

      onCancel();
      form.resetFields();
    } catch (error) {
      message.error(
        getErrorMessage(error, editingUser ? 'Failed to update user' : 'Failed to create user'),
      );
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

  const activeError = editingUser ? updateError : addError;

  return (
    <Modal
      title={editingUser ? 'Edit User' : 'Add New User'}
      open={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
    >
      {activeError ? (
        <Alert
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
          message={getErrorMessage(activeError, editingUser ? 'Failed to update user' : 'Failed to create user')}
        />
      ) : null}

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
              { type: field.type === 'email' ? 'email' : undefined, message: 'Invalid email format' },
            ]}
          >
            {renderField(field)}
          </Form.Item>
        ))}

        <Form.Item style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 0 }}>
          <Button onClick={onCancel} style={{ marginRight: 8 }} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            {editingUser ? 'Update' : 'Create'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserForm;
