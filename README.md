# CRUD Web

A CRUD-style user management app built with React, Redux Toolkit RTK Query, and Ant Design.

- Repository: [https://github.com/Punyashreekm/crud-web](https://github.com/Punyashreekm/crud-web)

## Prerequisites

- Node.js 18+
- npm 9+

## Installation

```bash
git clone https://github.com/Punyashreekm/crud-web.git
cd crud-web
npm install
```

## Run Application

```bash
npm run dev
```

App runs on Vite default URL (usually `http://localhost:5173`).

## Build for Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Optional: Mock API with JSON Server

Run JSON Server:

```bash
npm run test:mock
```

Run frontend against local mock API:

```bash
npm run dev:mock
```

## API

Default API base URL:

- `https://jsonplaceholder.typicode.com`

You can override with environment variable:

- `VITE_API_BASE_URL`
