import { useTypedSelector } from 'shared/lib'

export const useViewer = () => useTypedSelector((state) => state.viewer)
