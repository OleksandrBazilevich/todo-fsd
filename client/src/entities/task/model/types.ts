export interface ITask {
  _id: string
  title: string
  description: string
  isCompleted: boolean
  createdAt: string
  updatedAt: string
}

export type ITaskReq = Pick<ITask, 'title' | 'description'>

export type ITaskUpdateStatusReq = Pick<ITask, '_id' | 'isCompleted'>

export interface ITaskUpdateReq extends ITaskReq {
  _id: string
}

export interface IInitialState {
  tasks: ITask[]
  isLoading: boolean
}
