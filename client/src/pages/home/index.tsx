import { Layout, Space, Tabs, TabsProps, Typography } from 'antd'
import { useEffect } from 'react'

import { TasksList } from 'widgets/task'

import { LogoutButton } from 'features/auth'
import { CreateTaskForm, SearchField } from 'features/task'

import { getTasks, useTasks } from 'entities/task'

import { useAppDispatch } from 'shared/lib'

const Home = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getTasks())
  }, [])

  const { isLoading, tasks } = useTasks()
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Uncompleted tasks`,
      children: (
        <TasksList
          tasks={tasks.filter((item) => !item.isCompleted)}
          isLoading={isLoading}
        />
      ),
    },
    {
      key: '2',
      label: `Completed tasks`,
      children: (
        <TasksList
          tasks={tasks.filter((item) => item.isCompleted)}
          isLoading={isLoading}
        />
      ),
    },
  ]
  return (
    <Layout>
      <Layout.Header>
        <Space
          align="center"
          style={{ display: 'flex', justifyContent: 'space-between' }}
          direction="horizontal"
        >
          <Typography.Title level={2}>Todo app</Typography.Title>
          <SearchField />
          <LogoutButton />
        </Space>
      </Layout.Header>
      <Layout>
        <Layout.Content style={{ marginLeft: 60 }}>
          <CreateTaskForm />
          <Tabs defaultActiveKey="1" items={items} />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
export default Home
