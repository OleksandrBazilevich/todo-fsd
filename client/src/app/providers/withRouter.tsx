import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

export const withRouter = (component: () => React.ReactNode) => () => {
  Spin.setDefaultIndicator(<LoadingOutlined />)
  return (
    <BrowserRouter>
      <Suspense fallback={<Spin size="large" />}>{component()}</Suspense>
    </BrowserRouter>
  )
}
