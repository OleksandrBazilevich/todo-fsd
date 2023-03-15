import { Card, Typography } from 'antd'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { convertDate } from 'shared/lib'

interface ITaskCardProps {
  extra?: React.ReactNode
  id: string
  title: string
  description: string
  checked: boolean
  date: string
  actions?: React.ReactNode[]
}

export const TaskCard: FC<ITaskCardProps> = ({
  title,
  date,
  description,
  actions,
  id,
  extra,
  checked,
}) => {
  const navigate = useNavigate()
  return (
    <Card
      extra={extra}
      actions={actions || []}
      title={
        <Typography.Title
          onClick={() => navigate(`/task/${id}`)}
          style={{ cursor: 'pointer' }}
          level={4}
          delete={checked}
        >
          {title}
        </Typography.Title>
      }
      style={{ width: 300 }}
    >
      <Typography.Paragraph delete={checked}>
        {description}
      </Typography.Paragraph>
      <Typography.Paragraph style={{ textAlign: 'end', marginBottom: 0 }}>
        {convertDate(date)}
      </Typography.Paragraph>
    </Card>
  )
}
