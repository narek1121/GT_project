import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Home from './features/home/Home';
import Layout from './components/Layout';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      {/* Внешний лэйаут */}
      <Route path="/" element={<Layout />}>
        {/* по умолчанию редиректим неавторизованного на логин */}
        <Route index element={<Home />} />

        {/* Страница логина */}
        <Route path="login" element={<Login />} />

        {/* Страница регистрации */}
        <Route path="register" element={<Register />} />

        {/* Пример защищённого маршрута */}
        {/* <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */}
      </Route>

      {/* Всё, что не попало выше, — редирект на главную (или 404) */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
