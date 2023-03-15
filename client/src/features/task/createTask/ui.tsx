import { Button, Form, Input, Typography } from 'antd'

import { ITaskReq, createTask } from 'entities/task'

import { useAppDispatch } from 'shared/lib'

export const CreateTaskForm = () => {
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const handleSubmit = (data: ITaskReq) => {
    dispatch(createTask(data))
    form.resetFields()
  }
  return (
    <>
      <Typography.Title level={3} style={{ textAlign: 'center' }}>
        Create task
      </Typography.Title>
      <Form
        form={form}
        onFinish={handleSubmit}
        style={{ maxWidth: 800, margin: '0 auto' }}
        layout="vertical"
      >
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input placeholder="title" style={{ borderRadius: 0 }} />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea
            autoSize
            placeholder="description"
            style={{ borderRadius: 0 }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
