import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import { AuthProvider } from './hooks/useAuth'
import { routes } from './router/routes'
import { ErrorPage } from './components/ErrorPage'
import './index.css'

const router = createBrowserRouter(routes, {
  future: {
    v7_startTransition: false,
    v7_relativeSplatPath: false,
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary FallbackComponent={ErrorPage}>
    <AuthProvider>
      <RouterProvider router={router} fallbackElement={<ErrorPage />} />
    </AuthProvider>
  </ErrorBoundary>
)
