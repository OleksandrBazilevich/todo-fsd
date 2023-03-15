import { createSlice } from '@reduxjs/toolkit'

import { getLocalStorage } from 'shared/lib'

import { checkAuth, login, logout, register } from './actions'
import { IInitialState } from './types'

const initialState: IInitialState = {
  isLoading: false,
  viewer: getLocalStorage('viewer'),
}

export const viewerModel = createSlice({
  name: 'viewer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.viewer = payload.user
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false
        state.viewer = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.viewer = payload.user
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false
        state.viewer = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false
        state.viewer = null
      })
      .addCase(checkAuth.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.viewer = payload.user
      })
  },
})

export const { reducer } = viewerModel
