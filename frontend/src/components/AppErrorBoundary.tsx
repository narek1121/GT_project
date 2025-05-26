import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorPage } from './ErrorPage'

export const AppErrorBoundary: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <ErrorBoundary FallbackComponent={ErrorPage}>
    {children}
  </ErrorBoundary>
)
