# Softbuy Backend API

A Node.js backend service for the Softbuy e-commerce platform built with Express.js and Prisma ORM.

## Features

- 👤 User Management
- 🛒 Shopping Cart Operations
- 📦 Product Management
- 📝 Order Processing
- 🔐 Secure Data Handling
- 🗄️ PostgreSQL Database with Prisma

## Tech Stack

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL

## Project Structure

```
basic-backend/
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.js         # Database seeder
├── src/
│   ├── index.js        # Entry point
│   ├── carts/          # Cart operations
│   ├── orders/         # Order management
│   ├── product/        # Product endpoints
│   ├── user/           # User management
│   └── db/             # Database configuration
└── .env                # Environment variables
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/acxell/basic-backend.git
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your database credentials and other configurations
```

4. Run Prisma migrations
```bash
npx prisma migrate dev
```

5. Seed the database (optional)
```bash
npx prisma db seed
```

6. Start the development server
```bash
npm run dev
```

## API Endpoints

### Users
- `POST /api/users` - Create new user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Products
- `POST /api/products` - Create new product
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Cart
- `POST /api/carts` - Create new cart
- `GET /api/carts/:userId` - Get user's cart
- `PUT /api/carts/:id` - Update cart
- `DELETE /api/carts/:id` - Delete cart

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:userId` - Get user's orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id` - Update order status

## Environment Variables

```env
DATABASE_URL="postgresql://user:password@localhost:5432/softbuy"
PORT=3000
```

## Database Schema

The database schema is defined in `prisma/schema.prisma`. Key models include:
- User
- Product
- Cart
- Order

## Scripts

- `npm run dev` - Start development server
- `npm start` - Start production server
- `npm run prisma:studio` - Open Prisma Studio
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:seed` - Seed the database

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

## Security

- Password hashing
- Input validation
- CORS protection

## License

This project is licensed under the MIT License - see the LICENSE file for details.