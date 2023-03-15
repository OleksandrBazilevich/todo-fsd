import axios from 'axios'
import Cookies from 'js-cookie'

import { errorCatch } from './errorCatch'

export const baseInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
})

export const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
})

instance.interceptors.request.use((config) => {
  const accessToken = Cookies.get('accessToken')

  if (config.headers && accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`

  return config
})

instance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config
    if (
      (error.response.status === 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        const refreshToken = Cookies.get('refreshToken')
        const response = await baseInstance.post('auth/access-token', {
          refreshToken,
        })
        if (response.data.accessToken) {
          Cookies.set('accessToken', response.data.accessToken, {
            expires: 0.1,
          })
          Cookies.set('refreshToken', response.data.refreshToken, {
            expires: 60,
          })
          localStorage.setItem('viewer', JSON.stringify(response.data.user))
        }

        return instance.request(originalRequest)
      } catch (error) {
        if (errorCatch(error) === 'jwt expired') {
          Cookies.remove('accessToken')
          Cookies.remove('refreshToken')
        }
      }
    }

    throw error
  }
)
