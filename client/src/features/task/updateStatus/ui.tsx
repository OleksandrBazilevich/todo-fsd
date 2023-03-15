import { Checkbox } from 'antd'
import { FC, useState } from 'react'

import { updateTaskStatus } from 'entities/task'

import { useAppDispatch } from 'shared/lib'

interface IUpdateTask {
  taskId: string
  checked: boolean
}

export const UpdateStatus: FC<IUpdateTask> = ({ taskId, checked }) => {
  const dispatch = useAppDispatch()
  const [isCompleted, setIsCompleted] = useState(checked)
  const handleChange = () => {
    setIsCompleted((prev) => !prev)
    dispatch(updateTaskStatus({ _id: taskId, isCompleted: !isCompleted }))
  }

  return <Checkbox checked={isCompleted} onChange={() => handleChange()} />
}
