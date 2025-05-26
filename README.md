# GameTrack

GameTrack — это веб-приложение для удобного отслеживания ваших игр, статусов прохождения, коллекций и отзывов.  

- **Бэкенд**: Django, Django REST Framework, Simple JWT, django-filters  
- **Фронтенд**: React, Vite, React Router v6, Tailwind CSS  
- **Дополнительно**: Steam API (импорт игр с обложками, жанрами и датой релиза)

---

##  Возможности

- Регистрация и аутентификация по JWT  
- Импорт игр из Steam по Steam App ID  
- Хранение метаданных игры: название, описание, дата релиза, обложка, жанры  
- Поставить статус прохождения игры (“не начато”, “играю”, “пройдено”)  
- Создавать личные коллекции игр, добавлять/удалять игры  
- Оставлять отзывы с рейтингом и комментарием  
- Автоматическое создание/синхронизация жанров (Category) из Steam  
- Удобный адаптивный интерфейс на Tailwind CSS

---


---

##  Настройка и запуск

### 1. Бэкенд

1. Перейдите в каталог `backend/` и создайте виртуальное окружение:
   ```bash
   cd backend
   python3 -m venv .venv
   source .venv/bin/activate    # Linux/macOS
   .venv\Scripts\activate       # Windows PowerShell

2. Установите зависимости:
    ```bash
   pip install -r requirements.txt

3. Задайте переменные окружения (например, в .env или экспортом):
   ```bash
    export DJANGO_SECRET_KEY="your-secret-key"
    export STEAM_API_KEY="ваш Steam Web API Key"
    export DATABASE_URL="postgres://user:pass@localhost:5432/gametrack"
   
4. Примените миграции и создайте суперпользователя:

    ```bash
    python manage.py migrate
    python manage.py createsuperuser
   
5. Запустите сервер разработки:

    ```bash
   python manage.py runserver

   
6. (Опционально) Заполните базу тестовыми играми:

    ```bash
    python manage.py shell
    from games.utils import fetch_steam_game
    info = fetch_steam_game(292030)  # пример app_id
    from games.models import Game
    Game.objects.create(**info)

   
### 2. Фронтенд

1. Перейдите в каталог frontend/:
    ```bash
   cd frontend

2. Установите зависимости:
    ```bash
   npm install

3. Убедитесь, что в src/api/axios.ts базовый URL настроен на ваш бэкенд:
    ```bash
    import axios from 'axios';

    export default axios.create({
    baseURL: 'http://localhost:8000/api/',
    // ...
    });
   
4. Запустите dev-сервер Vite:
   ```bash
   npm run dev

---


---

##  Тестирование

- Бэкенд:
    ```bash
    cd backend
    pytest
---
   



    