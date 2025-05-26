import React, { lazy, Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import Layout from '../components/Layout'
import { ErrorPage } from '../components/ErrorPage'
import { useAuth } from '../hooks/useAuth'

const Home = lazy(() => import('../features/home/Home'))
const Login = lazy(() => import('../features/auth/Login'))
const Register = lazy(() => import('../features/auth/Register'))
const GameList = lazy(() => import('../features/games/GameList'))
const GameDetail = lazy(() => import('../features/games/GameDetail'))
const CollectionList = lazy(() => import('../features/collections/CollectionList'))
const CategoryList = lazy(() => import('../features/categories/CategoryList'))

const withSuspense = (
  Component: React.LazyExoticComponent<React.FC>
): JSX.Element => (
  <Suspense fallback={<div>Loading…</div>}>
    <Component />
  </Suspense>
)

const ProtectedRoute: React.FC = () => {
  const { token } = useAuth()
  return token ? <Outlet /> : <Navigate to="/login" replace />
}

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'login',  element: withSuspense(Login),    errorElement: <ErrorPage /> },
      { path: 'register', element: withSuspense(Register), errorElement: <ErrorPage /> },

      {
        element: <ProtectedRoute />,
        children: [
          { index: true,             element: withSuspense(Home),            errorElement: <ErrorPage /> },
          { path: 'games',           element: withSuspense(GameList),        errorElement: <ErrorPage /> },
          { path: 'games/:id',       element: withSuspense(GameDetail),      errorElement: <ErrorPage /> },
          { path: 'collections',     element: withSuspense(CollectionList),  errorElement: <ErrorPage /> },
          { path: 'categories',      element: withSuspense(CategoryList),    errorElement: <ErrorPage /> },
        ],
      },

      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]
