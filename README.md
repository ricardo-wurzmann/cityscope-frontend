# CityScope Frontend

CityScope Frontend is a Next.js web application that helps residents explore and compare civic metrics for cities across the country. It provides a streamlined auth flow, an interactive dashboard, and reusable UI components built with Tailwind CSS.

## Getting Started

- Install dependencies: `npm install`
- Run the development server: `npm run dev`
- Visit `http://localhost:3000`

## Project Structure

```
app/               # Next.js app router pages
components/        # Shared UI components
lib/               # API helpers, auth utilities, schema definitions
styles/            # Global styles
```

## Tech Stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- TanStack Query
- Zod
- Axios

## Environment Variables

Create a `.env.local` file with the following values:

```
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

Adjust the URL to point to your CityScope backend.