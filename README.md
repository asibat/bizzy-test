# Bizzy Shopping Basket Monorepo

## Quickstart

## 1. Install Dependencies for Both Backend and Frontend

From your root project directory, run: `npm run setup` to install dependencies on both `backend` and `frontend`

## 2. Backend
- Set up `.env` with your database URL 
- Add a `DATABASE_URL` variable to your `.env` file.
  - Example: `DATABASE_URL=postgresql://username:password@localhost:5432/your_db_name`
  - To quickly start a local Postgres instance with Docker:
    ```
        docker run --name bizzy-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=bizzydb -p 5432:5432 -d postgres:15
    ```
    - Make sure the app's `DATABASE_URL` in your .env matches the container credentials above for a seamless setup.
- Run `npx prisma migrate dev` to create schema

## 3. Start Both Backend & Frontend
From the root directory, simply run: `npm run dev`

Open [http://localhost:5173](http://localhost:5173) for frontend, and [http://localhost:4000/graphql](http://localhost:4000/graphql) for backend.

## Architecture
See `ARCHITECTURE.md` for design and decision details.