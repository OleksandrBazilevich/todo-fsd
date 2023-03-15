import { LogoutOutlined } from '@ant-design/icons'
import { Button } from 'antd'

import { logout } from 'entities/viewer'

import { useAppDispatch } from 'shared/lib'

export const LogoutButton = () => {
  const dispatch = useAppDispatch()
  return (
    <Button onClick={() => dispatch(logout())} icon={<LogoutOutlined />}>
      Logout
    </Button>
  )
}
