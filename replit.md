# Purnima Career Studio (Resume Ready Stack)

A professional portfolio and service website for a Resume & Career Profile Specialist.

## Architecture

- **Frontend**: React 18 + TypeScript + Tailwind CSS, built with Vite — runs on port 5000
- **Backend**: Node.js + Express API — runs on port 3001
- **Package manager**: npm (separate packages for frontend root and `backend/`)

## Project Layout

```
/                   # Frontend root
  src/              # React source (components, pages, config)
  public/           # Static assets (images, QR codes)
  vite.config.ts    # Vite config — port 5000, proxy /api → localhost:3001
  package.json      # Frontend dependencies
backend/            # Express API server
  server.js         # Main server entry — port 3001
  package.json      # Backend dependencies
```

## Running Locally

Both servers start via the "Start application" workflow:
```
node backend/server.js & npm run dev
```

- Frontend (Vite dev server): http://localhost:5000
- Backend API: http://localhost:3001
- API proxied via Vite: `/api/*` → `http://localhost:3001`

## API Endpoints

- `GET /api/health` — Health check
- `GET /api/services` — List all services
- `GET /api/services/:id` — Get a single service
- `GET /api/plans` — List all pricing plans
- `GET /api/plans/:id` — Get a single plan
- `POST /api/contact` — Submit contact form
- `GET /api/contact` — List contact messages (admin)
- `POST /api/payments/webhook` — Razorpay webhook handler

## Deployment

Configured for autoscale deployment:
- **Build**: Installs deps and runs `npm run build` (Vite + TypeScript)
- **Run**: Starts Express backend on port 3001 and serves Vite preview on port 5000

## Key Notes

- Contact messages are stored in-memory (no database); production should add a DB.
- Razorpay webhook handler is stubbed — requires `RAZORPAY_WEBHOOK_SECRET` env var.
- Paytm QR code for manual payments is in `public/paytm-qr.png`.
