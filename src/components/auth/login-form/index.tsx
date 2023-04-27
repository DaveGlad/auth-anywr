import React, { FC, Fragment } from 'react';
import { Alert, Button, Checkbox, Form, Input } from 'antd';
import { LoginDto } from '@/src/shared';

type Props = {
  onFinish: (values: LoginDto) => void;
  loading?: boolean;
  error?: string;
};

export const LoginForm: FC<Props> = ({ onFinish, loading = false, error }) => {
  return (
    <Fragment>
      <Form
        onFinish={onFinish}
        validateTrigger={['onFinish']}
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Email incorrect !',
            },
            {
              required: true,
              message: 'Required !',
            },
          ]}
        >
          <Input size="large" placeholder="Email adress here" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Required !',
            },
            {
              pattern: /^.{6,}$/,
              message: 'Minimun 6 characters',
            },
          ]}
        >
          <Input.Password size="large" placeholder="***********" />
        </Form.Item>
        <div className=" flex md:items-center md:justify-between flex-col md:flex-row">
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </div>
        <Form.Item>
          <Button
            loading={loading}
            htmlType="submit"
            block
            type="primary"
            size="large"
          >
            Sign in
          </Button>
        </Form.Item>
      </Form>
      {error && (
        <Form.Item>
          <Alert message={`Error: ${error}`} type="error" showIcon />
        </Form.Item>
      )}
    </Fragment>
  );
};
