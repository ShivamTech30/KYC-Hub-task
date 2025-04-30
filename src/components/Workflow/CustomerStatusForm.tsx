import React, { useState } from 'react';
import { Form, Select, Button, Input, Card, message, Space, Typography, Alert } from 'antd';
import { SendOutlined, SaveOutlined } from '@ant-design/icons';
import { Customer, StatusType } from '../../types';
import { updateCustomerStatus, createAlert } from '../../api';
import { getRiskColor } from '../../utils/riskCalculator';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface CustomerStatusFormProps {
  customer: Customer;
  onStatusUpdated: (customerId: string, newStatus: StatusType) => void;
}

const CustomerStatusForm: React.FC<CustomerStatusFormProps> = ({ 
  customer, 
  onStatusUpdated 
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [alertSent, setAlertSent] = useState(false);
  
  // Check if this is a high-risk customer
  const isHighRisk = (customer.riskScore || 0) > 70;
  
  const handleSubmit = async (values: { status: StatusType; notes: string }) => {
    try {
      setLoading(true);
      
      // Update customer status
      await updateCustomerStatus(customer.customerId, values.status);
      
      // Trigger alert for high-risk customers if approved
      if (isHighRisk && values.status === 'Approved' && !alertSent) {
        await createAlert(customer.customerId, customer.riskScore || 0);
        setAlertSent(true);
        message.success('High-risk alert created successfully');
      }
      
      // Update UI
      onStatusUpdated(customer.customerId, values.status);
      message.success(`Status updated to ${values.status}`);
      
      // Clear form
      form.resetFields(['notes']);
    } catch (error) {
      console.error('Error updating status:', error);
      message.error('Failed to update status');
    } finally {
      setLoading(false);
    }
  };
  
  // Set initial form values
  React.useEffect(() => {
    form.setFieldsValue({
      status: customer.status,
      notes: '',
    });
  }, [customer, form]);
  
  return (
    <Card 
      title={<Title level={4}>Update Customer Status</Title>}
       variant="borderless"
      style={{ marginBottom: 24 }}
    >
      {isHighRisk && (
        <Alert
          message="High Risk Customer"
          description="This customer has a high risk score. Please review carefully before approval."
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          status: customer.status,
          notes: '',
        }}
      >
        <Form.Item
          name="status"
          label={<Text strong>Status</Text>}
          rules={[{ required: true, message: 'Please select a status' }]}
        >
          <Select>
            <Option value="Review">
              <Space>
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#1890ff' }}></div>
                <span>Review</span>
              </Space>
            </Option>
            <Option value="Approved">
              <Space>
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#52c41a' }}></div>
                <span>Approved</span>
              </Space>
            </Option>
            <Option value="Rejected">
              <Space>
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#f5222d' }}></div>
                <span>Rejected</span>
              </Space>
            </Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          name="notes"
          label={<Text strong>Review Notes</Text>}
        >
          <TextArea rows={4} placeholder="Enter any notes about this customer..." />
        </Form.Item>
        
        <Form.Item>
          <Space>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              icon={<SaveOutlined />}
            >
              Update Status
            </Button>
            
            {isHighRisk && (
              <Button 
                danger 
                icon={<SendOutlined />}
                onClick={async () => {
                  try {
                    await createAlert(customer.customerId, customer.riskScore || 0);
                    setAlertSent(true);
                    message.success('High-risk alert created successfully');
                  } catch (error) {
                    message.error('Failed to create alert');
                  }
                }}
                disabled={alertSent}
              >
                {alertSent ? 'Alert Sent' : 'Create Alert'}
              </Button>
            )}
          </Space>
        </Form.Item>
      </Form>
      
      <div style={{ marginTop: 16 }}>
        <Text type="secondary">
          Customer ID: {customer.customerId} | Risk Score: <span style={{ 
            color: getRiskColor(customer.riskScore || 0),
            fontWeight: 'bold'
          }}>
            {customer.riskScore}
          </span>
        </Text>
      </div>
    </Card>
  );
};

export default CustomerStatusForm;