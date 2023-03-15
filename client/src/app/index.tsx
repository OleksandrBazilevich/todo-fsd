import { Routes } from 'pages/_router'

import { withProviders } from './providers'
import './styles/index.scss'

const App = () => {
  return <Routes />
}

export default withProviders(App)
