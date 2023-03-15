export { TaskModel, reducer as taskReducer } from './slice'
export {
  getTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
  updateTask,
  useSearch,
} from './actions'

export type { ITaskReq, ITask } from './types'
