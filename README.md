# Crypto Build

**Crypto Build** is a cutting-edge platform designed to automate trading strategies and maximize profits in the volatile cryptocurrency market. Leveraging advanced algorithmic trading tools like Freqtrade and TradingView, combined with AI models, our platform offers a robust solution for both novice and experienced traders seeking to optimize their investment strategies.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure sign-up and login with email, GitHub, and Google providers using NextAuth.js.
- **Subscription Management**: Handle user subscriptions with status tracking and renewal dates.
- **Newsletter Subscription**: Users can subscribe to newsletters with rate limiting to prevent spam.
- **TradingView Integration**: Submit and manage TradingView IDs with strategy names.
- **Responsive Design**: Optimized for both desktop and mobile devices using Tailwind CSS.
- **Markdown Support**: Blog posts and content are managed using Markdown files.
- **Rate Limiting**: Implemented rate limiting on certain API endpoints to enhance security.
- **Dark Mode**: Support for dark and light themes with seamless transitions.

## Technologies Used

- **Frontend**:
  - [Next.js](https://nextjs.org/) - React framework for server-side rendering and static site generation.
  - [React](https://reactjs.org/) - JavaScript library for building user interfaces.
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework.
  - [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript.
  
- **Backend**:
  - [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js applications.
  - [Prisma](https://www.prisma.io/) - ORM for PostgreSQL.
  - [Rate Limiter Flexible](https://github.com/animir/node-rate-limiter-flexible) - Rate limiting for APIs.
  
- **Database**:
  - [PostgreSQL](https://www.postgresql.org/) - Relational database for storing user and subscription data.
  
- **Others**:
  - [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Password hashing.
  - [Axios](https://axios-http.com/) - Promise-based HTTP client.
  - [Lucide React](https://lucide.dev/) - Icon library.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) database

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/crypto-build.git
   cd crypto-build
   ```

2. **Install Dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

3. **Set Up the Database**

   - Create a PostgreSQL database.
   - Update the `.env` file with your database credentials.

4. **Run Database Migrations**

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the Development Server**

   Using npm:

   ```bash
   npm run dev
   ```

   Or using Yarn:

   ```bash
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/crypto_build
SHADOW_DATABASE_URL=postgresql://username:password@localhost:5432/crypto_build_shadow
NEXTAUTH_SECRET=your_nextauth_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
EMAIL_SERVER_HOST=your_email_server_host
EMAIL_SERVER_PORT=your_email_server_port
EMAIL_SERVER_USER=your_email_server_user
EMAIL_SERVER_PASSWORD=your_email_server_password
EMAIL_FROM=your_email_from_address
SITE_URL=http://localhost:3000
```

**Note**: Replace the placeholder values with your actual credentials.

## Database Schema

The database schema is managed using Prisma. Below is an overview of the main models:

- **User**
  - `id`: Unique identifier
  - `name`: User's name
  - `email`: User's email (unique)
  - `password`: Hashed password
  - `accounts`: OAuth accounts
  - `sessions`: User sessions
  - `purchases`: User purchases
  - `subscriptions`: User subscriptions

- **Account**
  - `id`: Unique identifier
  - `userId`: Reference to the user
  - `type`, `provider`, `providerAccountId`: OAuth account details
  - Tokens and expiration details

- **Session**
  - `id`: Unique identifier
  - `sessionToken`: Unique session token
  - `userId`: Reference to the user
  - `expires`: Expiration date

- **Purchase**
  - `id`: Unique identifier
  - `userId`: Reference to the user
  - `productId`: Reference to the product
  - Status and renewal details

- **Subscription**
  - `id`: Unique identifier
  - `userId`: Reference to the user
  - `productId`: Reference to the product
  - Status, renewal date, and plan type

- **NewsletterEmail**
  - `id`: Unique identifier
  - `email`: Subscriber's email (unique)
  - `createdAt`: Subscription date

- **TradingViewSubmission**
  - `id`: Unique identifier
  - `tradingViewId`: TradingView ID
  - `email`: User's email
  - `strategyName`: Name of the trading strategy



## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**

2. **Create a New Branch**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m "Add some feature"
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/YourFeature
   ```

5. **Open a Pull Request**

## License

This project is licensed under the [MIT License](LICENSE).

