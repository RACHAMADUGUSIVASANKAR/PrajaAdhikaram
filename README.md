# Praja Adhikaram AI

Praja Adhikaram AI is a web app and API for discovering Indian government schemes and checking eligibility based on a user profile.


https://github.com/user-attachments/assets/2c72a164-2129-4d8f-8ae3-4cce18daf780


## Tech stack

- Frontend: Next.js 14, React 18, Tailwind CSS, GSAP, Framer Motion, Three.js
- Backend: FastAPI, Pydantic

## Features

- Scheme discovery and browsing
- Eligibility scoring with confidence
- Chat-style guidance

## Getting started

### Frontend

```bash
npm install
npm run dev
```

The app runs on your localhost by default.

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

The API runs on localhost

## API endpoints

- GET / -> service status
- GET /schemes -> list schemes
- POST /check-eligibility -> eligibility analysis
- POST /chat -> simple guidance responses

## Scripts

- npm run dev
- npm run build
- npm run start
- npm run lint
