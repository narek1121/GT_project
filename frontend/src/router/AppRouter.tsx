import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Home = lazy(() => import('../features/home/Home'))
const Login = lazy(() => import('../features/auth/Login'))
const Register = lazy(() => import('../features/auth/Register'))
const GameList = lazy(() => import('../features/games/GameList'))
const GameDetail = lazy(() => import('../features/games/GameDetail'))
const CollectionList = lazy(() => import('../features/collections/CollectionList'))
const CategoryList = lazy(() => import('../features/categories/CategoryList'))

export const AppRouter: React.FC = () => {
  const { token } = useAuth()

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {token ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="games" element={<GameList />} />
            <Route path="games/:id" element={<GameDetail />} />
            <Route path="collections" element={<CollectionList />} />
            <Route path="categories" element={<CategoryList />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </Suspense>
  )
}

export default AppRouter
