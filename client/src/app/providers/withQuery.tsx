import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

const queryClient = new QueryClient()

export const withQuery = (component: () => React.ReactNode) => () =>
  <QueryClientProvider client={queryClient}>{component()}</QueryClientProvider>
