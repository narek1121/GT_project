import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

interface Game {
  id: number;
  title: string;
  release_date: string | null;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  games: Game[];
}

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api
      .get<PaginatedResponse<Category>>('/categories/')
      .then(resp => {
        setCategories(resp.data.results);
      })
      .catch(err => {
        console.error('Ошибка при загрузке категорий', err);
        alert('Не удалось загрузить категории');
      });
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
      <h1>Категории (жанры)</h1>
      {categories.map(cat => (
        <div key={cat.id} style={{ marginBottom: 24 }}>
          <h2>{cat.name}</h2>

          {cat.games && cat.games.length > 0 ? (
            <ul>
              {cat.games.map(game => (
                <li key={game.id}>
                  <Link to={`/games/${game.id}`}>{game.title}</Link>
                  {game.release_date && <> ({game.release_date})</>}
                </li>
              ))}
            </ul>
          ) : (
            <p>Нет игр в этой категории.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
