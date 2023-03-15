import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'

import { taskReducer } from 'entities/task'
import { viewerReducer } from 'entities/viewer'

export const rootReducer = combineReducers({
  viewer: viewerReducer,
  tasks: taskReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})
