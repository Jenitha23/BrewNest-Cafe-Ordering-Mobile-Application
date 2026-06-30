# BrewNest — Café Ordering Mobile Application

BrewNest is a full-stack café ordering platform built as a mobile app (Expo / React Native) with a Spring Boot REST API backend. It supports two roles — **Customer** and **Admin** — each with a dedicated experience: customers browse the menu, place orders, and pay online, while admins manage the menu, categories, orders, and users from a separate dashboard.

## Features

### Customer
- Sign up / log in (JWT-based authentication)
- Browse menu items by category, view item details
- Add items to cart, update quantities, clear cart
- Checkout with delivery address
- Pay via PayHere (online card payment) or cash
- View order history and track order status
- Favorites, profile, and settings screens

### Admin
- Separate admin login
- Dashboard with live stats (menu items, available, out of stock, categories) and quick-access shortcuts to every management screen
- Menu item management — create, edit, delete, search/filter by status and category
- Image upload and removal for menu items
- Availability control (Available / Out of Stock / Hidden)
- Category management — create, rename, activate/deactivate, delete
- Order management — view all orders, update order status (Pending → Preparing → Ready → Completed / Cancelled)
- User management and app settings screens

## Tech Stack

**Frontend (mobile app)**
- React Native 0.85 + React 19, built with [Expo](https://expo.dev/) (SDK 56)
- React Navigation (stack + bottom tabs)
- Axios for API calls
- AsyncStorage for local/session storage
- `react-native-dotenv` for environment configuration
- `react-native-webview` for the PayHere payment flow

**Backend (REST API)**
- Java 17, Spring Boot 3.1.5
- Spring Web, Spring Data JPA, Spring Security
- JWT authentication (`jjwt`)
- Microsoft SQL Server (via `mssql-jdbc`)
- Flyway for database migrations
- Lombok
- PayHere payment gateway integration

## Project Structure

```
BrewNest-Cafe-Ordering-Mobile-Application/
├── brewnest_frontend/          # Expo / React Native app
│   └── src/
│       ├── api/                # Axios clients per domain (auth, menu, cart, orders, payment)
│       ├── components/         # Reusable UI components (cards, common, orders)
│       ├── context/             # Auth context / global state
│       ├── navigation/         # Root, Auth, Customer, and Admin navigators
│       ├── screens/
│       │   ├── auth/           # Welcome, login, signup
│       │   ├── customer/       # Customer-facing screens
│       │   └── admin/          # Admin dashboard and management screens
│       ├── services/           # API client + auth service
│       ├── theme/               # Colors, typography, global styles
│       └── utils/              # Constants, storage helpers, validators
│
└── brewnest-backend/            # Spring Boot REST API
    └── src/main/java/com/brewnest/
        ├── Controller/          # REST controllers (admin + customer)
        ├── service/              # Business logic (interfaces + impl)
        ├── repository/           # Spring Data JPA repositories
        ├── entity/                # JPA entities + enums (Role, OrderStatus, etc.)
        ├── dto/                   # Request / response DTOs
        ├── security/              # JWT filter, token provider, user details service
        ├── config/                # Security and web configuration
        ├── exception/             # Custom exceptions + global handler
        └── resources/
            └── db/migration/      # Flyway SQL migrations
```

## API Overview

All endpoints are served under the `/api` context path.

| Area | Base path | Description |
|---|---|---|
| Customer Auth | `/customer/auth` | Signup, login |
| Admin Auth | `/admin/auth` | Login, session check |
| Customer Menu | `/customer/menu` | Browse categories and items |
| Cart | `/customer/cart` | View, add, update, remove, clear cart items |
| Customer Orders | `/customer/orders` | Place order, view orders, cancel order |
| Payments | `/payments` | Create PayHere payment, handle payment notification |
| Admin Categories | `/admin/categories` | CRUD for menu categories |
| Admin Menu Items | `/admin/menu-items` | CRUD for menu items, availability updates, image upload/remove |
| Admin Orders | `/admin/orders` | View all orders, update order status |

## Getting Started

### Prerequisites
- Node.js (LTS) and npm
- Expo CLI (`npm install -g expo-cli` or use `npx expo`)
- Java 17 (JDK)
- Maven
- Microsoft SQL Server (local instance or remote)
- A PayHere merchant account (for payment testing)

### 1. Backend Setup

```bash
cd brewnest-backend
```

Create a `.env` file (or set environment variables) in the backend root with:

```env
DB_URL=jdbc:sqlserver://localhost:1433;databaseName=brewnest_db;encrypt=true;trustServerCertificate=true
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
JWT_SECRET=your_jwt_secret_key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_admin_password
```

Run the application (Flyway will automatically run the migrations in `src/main/resources/db/migration` against your database):

```bash
mvn spring-boot:run
```

The API will start on `http://localhost:8080/api`.

### 2. Frontend Setup

```bash
cd brewnest_frontend
npm install
```

Create a `.env` file in `brewnest_frontend/` pointing to your backend:

```env
API_BASE_URL=http://<your-local-ip>:8080/api
```

> Use your machine's local network IP (not `localhost`) so the app can reach the backend from a physical device or emulator.

Start the app:

```bash
npx expo start
```

Then open it on Android, iOS, or web using the Expo CLI prompts.

## Database

Schema is version-controlled with Flyway migrations (`brewnest-backend/src/main/resources/db/migration`), covering users, menu categories/items, cart, orders, order items, and payment status — applied automatically on startup.


