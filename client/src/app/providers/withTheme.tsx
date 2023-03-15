import { App, ConfigProvider } from 'antd'

import { theme } from 'shared/lib'

export const withTheme = (component: () => React.ReactNode) => () => {
  return (
    <ConfigProvider theme={theme}>
      <App>{component()}</App>
    </ConfigProvider>
  )
}
