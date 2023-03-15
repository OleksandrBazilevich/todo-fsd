import { createAsyncThunk } from '@reduxjs/toolkit'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { instance } from 'shared/api'
import { useDebounce } from 'shared/lib'

import { ITask, ITaskReq, ITaskUpdateReq, ITaskUpdateStatusReq } from './types'

export const getTasks = createAsyncThunk<ITask[], void>(
  'get tasks',
  async (_, thunkApi) => {
    try {
      const response = await instance.get<ITask[]>('/task')
      return response.data.sort(
        (a, b) =>
          new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf()
      )
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const deleteTask = createAsyncThunk<ITask, { id: string }>(
  'delete task',
  async ({ id }, thunkApi) => {
    try {
      const response = await instance.delete<ITask>(`/task/${id}`)
      return response.data
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const createTask = createAsyncThunk<ITask, ITaskReq>(
  'create task',
  async (task, thunkApi) => {
    try {
      const response = await instance.post<ITask>('/task', task)
      return response.data
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const updateTaskStatus = createAsyncThunk<ITask, ITaskUpdateStatusReq>(
  'update task status',
  async ({ _id, isCompleted }, thunkApi) => {
    try {
      const response = await instance.patch<ITask>(
        `/task/update-status/${_id}`,
        { isCompleted }
      )
      return response.data
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)
export const updateTask = createAsyncThunk<ITask, ITaskUpdateReq>(
  'update task',
  async ({ _id, title, description }, thunkApi) => {
    try {
      const response = await instance.patch<ITask>(`/task/update/${_id}`, {
        title,
        description,
      })
      return response.data
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  const { isSuccess, data } = useQuery(
    ['search tasks', debouncedSearch],
    () => instance.get<ITask[]>(`/task?search=${searchTerm}`),
    {
      select: ({ data }) =>
        data
          .slice(0, 7)
          .map((item) => ({ label: item.title, value: item._id })),
      enabled: !!debouncedSearch,
    }
  )

  const handleSearch = (str: string) => setSearchTerm(str)

  return { isSuccess, handleSearch, data, searchTerm }
}
