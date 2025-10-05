# Bizzy Shopping Basket Monorepo


### Backend
- The app requires a running PostgreSQL DB. Set up `.env` with your database URL
  - `DATABASE_URL=postgresql://username:password@localhost:5432/your_db_name`
- Run `npx prisma migrate dev` to create schema
- Then `npm run dev` to start API server

### Frontend
- Run `npm install`
- Run `npm run dev` to start Vite React app

Open [http://localhost:5173](http://localhost:5173) for frontend, and [http://localhost:4000/graphql](http://localhost:4000/graphql) for backend.

## Architecture
See `ARCHITECTURE.md` for design and decision details.
