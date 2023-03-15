import { DeleteOutlined } from '@ant-design/icons'
import { FC } from 'react'

import { deleteTask } from 'entities/task'

import { useAppDispatch } from 'shared/lib'

export const DeleteTask: FC<{ id: string }> = ({ id }) => {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(deleteTask({ id }))
  }
  return <DeleteOutlined onClick={handleClick} />
}
