# Agnos Patient Registration Demo

A simple real-time patient registration demo built with Next.js, React, and Pusher.

## Features

- Patient registration form with validation
- Real-time status updates for Filling, Inactive, Submitted, and Cancelled
- Staff dashboard to monitor incoming submissions
- Modal-based submission details view
- Responsive layout for desktop and mobile

## Project Structure

- app/page.tsx - Home page
- app/views/userView/index.tsx - Patient form experience
- app/views/staffView/index.tsx - Staff dashboard
- app/components/Navbar/index.tsx - Navigation bar
- app/lib/pusher-client.ts - Pusher client helper
- app/api/patient-update/route.ts - Realtime publish endpoint

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Configure environment variables

This app uses Pusher for realtime updates. Create a `.env.local` file in the project root and add:

```env
PUSHER_APP_ID=your_pusher_app_id
PUSHER_KEY=your_pusher_key
PUSHER_SECRET=your_pusher_secret
PUSHER_CLUSTER=ap1

NEXT_PUBLIC_PUSHER_KEY=your_pusher_key
NEXT_PUBLIC_PUSHER_CLUSTER=ap1
```

You can also copy the example file [.env.example](.env.example).

### Run locally

```bash
npm run dev
```

Open the app at:

- http://localhost:3000/
- http://localhost:3000/user
- http://localhost:3000/staff

## Available Scripts

- npm run dev - start the development server
- npm run build - build the app for production
- npm run start - start the production server
- npm run lint - run ESLint

## Usage

1. Open the user form page.
2. Fill in the required fields.
3. As you type, the staff page updates in real time.
4. Submit the form to add the submission to the staff history.
5. Cancel the form to reset the current state.

## Notes

- The app uses a Vercel-friendly API route to publish realtime updates through Pusher.
- The staff view listens for realtime updates from the form page and updates instantly.
- If you deploy to Vercel, add the same environment variables in the Vercel dashboard under Project Settings > Environment Variables.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Bootstrap 5
- Pusher
