import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import { useAuth } from '../../hooks/useAuth'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { token, login } = useAuth()

  if (token) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const resp = await api.post('/auth/login/', { username, password })
      login(resp.data.access)
      navigate('/', { replace: true })
    } catch (err) {
      console.error('Login error:', err)
      alert('Не удалось войти. Проверьте логин и пароль.')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: '0 auto' }}>
      <h2>Вход</h2>
      <div style={{ marginBottom: 12 }}>
        <label>
          Логин:
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </label>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>
          Пароль:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </label>
      </div>
      <button type="submit" style={{ padding: '8px 16px' }}>
        Войти
      </button>
    </form>
  )
}

export default Login
