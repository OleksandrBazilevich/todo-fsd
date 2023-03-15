import { createAsyncThunk } from '@reduxjs/toolkit'
import { notification } from 'antd'
import Cookies from 'js-cookie'

import { baseInstance, errorCatch, instance } from 'shared/api'

import { IAuthReq, IAuthResponse } from './types'

export const register = createAsyncThunk<IAuthResponse, IAuthReq>(
  'auth/register',
  async ({ email, password }, thunkApi) => {
    try {
      const response = await baseInstance.post<IAuthResponse>(
        '/auth/register',
        {
          email,
          password,
        }
      )
      if (response.data.accessToken) {
        Cookies.set('accessToken', response.data.accessToken, { expires: 0.1 })
        Cookies.set('refreshToken', response.data.refreshToken, { expires: 60 })
        localStorage.setItem('viewer', JSON.stringify(response.data.user))
      }
      return response.data
    } catch (error) {
      notification.error({ message: errorCatch(error) })
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const login = createAsyncThunk<IAuthResponse, IAuthReq>(
  'auth/login',
  async ({ email, password }, thunkApi) => {
    try {
      const response = await baseInstance.post<IAuthResponse>('/auth/login', {
        email,
        password,
      })
      if (response.data.accessToken) {
        Cookies.set('accessToken', response.data.accessToken, { expires: 0.1 })
        Cookies.set('refreshToken', response.data.refreshToken, { expires: 60 })
        localStorage.setItem('viewer', JSON.stringify(response.data.user))
      }
      return response.data
    } catch (error: any) {
      notification.error({ message: errorCatch(error) })
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const logout = createAsyncThunk('auth/logout', () => {
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
  localStorage.removeItem('viewer')
})

export const checkAuth = createAsyncThunk<IAuthResponse>(
  'auth/check-auth',
  async (_, thunkApi) => {
    try {
      const refreshToken = Cookies.get('refreshToken')
      const response = await instance.post<IAuthResponse>(
        '/auth/access-token',
        { refreshToken }
      )
      if (response.data.accessToken) {
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        localStorage.setItem('viewer', JSON.stringify(response.data.user))
      }

      return response.data
    } catch (error) {
      if (errorCatch(error) === 'jwt expired') {
        thunkApi.dispatch(logout())
      }

      return thunkApi.rejectWithValue(error)
    }
  }
)
