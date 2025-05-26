import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../api/auth";
import { setToken } from "../../hooks/useAuth";
import Button from "../../components/Button";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await register({ username, password });
      setToken(data.access);
      navigate("/");
    } catch {
      alert("Ошибка регистрации");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Логин:
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Пароль:
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <Button type="submit">Зарегистрироваться</Button>
      </form>
      <p style={{ marginTop: 16 }}>
        Уже есть аккаунт?{" "}
        <Link to="/login">Войти</Link>
      </p>
    </div>
  );
};

export default Register;
