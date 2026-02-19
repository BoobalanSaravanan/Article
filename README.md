# ChessMind

ChessMind is a full-stack, responsive chess article website built with React + Vite, Tailwind CSS, Node.js, Express, MongoDB (Mongoose), and Chart.js.

## Features

- Educational chess blog covering strategy, history, achievements, and beginner tips.
- Required pages:
  - Home
  - Article listing
  - Single article detail with multiple CTAs + sticky sidebar CTA
  - Player profile
  - Contact page with validation
  - Admin analytics dashboard (Chart.js)
- Event tracking system for CTA clicks, scroll depth milestones (25/50/75/100), and time-on-page.
- Backend analytics API for CTA and article performance metrics.
- Seeded sample content with 4 initial articles.
- SEO-friendly metadata and lazy-loaded images.

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, React Router, Chart.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose

## Project Structure

```txt
.
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── data
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── seed.js
│   │   └── server.js
│   └── .env.example
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── hooks
│   │   ├── layouts
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── .env.example
└── package.json
```

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Backend:

```bash
cp backend/.env.example backend/.env
```

Frontend:

```bash
cp frontend/.env.example frontend/.env
```

Update `backend/.env` with your MongoDB connection string if needed.

### 3. Run development servers

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## API Endpoints

- `GET /api/health`
- `GET /api/articles`
- `GET /api/articles/:slug`
- `POST /api/events`
- `GET /api/events/analytics/summary`

## Event Tracking Payload

Events store:

- `eventType`
- `page`
- `articleId`
- `scrollDepth`
- `timeOnPage`
- `sessionId`
- `timestamp`

## Notes

- Sample articles are auto-seeded on first backend startup.
- Dashboard metrics include total CTA clicks, most clicked CTA, most viewed article, average time spent, scroll distribution, and conversion rate per article.
