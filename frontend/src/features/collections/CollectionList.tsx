import React, { useEffect, useState } from 'react'
import api from '../../api/axios'
import axios from 'axios'

interface Game {
  id: number
  title: string
  description: string
  release_date: string
  steam_app_id: number
}

interface Collection {
  id: number
  name: string
  games: Game[]
}

interface PaginatedCollections {
  count: number
  next: string | null
  previous: string | null
  results: Collection[]
}

const CollectionList: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([])
  const [newName, setNewName] = useState('')

  const loadCollections = async () => {
    try {
      const resp = await api.get<PaginatedCollections>('/collections/')
      setCollections(resp.data.results)
    } catch (err) {
      console.error('Failed to load collections', err)
      alert('Ошибка при загрузке коллекций')
    }
  }

  const handleCreate = async () => {
    if (!newName.trim()) {
      alert('Введите имя коллекции')
      return
    }
    try {
      await api.post('/collections/', { name: newName })
      setNewName('')
      await loadCollections()
    } catch (err) {
      console.error('Failed to create collection', err)
      alert('Ошибка при создании коллекции')
    }
  }

  const handleDeleteCollection = async (collId: number) => {
    if (!window.confirm('Удалить коллекцию? Это действие необратимо.')) {
      return
    }
    try {
      await api.delete(`/collections/${collId}/`)
      setCollections((prev) => prev.filter((c) => c.id !== collId))
    } catch (err) {
      console.error('Failed to delete collection', err)
      alert('Ошибка при удалении коллекции')
    }
  }

  const handleAddGame = async (collId: number) => {
    const gameIdStr = prompt('ID игры для добавления:')
    if (!gameIdStr) return
    const gameId = parseInt(gameIdStr, 10)
    if (isNaN(gameId)) {
      alert('Неверный ID игры')
      return
    }
    try {
      await api.post(`/collections/${collId}/add_game/`, { game_id: gameId })
      await loadCollections()
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as any
        if (err.response?.status === 400 && data?.error) {
          alert(data.error)
          return
        }
      }
      console.error('Failed to add game', err)
      alert('Ошибка при добавлении игры')
    }
  }

  const handleRemoveGame = async (collId: number, gameId: number) => {
    try {
      await api.post(`/collections/${collId}/remove_game/`, { game_id: gameId })
      await loadCollections()
    } catch (err) {
      console.error('Failed to remove game', err)
      alert('Ошибка при удалении игры')
    }
  }

  useEffect(() => {
    loadCollections()
  }, [])

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
      <h1>Мои коллекции</h1>

      <div style={{ marginBottom: 24 }}>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Новая коллекция"
          style={{ padding: 8, marginRight: 8, width: '60%' }}
        />
        <button onClick={handleCreate} style={{ padding: '8px 16px' }}>
          Создать
        </button>
      </div>

      {collections.length === 0 ? (
        <p>У вас ещё нет коллекций.</p>
      ) : (
        collections.map((coll) => (
          <div
            key={coll.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: 4,
              padding: 16,
              marginBottom: 16,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0 }}>{coll.name}</h2>
              <button
                onClick={() => handleDeleteCollection(coll.id)}
                style={{ padding: '4px 8px' }}
              >
                Удалить коллекцию
              </button>
            </div>

            <button
              onClick={() => handleAddGame(coll.id)}
              style={{ margin: '12px 0', padding: '4px 8px' }}
            >
              Добавить игру по ID
            </button>

            {coll.games.length === 0 ? (
              <p>Пусто</p>
            ) : (
              <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                {coll.games.map((g) => (
                  <li key={g.id} style={{ marginBottom: 8 }}>
                    {g.title}{' '}
                    <button
                      onClick={() => handleRemoveGame(coll.id, g.id)}
                      style={{
                        marginLeft: 8,
                        padding: '2px 6px',
                        fontSize: '0.9em',
                      }}
                    >
                      Удалить
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
  )
}

export default CollectionList
