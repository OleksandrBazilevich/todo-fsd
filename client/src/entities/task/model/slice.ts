import { createSlice } from '@reduxjs/toolkit'

import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
  updateTaskStatus,
} from './actions'
import { IInitialState } from './types'

const initialState: IInitialState = {
  tasks: [],
  isLoading: false,
}

export const TaskModel = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTasks.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tasks = payload
      })
      .addCase(getTasks.rejected, (state) => {
        state.isLoading = false
        state.tasks = []
      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTask.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tasks = [payload, ...state.tasks]
      })
      .addCase(createTask.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(updateTaskStatus.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateTaskStatus.fulfilled, (state, { payload }) => {
        state.isLoading = false
        const index = state.tasks.findIndex((elem) => elem._id === payload._id)
        if (index !== -1) {
          state.tasks[index].isCompleted = payload.isCompleted
        }
      })
      .addCase(updateTaskStatus.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tasks = state.tasks.filter((item) => item._id !== payload._id)
      })
      .addCase(deleteTask.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateTask.fulfilled, (state, { payload }) => {
        state.isLoading = false
        const index = state.tasks.findIndex((elem) => elem._id === payload._id)
        if (index !== -1) {
          state.tasks[index].title = payload.title
          state.tasks[index].description = payload.description
        }
      })
      .addCase(updateTask.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export const { reducer } = TaskModel
