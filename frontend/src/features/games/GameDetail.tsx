import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import { getToken } from "../../hooks/useAuth";
import { GameStatusSelector } from "../../components/GameStatusSelector";

interface Review {
  id: number;
  user: string;
  text: string;
  rating: number;
  created_at: string;
}

interface Game {
  id: number;
  title: string;
  description: string;
  release_date: string;
  steam_app_id: number;
  cover_url?: string;
  reviews: Review[];
}

const GameDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const gameId = Number(id);
  const [game, setGame] = useState<Game | null>(null);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const token = getToken();

  useEffect(() => {
    if (!id) return;
    api.get<Game>(`/games/${id}/`)
      .then((resp) => setGame(resp.data))
      .catch((err) => {
        console.error("Ошибка загрузки игры:", err);
        alert("Не удалось загрузить данные игры");
      });
  }, [id]);

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      alert("Нужно войти, чтобы оставить отзыв");
      return;
    }
    try {
      const resp = await api.post<Review>(`/games/${id}/review/`, {
        text,
        rating
      });
      setGame((g) =>
        g
          ? { ...g, reviews: [...g.reviews, resp.data] }
          : g
      );
      setText("");
      setRating(5);
    } catch (err) {
      console.error("Ошибка при отправке отзыва:", err);
      alert("Не удалось отправить отзыв");
    }
  };

  if (!game) {
    return <div style={{ padding: 16 }}>Загрузка…</div>;
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
      <h1 style={{ marginBottom: 8 }}>{game.title}</h1>

      {game.cover_url && (
        <img
          src={game.cover_url}
          alt={game.title}
          style={{
            width: "100%",
            maxWidth: 400,
            display: "block",
            margin: "0 auto 16px",
            borderRadius: 6
          }}
        />
      )}

      <GameStatusSelector gameId={gameId} />

      <p style={{ lineHeight: 1.6 }}>{game.description}</p>

      <h2 style={{ marginTop: 32 }}>Отзывы</h2>
      {game.reviews.length === 0 ? (
        <p>Пока нет отзывов.</p>
      ) : (
        game.reviews.map((r) => (
          <div
            key={r.id}
            style={{
              borderBottom: "1px solid #ddd",
              padding: "12px 0",
              marginBottom: 12
            }}
          >
            <strong>{r.user}</strong>{" "}
            <em style={{ color: "#666" }}>
              ({new Date(r.created_at).toLocaleString()})
            </em>
            <p style={{ margin: "8px 0" }}>{r.text}</p>
            <div>Оценка: {r.rating}/5</div>
          </div>
        ))
      )}

      <h3 style={{ marginTop: 32 }}>Оставить отзыв</h3>
      <form onSubmit={submitReview} style={{ marginTop: 16 }}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 4 }}>
            Текст отзыва:
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            rows={4}
            style={{ width: "100%", padding: 8, borderRadius: 4 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 4 }}>
            Оценка:
          </label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            style={{ padding: 4, borderRadius: 4 }}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>{" "}
          / 5
        </div>
        <button type="submit" style={{ padding: "8px 16px", borderRadius: 4 }}>
          Отправить
        </button>
      </form>
    </div>
  );
};

export default GameDetail;
