# Golf Charity Subscription Platform

A full-stack web application for golf charity subscriptions with score management and draw system.

## Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Node.js + Express
- **Database**: Supabase (PostgreSQL)
- **Auth**: JWT-based authentication
- **Deployment**: Vercel (Frontend), Render/Railway (Backend)

## Features

1. **Authentication System**
   - User signup and login
   - JWT authentication
   - Protected routes

2. **Subscription System**
   - Monthly and Yearly plans
   - Subscription status tracking
   - Dashboard access control

3. **Score Management**
   - Add golf scores (1-45 range)
   - Store last 5 scores only
   - Auto-remove oldest score on 6th entry

4. **Draw System**
   - Admin-triggered draws
   - Generate 5 random numbers (1-45)
   - Prize matching system (3-5 matches)

5. **Charity System**
   - Multiple charity options
   - Contribution percentage tracking

6. **User Dashboard**
   - Subscription status
   - Score management
   - Charity selection
   - Draw results

7. **Admin Panel**
   - User management
   - Draw triggering
   - Results viewing

## Project Structure

```
├── frontend/          # React Vite application
├── backend/           # Node.js Express API
└── README.md         # This file
```

## Setup Instructions

1. Clone the repository
2. Set up Supabase database
3. Configure environment variables
4. Install dependencies
5. Run development servers

## Environment Variables

### Backend (.env)
```
DATABASE_URL=your_supabase_database_url
JWT_SECRET=your_jwt_secret
SUPABASE_SERVICE_KEY=your_supabase_service_key
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
