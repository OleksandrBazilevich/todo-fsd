import { Layout, Space, Typography } from 'antd'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { LogoutButton } from 'features/auth'
import { SearchField } from 'features/task'

import { getTasks, useTasks } from 'entities/task'

import { useAppDispatch } from 'shared/lib'

const TaskPage = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getTasks())
  }, [])

  const { id } = useParams()
  const { tasks } = useTasks()
  const task = tasks.find((item) => item._id === id)
  const navigate = useNavigate()

  return (
    <Layout>
      <Layout.Header>
        <Space
          align="center"
          style={{ display: 'flex', justifyContent: 'space-between' }}
          direction="horizontal"
        >
          <Typography.Title
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
            level={2}
          >
            Todo app
          </Typography.Title>
          <SearchField />
          <LogoutButton />
        </Space>
      </Layout.Header>
      <Layout>
        <Layout.Content
          style={{ marginLeft: 60, marginTop: 60, textAlign: 'center' }}
        >
          <Typography.Title level={3}>{task?.title}</Typography.Title>
          <Typography.Paragraph>{task?.description}</Typography.Paragraph>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
export default TaskPage
