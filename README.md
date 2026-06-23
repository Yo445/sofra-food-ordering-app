# Sofra
<img width="1905" height="972" alt="image" src="https://github.com/user-attachments/assets/25064b50-0679-42b5-8e5c-45459c8bb7a8" />


A bilingual (English/Arabic) food ordering platform with a customer-facing menu, cart, checkout, order tracking, and an admin dashboard for managing products and orders.

## Tech Stack

**Client** — Next.js 16, React 19, TanStack Query, Zustand, react-i18next, Tailwind CSS 4, TypeScript

**Server** — Express, Mongoose, JWT, Zod validation, Multer (file uploads), Swagger, TypeScript

## Architecture

```
┌──────────────┐       ┌───────────────────────────────────┐
│   Browser    │──────▶│          Express Server            │
│  (Next.js)   │       │         (http://localhost:3001)     │
│ localhost:3000│       │                                   │
│              │       │  ┌─────────┐  ┌─────────────────┐  │
│  ┌────────┐  │       │  │ Auth    │  │ MongoDB/Mongoose│  │
│  │React   │  │       │  │ JWT     │──│ (Users,Orders,  │  │
│  │TanStack│  │       │  │ bcrypt  │  │  Products,Pay.) │  │
│  │Query   │  │       │  ├─────────┤  └─────────────────┘  │
│  │Zustand │  │       │  │Routes  │                         │
│  │i18n    │  │       │  │ Zod    │  ┌─────────────────┐  │
│  │Tailwind│  │       │  │ Multer │──│  /uploads/      │  │
│  └────────┘  │       │  │Swagger │  │  (images)       │  │
└──────────────┘       │  └─────────┘  └─────────────────┘  │
                       └───────────────────────────────────┘
```

## Project Structure

### Client (`client/`)

```
client/src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   #   Public auth routes
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (customer)/               #   Customer routes (auth-guarded)
│   │   ├── cart/page.tsx
│   │   ├── checkout/page.tsx
│   │   ├── menu/page.tsx
│   │   ├── orders/page.tsx
│   │   ├── payment/page.tsx
│   │   ├── tracking/[orderId]/page.tsx
│   │   └── layout.tsx
│   ├── admin/                    #   Admin routes (admin-guarded)
│   │   ├── dashboard/page.tsx
│   │   ├── orders/page.tsx
│   │   ├── products/page.tsx
│   │   └── layout.tsx
│   ├── layout.tsx                #   Root layout (QueryProvider, I18nProvider)
│   ├── page.tsx                  #   Landing page
│   └── not-found.tsx
├── components/
│   ├── admin/                    #   Admin panel components
│   │   ├── DashboardStats.tsx
│   │   ├── OrdersTable.tsx
│   │   ├── ProductModal.tsx
│   │   ├── ProductsTable.tsx
│   │   └── RecentOrders.tsx
│   ├── auth/                     #   Auth guard wrapper
│   │   └── AuthGuard.tsx
│   ├── cart/                     #   Cart UI components
│   ├── checkout/                 #   Checkout form components
│   ├── common/                   #   Shared UI (Button, Input, Modal, Loader...)
│   ├── layout/                   #   Navbar, Footer, Sidebar, LanguageSwitcher
│   ├── menu/                     #   Menu catalog components
│   ├── tracking/                 #   Order tracking components
│   ├── I18nProvider.tsx          #   i18n provider
│   └── QueryProvider.tsx         #   TanStack Query provider
├── hooks/                        # TanStack Query hooks
│   ├── useAuth.ts                #   useLogin, useSignup, useLogout
│   ├── useCart.ts
│   ├── useDashboard.ts           #   useDashboardStats
│   ├── useOrders.ts              #   useOrders, useOrderDetail, useCreateOrder...
│   ├── usePayment.ts             #   useCreatePayment
│   └── useProducts.ts            #   useProducts, useProduct, useCreateProduct...
├── lib/                          # Utilities
│   ├── axios.ts                  #   Axios instance with JWT interceptor
│   ├── constants.ts
│   ├── i18n.ts                   #   i18next config
│   ├── image.ts                  #   getImageUrl() helper
│   └── utils.ts
├── locales/                      # i18n translations
│   ├── en.json
│   └── ar.json
├── services/                     # API service layers (called by hooks)
│   ├── auth.service.ts
│   ├── dashboard.service.ts
│   ├── order.service.ts
│   ├── payment.service.ts
│   └── product.service.ts
├── store/                        # Zustand stores
│   ├── auth.store.ts
│   ├── cart.store.ts
│   └── order.store.ts
└── types/                        # TypeScript type definitions
    ├── auth.ts
    ├── order.ts
    └── product.ts
```

### Server (`server/`)

```
server/src/
├── config/                       # Configuration
│   ├── cors.ts                   #   CORS options
│   ├── db.ts                     #   MongoDB connection
│   ├── env.ts                    #   Environment variables
│   ├── swagger.ts                #   Swagger/OpenAPI spec
│   └── upload.ts                 #   Multer file upload config
├── middleware/                    # Express middleware
│   ├── auth.middleware.ts        #   JWT authentication
│   ├── error.middleware.ts       #   Global error handler
│   ├── role.middleware.ts        #   Role-based authorization
│   └── validate.middleware.ts    #   Zod validation
├── modules/                      # Feature modules
│   ├── auth/                     #   Authentication
│   │   ├── auth.controller.ts
│   │   ├── auth.routes.ts
│   │   ├── auth.service.ts
│   │   ├── auth.validation.ts
│   │   └── user.model.ts
│   ├── users/                    #   User profile
│   │   ├── user.controller.ts
│   │   ├── user.routes.ts
│   │   └── user.service.ts
│   ├── products/                 #   Product CRUD
│   │   ├── product.controller.ts
│   │   ├── product.model.ts
│   │   ├── product.routes.ts
│   │   ├── product.service.ts
│   │   └── product.validation.ts
│   ├── orders/                   #   Order management
│   │   ├── order.controller.ts
│   │   ├── order.model.ts
│   │   ├── order.routes.ts
│   │   ├── order.service.ts
│   │   └── order.validation.ts
│   ├── payments/                 #   Payment processing
│   │   ├── payment.controller.ts
│   │   ├── payment.model.ts
│   │   ├── payment.routes.ts
│   │   └── payment.service.ts
│   └── dashboard/                #   Admin dashboard stats
│       ├── dashboard.controller.ts
│       ├── dashboard.routes.ts
│       └── dashboard.service.ts
├── utils/                        # Shared utilities
│   ├── ApiError.ts               #   Custom error class
│   ├── ApiResponse.ts            #   Response wrapper
│   └── logger.ts                 #   Simple logger
├── app.ts                        # Express app setup + Swagger UI
├── server.ts                     # Entry point
└── seed.ts                       # Database seeder (admin account)
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

Once the server is running, view the interactive API documentation at [http://localhost:3001/api-docs](http://localhost:3001/api-docs).

## Environment Variables (server/.env)

| Variable        | Description                    | Default                          |
|-----------------|--------------------------------|----------------------------------|
| `PORT`          | Server port                    | `3001`                           |
| `MONGODB_URI`   | MongoDB connection string      | `mongodb://localhost:27017/sofra` |
| `JWT_SECRET`    | Secret for signing JWT tokens  | (required)                       |
| `JWT_EXPIRES_IN`| Token expiry duration          | `7d`                             |

## Scripts

### Server

| Script          | Description                            |
|-----------------|----------------------------------------|
| `npm run dev`   | Start dev server with hot reload       |
| `npm run build` | Compile TypeScript                     |
| `npm start`     | Run compiled production server         |
| `npm run seed`  | Seed database with sample data         |
| Swagger UI      | Visit `http://localhost:3001/api-docs` |

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

Interactive API documentation available at [http://localhost:3001/api-docs](http://localhost:3001/api-docs) (requires server running).

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
