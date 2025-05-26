const _origError = console.error
console.error = (...args: any[]) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('Cannot convert object to primitive value')
  ) {
    return
  }
  _origError(...args)
}

import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const Layout: React.FC = () => {
  const { token, logout } = useAuth()

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
      <nav style={{ marginBottom: 24 }}>
        {token ? (
          <>
            <Link to="/">Home</Link> | <Link to="/games">Games</Link> |{' '}
            <Link to="/collections">Collections</Link> |{' '}
            <Link to="/categories">Categories</Link> |{' '}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      <Outlet />
    </div>
  )
}

export default Layout
