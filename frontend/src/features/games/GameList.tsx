import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { getToken } from "../../hooks/useAuth";

interface Game {
  id: number;
  title: string;
  release_date: string;
  steam_app_id: number;
  cover_url?: string;
}

const GameList: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [search, setSearch] = useState("");
  const [steamId, setSteamId] = useState("");
  const [loading, setLoading] = useState(false);
  const token = getToken();

  const fetchGames = async (searchTerm = "") => {
    setLoading(true);
    try {
      const resp = await api.get<{ results: Game[] }>("/games/", {
        params: searchTerm ? { search: searchTerm } : {}
      });
      setGames(resp.data.results);
    } catch (err) {
      console.error("Ошибка при загрузке игр:", err);
      setGames([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchGames(search);
  };

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      alert("Только авторизованным пользователям можно импортировать игру");
      return;
    }
    if (!steamId) {
      alert("Введите Steam App ID");
      return;
    }

    try {
      await api.post("/games/import-steam/", {
        steam_app_id: parseInt(steamId, 10)
      });
      setSteamId("");
      fetchGames();
    } catch (err: any) {
      alert(err.response?.data?.error || "Ошибка импорта из Steam");
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
      <h1>Список игр</h1>

      <form onSubmit={handleSearch} style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Поиск по названию..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: 8, padding: 4, width: 200 }}
        />
        <button type="submit" style={{ padding: "4px 12px" }}>Поиск</button>
        <button
          type="button"
          onClick={() => { setSearch(""); fetchGames(); }}
          style={{ marginLeft: 8, padding: "4px 12px" }}
        >
          Сбросить
        </button>
      </form>

      <form onSubmit={handleImport} style={{ marginBottom: 24 }}>
        <input
          type="number"
          placeholder="Steam App ID"
          value={steamId}
          onChange={(e) => setSteamId(e.target.value)}
          style={{ marginRight: 8, padding: 4, width: 120 }}
        />
        <button type="submit" style={{ padding: "4px 12px" }}>
          Импортировать из Steam
        </button>
      </form>

      {loading ? (
        <p>Загрузка…</p>
      ) : games.length === 0 ? (
        <p>Ничего не найдено.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {games.map((g) => (
            <li
              key={g.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 12
              }}
            >
              {g.cover_url && (
                <img
                  src={g.cover_url}
                  alt={g.title}
                  style={{
                    width: 60,
                    height: 30,
                    objectFit: "cover",
                    marginRight: 12,
                    borderRadius: 4
                  }}
                />
              )}
              <Link to={`/games/${g.id}`} style={{ fontSize: 18, color: "#4e8ef7" }}>
                {g.title}
              </Link>
              <span style={{ marginLeft: 8, color: "#aaa" }}>
                ({g.release_date})
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GameList;
