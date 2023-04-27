import React, { FC, Fragment } from 'react';
import Link from 'next/link';
import { Button, Checkbox, Form, Input, Alert } from 'antd';
import { RegisterDto } from '@/src/shared';

type Props = {
  onFinish: (values: RegisterDto) => void;
  loading?: boolean;
  error?: string;
};

export const RegisterForm: FC<Props> = ({
  onFinish,
  loading = false,
  error,
}) => {
  const handleFinish = (values: RegisterDto & { confirmPassword: string }) => {
    const { confirmPassword, ...rest } = values;
    onFinish(rest);
  };

  return (
    <Fragment>
      <Form
        scrollToFirstError
        validateTrigger={['onFinish']}
        layout="vertical"
        onFinish={handleFinish}
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
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="***********" />
        </Form.Item>
        <Form.Item
          name="hasAgreedWithTermsAndConditions"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
        >
          <Checkbox>
            I agree to the
            <Link href={'#'}>Terms of Service</Link> and{' '}
            <Link href={'#'}>Privacy Policy</Link>.
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            loading={loading}
            htmlType="submit"
            block
            type="primary"
            size="large"
          >
            Create Free Account
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
