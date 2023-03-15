import { List } from 'antd'
import { FC } from 'react'

import { DeleteTask, UpdateStatus, UpdateTask } from 'features/task'

import { ITask, TaskCard } from 'entities/task'

interface ITaskList {
  tasks: ITask[]
  isLoading: boolean
}

export const TasksList: FC<ITaskList> = ({ tasks, isLoading }) => {
  return (
    <List
      grid={{ gutter: 0, column: 4 }}
      loading={isLoading}
      dataSource={tasks}
      renderItem={(item) => (
        <List.Item>
          <TaskCard
            key={item._id}
            extra={
              <UpdateStatus checked={item.isCompleted} taskId={item._id} />
            }
            actions={[
              <DeleteTask id={item._id} />,
              <UpdateTask
                _id={item._id}
                title={item.title}
                description={item.description}
              />,
            ]}
            id={item._id}
            description={item.description}
            title={item.title}
            date={item.updatedAt}
            checked={item.isCompleted}
          />
        </List.Item>
      )}
    />
  )
}
