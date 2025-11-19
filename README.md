# CityScope Frontend

CityScope Frontend is a Next.js web application that helps residents explore and compare civic metrics for cities across the country. It provides a streamlined auth flow, an interactive dashboard, and reusable UI components built with Tailwind CSS.

## Getting Started

- Install dependencies: `npm install`
- Run the development server: `npm run dev`
- Visit `http://localhost:3000`

## Project Structure

```
cityscope-frontend/
├── app/                    # Next.js app router pages
│   ├── (auth)/             # Auth route group (doesn't affect URL)
│   │   ├── login/
│   │   │   └── page.tsx    # Login page
│   │   └── signup/          # Signup directory (empty)
│   ├── dashboard/
│   │   └── page.tsx        # Dashboard page
│   ├── layout.tsx           # Root layout
│   └── page.tsx            # Home page
├── components/              # Shared UI components
│   ├── forms/
│   │   └── LoginForm.tsx   # Login form component
│   ├── Charts.tsx          # Charts component (Recharts)
│   └── CitySelect.tsx      # City selector component
├── lib/                    # Utilities and helpers
│   ├── api.ts              # Axios instance & API functions
│   ├── auth.ts             # Authentication functions
│   ├── queryClient.ts      # TanStack Query client
│   └── zod-schemas.ts      # Zod validation schemas
├── styles/                  # Global styles
│   └── globals.css          # Global CSS & Tailwind imports
├── .gitignore              # Git ignore rules
├── next-env.d.ts           # Next.js TypeScript definitions
├── package.json            # Dependencies & scripts
├── package-lock.json       # Locked dependency versions
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
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