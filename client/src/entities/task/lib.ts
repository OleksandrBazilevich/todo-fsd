import { useTypedSelector } from 'shared/lib'

export const useTasks = () => useTypedSelector((state) => state.tasks)
