# Waks - Приложение для рассылки сообщений

Программа для автоматической рассылки сообщений в WhatsApp и Instagram.

## Стек технологий

- **Backend:** Python, FastAPI, SQLAlchemy, Celery, Redis
- **Frontend:** React, Axios, Redux
- **База данных:** PostgreSQL
- **Очередь сообщений:** Redis
- **Контейнеризация:** Docker, Docker Compose

## Структура проекта

```
Waks/
├── backend/              # FastAPI приложение
├── frontend/             # React приложение
├── docker-compose.yml    # Контейнеризация
└── .env.example          # Переменные окружения
```

## Быстрый старт

### Требования
- Docker и Docker Compose
- Python 3.9+ (для локальной разработки)
- Node.js 16+ (для локальной разработки фронтенда)

### С Docker Compose

```bash
docker-compose up -d
```

Бэкенд будет доступен на `http://localhost:8000`
Фронтенд будет доступен на `http://localhost:3000`

### Локальная разработка

#### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

#### Frontend

```bash
cd frontend
npm install
npm start
```

## API интеграции

### WhatsApp
- Используется Twilio API или Meta Business API
- Документация: https://www.twilio.com/whatsapp

### Instagram
- Используется Meta Graph API
- Документация: https://developers.facebook.com/docs/instagram-api

## Лицензия

MIT
