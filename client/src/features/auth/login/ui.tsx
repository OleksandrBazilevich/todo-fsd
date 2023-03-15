import { Button, Form, Input, Typography } from 'antd'

import { IAuthReq, login } from 'entities/viewer'

import { emailValidation, useAppDispatch } from 'shared/lib'

export const LoginForm = () => {
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const handleSubmit = ({ email, password }: IAuthReq) => {
    dispatch(login({ email, password }))
    form.resetFields()
  }

  return (
    <>
      <Typography.Title
        level={2}
        style={{ textAlign: 'center', margin: '100px 0 50px 0' }}
      >
        Login
      </Typography.Title>
      <Form
        name="login"
        form={form}
        style={{ maxWidth: 600, margin: ' 0 auto' }}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please enter your email',
            },
            { pattern: emailValidation, message: 'please enter valid email' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'please enter your password',
            },
            { min: 6, message: 'password should contain more than 6 symbols' },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
