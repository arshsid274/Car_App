# UAE Car Super-App

A production-oriented monorepo for a UAE car services super-app with:

- `mobile/`: Expo + React Native + TypeScript client
- `backend/`: Express + MongoDB + JWT API

## Highlights

- Mini-app architecture with a top horizontal section switcher
- Shared global state for section, cart, user, and bookings
- Persistent bottom tabs for Home, Services, Market, Account, and Cart
- Modular Express controllers, routes, models, and middleware
- Sample implementations for car wash bookings, spare parts cart flows, buy/sell listings, parking, rentals, and merchant onboarding

## Structure

```text
.
|-- mobile
|   |-- App.tsx
|   |-- package.json
|   `-- src
|       |-- components
|       |-- constants
|       |-- navigation
|       |-- screens
|       |-- services
|       |-- store
|       |-- types
|       `-- utils
`-- backend
    |-- package.json
    `-- src
        |-- config
        |-- controllers
        |-- middlewares
        |-- models
        |-- routes
        |-- types
        `-- utils
```

## Quick Start

### Mobile

```bash
cd mobile
cp .env.example .env
npm install
npm run start
```

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

The default mobile API URL assumes the backend is reachable at `http://localhost:5000/api`.

## API Surface

Base URL: `http://localhost:5000/api`

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `GET /users/profile`
- `GET /users/vehicles`
- `POST /users/vehicles`
- `GET /services/catalog`
- `GET /services/bookings`
- `POST /services/bookings`
- `GET /products`
- `GET /products/orders`
- `POST /products/cart/checkout`
- `GET /cars`
- `GET /cars/valuation`
- `POST /cars/sell`
- `GET /rentals`
- `POST /rentals/book`
- `GET /parking`
- `POST /parking/reserve`
- `GET /merchant`
- `POST /merchant/register`

## Notable Frontend Flows

- Top horizontal mini-app switcher with shared global state via Zustand
- Dynamic search placeholder and animated section transitions with Reanimated
- Detailed sample implementations for Car Wash, Spare Parts, Buy Car, Repairs, Parking, Rentals, and Merchant onboarding
- Cart badge and persisted bookings/cart/user state via AsyncStorage

## Notes

- The mobile client gracefully falls back to local demo behavior if the backend is unavailable during interactive actions.
- Parking currently uses a mock map panel that can be replaced with Google Maps or Mapbox once provider keys are configured.
- Payment, push notifications, and admin tooling are left as clean extension points rather than partially wired mocks.
