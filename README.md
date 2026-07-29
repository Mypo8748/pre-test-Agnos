# Agnos Patient Registration Demo

A simple real-time patient registration demo built with Next.js, React, and Socket.IO.

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
- app/lib/socket-client.ts - Socket.IO client helper
- server.js - Custom server for Next.js + Socket.IO

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open the app at:

- http://localhost:3000/
- http://localhost:3000/user
- http://localhost:3000/staff

## Available Scripts

- npm run dev - start the development server with Socket.IO support
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

- The app uses a custom server in server.js to host both Next.js and Socket.IO on the same port.
- The staff view listens for real-time updates from the form page and updates instantly.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Bootstrap 5
- Socket.IO
