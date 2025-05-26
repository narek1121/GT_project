import React, { useEffect, useState } from 'react'
import api from '../api/axios'

const STATUSES = [
  { value: 'not_started', label: 'Не начато' },
  { value: 'playing',     label: 'Играю'   },
  { value: 'completed',   label: 'Пройдено'},
]

interface Props {
  gameId: number
}

interface StatusRecord {
  id: number
  game: number
  status: string
}

export const GameStatusSelector: React.FC<Props> = ({ gameId }) => {
  const [recordId, setRecordId] = useState<number | null>(null)
  const [status, setStatus]   = useState<string>('not_started')

  useEffect(() => {
    setRecordId(null)
    setStatus('not_started')

    api
      .get<{
        count: number
        next: string | null
        previous: string | null
        results: StatusRecord[]
      }>('/users/user-game-status/', { params: { game: gameId } })
      .then(({ data }) => {
        const items = data.results
        if (items.length > 0) {
          console.log('Загружен статус из БД:', items[0])
          setRecordId(items[0].id)
          setStatus(items[0].status)
        }
      })
      .catch((e) => console.error('Ошибка загрузки статуса:', e.response?.data))
  }, [gameId])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value
    setStatus(newStatus)

    const payload = { game: gameId, status: newStatus }
    if (recordId) {
      api
        .patch(`/users/user-game-status/${recordId}/`, payload)
        .then(({ data }) => {
          console.log('Статус обновлён:', data)
        })
        .catch((e) => {
          console.error('Ошибка обновления статуса:', e.response?.data)
          alert('Не удалось обновить статус')
        })
    } else {
      api
        .post('/users/user-game-status/', payload)
        .then(({ data }) => {
          console.log('Новая запись статуса:', data)
          setRecordId(data.id)
        })
        .catch((e) => {
          console.error('Ошибка создания статуса:', e.response?.data)
          alert('Не удалось создать статус')
        })
    }
  }

  return (
    <div style={{ margin: '16px 0' }}>
      <label>
        Статус прохождения:{' '}
        <select value={status} onChange={handleChange} style={{ padding: 4 }}>
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default GameStatusSelector
