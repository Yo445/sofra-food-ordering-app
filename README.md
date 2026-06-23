# Sofra

A bilingual (English/Arabic) food ordering platform with a customer-facing menu, cart, checkout, order tracking, and an admin dashboard for managing products and orders.

## Tech Stack

**Client** — Next.js 16, React 19, TanStack Query, Zustand, react-i18next, Tailwind CSS 4, TypeScript

**Server** — Express, Mongoose, JWT, Zod validation, Multer (file uploads), TypeScript

## Project Structure

```
sofra/
├── client/              # Next.js frontend
│   ├── src/
│   │   ├── app/         # Next.js App Router pages
│   │   │   ├── (auth)/  # Login, Signup
│   │   │   ├── (customer)/ # Menu, Cart, Checkout, Orders, Tracking
│   │   │   └── admin/   # Dashboard, Products, Orders
│   │   ├── components/  # Reusable UI components
│   │   ├── hooks/       # TanStack Query hooks
│   │   ├── lib/         # Utilities (image helper, etc.)
│   │   ├── locales/     # i18n translations (en.json, ar.json)
│   │   ├── services/    # Axios API clients
│   │   ├── store/       # Zustand stores (auth, cart)
│   │   └── types/       # TypeScript type definitions
│   └── ...config files
└── server/              # Express backend
    ├── src/
    │   ├── config/      # DB, upload config
    │   ├── middleware/   # Auth, error handling
    │   ├── modules/     # Feature modules (auth, orders, products, etc.)
    │   └── utils/       # Shared utilities
    ├── uploads/         # Product images
    └── ...config files
```

## Prerequisites

- Node.js 18+
- MongoDB (running locally or a remote URI)

## Getting Started

### 1. Server

```bash
cd server
cp .env.example .env    # Edit .env with your MongoDB URI and JWT secret
npm install
npm run seed            # Seed the database with sample data
npm run dev             # Starts on http://localhost:3001
```

### 2. Client

```bash
cd client
npm install
npm run dev             # Starts on http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables (server/.env)

| Variable        | Description                    | Default                          |
|-----------------|--------------------------------|----------------------------------|
| `PORT`          | Server port                    | `3001`                           |
| `MONGODB_URI`   | MongoDB connection string      | `mongodb://localhost:27017/sofra` |
| `JWT_SECRET`    | Secret for signing JWT tokens  | (required)                       |
| `JWT_EXPIRES_IN`| Token expiry duration          | `7d`                             |

## Scripts

### Server

| Script        | Description                        |
|---------------|------------------------------------|
| `npm run dev` | Start dev server with hot reload   |
| `npm run build` | Compile TypeScript              |
| `npm start`   | Run compiled production server     |
| `npm run seed` | Seed database with sample data   |

### Client

| Script        | Description                        |
|---------------|------------------------------------|
| `npm run dev` | Start Next.js dev server           |
| `npm run build` | Production build                |
| `npm start`   | Start production server            |
| `npm run lint` | Run ESLint                       |

## Features

- **Authentication** — Sign up, login, JWT-based protected routes
- **Menu Browsing** — Product catalog with images, descriptions, prices
- **Cart** — Client-side cart with quantity management
- **Checkout** — Address collection and order placement
- **Order Tracking** — Real-time timeline (pending → preparing → on the way → delivered)
- **Admin Panel** — Dashboard stats, product CRUD (with image upload), order management
- **i18n** — Full English/Arabic support with RTL layout switching
- **Responsive** — Works on desktop and mobile

## API Overview

| Endpoint                | Method | Description                      |
|-------------------------|--------|----------------------------------|
| `/api/auth/signup`      | POST   | Register a new user              |
| `/api/auth/login`       | POST   | Login                            |
| `/api/products`         | GET    | List all products                |
| `/api/products/:id`     | GET    | Get single product               |
| `/api/products`         | POST   | Create product (admin)           |
| `/api/products/:id`     | PUT    | Update product (admin)           |
| `/api/products/:id`     | DELETE | Delete product (admin)           |
| `/api/orders`           | GET    | List user's orders               |
| `/api/orders`           | POST   | Create order                     |
| `/api/orders/:id`       | GET    | Get order details                |
| `/api/orders/:id/status`| PATCH  | Update order status (admin)      |
| `/api/payments`         | POST   | Process payment                  |
| `/api/dashboard/stats`  | GET    | Dashboard statistics (admin)     |
