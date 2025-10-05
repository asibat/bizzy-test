# Bizzy Shopping Basket Monorepo

## Quickstart

## 1. Install Dependencies for Both Backend and Frontend

From your root project directory, run: `npm run setup` to install dependencies on both `backend` and `frontend`

## 2. Backend
- Set up `.env` with your database URL
- Run `npx prisma migrate dev` to create schema

## 3. Start Both Backend & Frontend
From the root directory, simply run: `npm run dev`

Open [http://localhost:5173](http://localhost:5173) for frontend, and [http://localhost:4000/graphql](http://localhost:4000/graphql) for backend.

## Architecture
See `ARCHITECTURE.md` for design and decision details.