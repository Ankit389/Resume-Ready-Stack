# Purnima Career Studio — Production Full-Stack Website

A production-level career portfolio and service platform for a Resume & Career Profile Specialist.

## Architecture

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS v4 + ShadCN-style UI — port 5000
- **Backend**: Node.js + Express + MongoDB (Mongoose) + JWT Auth — port 3001
- **Package manager**: npm (separate packages in root and `backend/`)

## Project Structure

```
/                           # Frontend root
  src/
    App.tsx                 # React Router setup with AuthProvider
    pages/
      Home.tsx              # Landing page with hero, stats, services, testimonials
      About.tsx             # About page with timeline, skills, values
      Services.tsx          # Services list with search and filter
      ServiceDetails.tsx    # Individual service page
      Pricing.tsx           # Pricing plans + comparison table + FAQ
      Checkout.tsx          # Checkout with Razorpay integration
      Contact.tsx           # Contact form + info
      Login.tsx             # JWT login
      Signup.tsx            # Account creation with password strength
      Dashboard.tsx         # Protected user dashboard with orders + profile
    components/
      ui/                   # ShadCN-style UI components
        button.tsx          # Button with variants (default, glow, outline, ghost, etc.)
        card.tsx            # Card components
        input.tsx           # Dark-themed input
        label.tsx           # Form label
        badge.tsx           # Status badges
        separator.tsx       # Divider
      layout/
        Navbar.tsx          # Sticky dark navbar with auth state + mobile menu
        Footer.tsx          # Dark footer with links + contact info
    context/
      AuthContext.tsx       # JWT auth state (login, signup, logout)
    lib/
      utils.ts              # cn(), formatPrice(), formatDate()
      api.ts                # Axios API client with auth interceptors
  index.css                 # Dark theme CSS vars, animations, Tailwind v4 import
  vite.config.ts            # Port 5000, host 0.0.0.0, /api proxy to :3001

backend/
  server.js                 # Main Express server (port 3001)
  config/db.js              # MongoDB connection (graceful fallback if no URI)
  models/
    User.js                 # User model with bcrypt password hashing
    Order.js                # Order/payment model
    Contact.js              # Contact form submissions
  routes/
    auth.js                 # POST /api/auth/login, /signup; GET /api/auth/me
    orders.js               # POST /api/orders; GET /api/orders/my
    user.js                 # GET/PUT /api/user/profile
  middleware/
    auth.js                 # JWT protect middleware + generateToken
```

## Running Locally

Single "Start application" workflow runs both:
```
node backend/server.js & npm run dev
```

- Frontend: http://localhost:5000
- Backend API: http://localhost:3001
- API calls proxied via Vite: `/api/*` → `localhost:3001`

## Environment Variables Needed

| Secret | Purpose |
|--------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string (optional — app runs in-memory without it) |
| `JWT_SECRET` | JWT signing secret (defaults to built-in fallback) |
| `VITE_RAZORPAY_KEY_ID` | Razorpay Key ID for checkout (frontend env var) |

## Pages

| Route | Page |
|-------|------|
| `/` | Home — hero, stats, services, testimonials, CTA |
| `/about` | About — bio, timeline, values, skills |
| `/services` | Services — searchable grid with categories |
| `/services/:id` | Service Details — features, process, sidebar CTA |
| `/pricing` | Pricing — plans, comparison table, FAQ |
| `/checkout` | Checkout — order form + Razorpay payment |
| `/contact` | Contact — form + contact info + WhatsApp |
| `/login` | Login — JWT auth |
| `/signup` | Signup — account creation with password strength |
| `/dashboard` | Dashboard (protected) — orders history + profile edit |

## Design System

- **Theme**: Full dark (`#060612` background)
- **Primary**: Purple gradient (`#8b5cf6` → `#7c3aed`)
- **Accent**: Pink (`#ec4899`)
- **Glass cards**: `backdrop-blur` with `rgba(255,255,255,0.04)` background
- **Animations**: fadeInUp, float, pulse-glow, gradient-shift
- **Responsive**: Mobile-first, works from 320px to 4K

## Deployment

Configured for autoscale:
- **Build**: `npm run build` (TypeScript + Vite)
- **Run**: `node backend/server.js & npx vite preview --host 0.0.0.0 --port 5000`
