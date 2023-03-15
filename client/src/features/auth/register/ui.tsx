import { Button, Form, Input, Typography } from 'antd'

import { IAuthReq, register } from 'entities/viewer'

import { emailValidation, useAppDispatch } from 'shared/lib'

export const RegisterForm = () => {
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const handleSubmit = ({ email, password }: IAuthReq) => {
    dispatch(register({ email, password }))
    form.resetFields()
  }

  return (
    <>
      <Typography.Title
        level={2}
        style={{ textAlign: 'center', margin: '100px 0 50px 0' }}
      >
        Registration
      </Typography.Title>
      <Form
        form={form}
        name="Register"
        style={{ maxWidth: 600, margin: ' 0 auto' }}
        layout="vertical"
        onFinish={handleSubmit}
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
        <Form.Item
          label="repeat password"
          name="repeat_password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                )
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item shouldUpdate>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
