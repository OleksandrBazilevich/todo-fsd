import { EditOutlined } from '@ant-design/icons'
import { Form, Input, Modal } from 'antd'
import { FC, useEffect, useState } from 'react'

import { updateTask, useTasks } from 'entities/task'

import { useAppDispatch } from 'shared/lib'

interface IUpdateTask {
  title: string
  description: string
  _id: string
}

interface IFormTaskData {
  title: string
  description: string
}

export const UpdateTask: FC<IUpdateTask> = ({ title, description, _id }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { isLoading } = useTasks()
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()

  const handleSubmit = ({ title, description }: IFormTaskData) => {
    dispatch(updateTask({ _id, title, description }))
    form.resetFields()
    setIsOpen(false)
  }

  useEffect(() => {
    form.setFieldsValue({ title, description })
  }, [form, title, description])

  const handleCancel = () => {
    setIsOpen(false)
    form.resetFields()
  }
  return (
    <>
      <EditOutlined onClick={() => setIsOpen(true)} />
      <Modal
        confirmLoading={isLoading}
        destroyOnClose
        title={title}
        open={isOpen}
        okButtonProps={{
          onClick: form.submit,
          htmlType: 'submit',
        }}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          style={{ maxWidth: 800, margin: '0 auto' }}
          layout="vertical"
        >
          <Form.Item name="title" label="Title">
            <Input placeholder="title" style={{ borderRadius: 0 }} />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea
              autoSize
              placeholder="description"
              style={{ borderRadius: 0 }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
