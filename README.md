# User Management CRUD Application

A CRUD-style user management app built with React, RTK Query, and Ant Design.

## API Source

Default API is:

- `https://jsonplaceholder.typicode.com/users`

RTK Query base URL can be overridden with `VITE_API_BASE_URL`.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run frontend:
   ```bash
   npm run dev
   ```

## JSON Server Mock Testing

If you want to test against local JSON Server instead:

1. Start JSON Server:
   ```bash
   npm run test:mock
   ```
2. Run frontend with local API:
   ```bash
   npm run dev:mock
   ```

## Pagination + URL State

User list pagination uses Ant Design `Pagination` component and keeps page in URL search params:

- query key: `page`
- default: `?page=1`
