# Golf Charity Platform - Setup Guide

## Prerequisites

- Node.js 18+ installed
- Supabase account and project created
- Git (optional)

## 1. Database Setup (Supabase)

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to SQL Editor > New Query
3. Copy and paste the contents of `database/schema.sql`
4. Run the SQL script to create all tables
5. Go to Settings > API to get your credentials:
   - Project URL (DATABASE_URL)
   - Service Role Key (SUPABASE_SERVICE_KEY)
   - Anon Key (SUPABASE_ANON_KEY)

## 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` with your Supabase credentials:
   ```env
   DATABASE_URL=your_supabase_project_url
   SUPABASE_SERVICE_KEY=your_supabase_service_role_key
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

5. Create admin user:
   ```bash
   npm run seed
   ```
   This creates an admin user with:
   - Email: admin@golfcharity.com
   - Password: admin123

6. Start the backend server:
   ```bash
   npm run dev
   ```

## 3. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` with your credentials:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. Start the frontend development server:
   ```bash
   npm run dev
   ```

## 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Admin Panel**: http://localhost:5173/admin
  - Login with: admin@golfcharity.com / admin123

## 5. Testing the Application

### User Flow:
1. Sign up as a new user
2. Subscribe to a plan (Monthly/Yearly)
3. Add golf scores (1-45 range)
4. Select a charity and contribution percentage
5. View dashboard and results

### Admin Flow:
1. Login as admin
2. View all users
3. Run draws
4. Check results and winners

## 6. Key Features Demonstrated

### Authentication
- JWT-based authentication
- Protected routes
- Role-based access (admin/user)

### Subscription System
- Monthly ($9.99) and Yearly ($99.99) plans
- Dashboard access control
- Subscription status tracking

### Score Management
- Add scores (1-45 range)
- Maximum 5 scores per user
- Auto-removal of oldest score
- Score history display

### Draw System
- Admin-triggered draws
- Random number generation (5 numbers, 1-45)
- Prize matching (3-5 matches)
- Result storage and display

### Charity System
- Multiple charity options
- Contribution percentage selection
- Charity tracking per user

### UI/UX
- Modern, clean interface (not golf-themed)
- Mobile responsive design
- Tailwind CSS styling
- Smooth transitions and animations

## 7. Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Render/Railway)
1. Connect your GitHub repository
2. Set environment variables
3. Configure build and start commands
4. Deploy automatically

## 8. Environment Variables Summary

### Backend (.env)
```env
DATABASE_URL=supabase_project_url
SUPABASE_SERVICE_KEY=supabase_service_role_key
JWT_SECRET=random_jwt_secret
PORT=5000
NODE_ENV=production
FRONTEND_URL=your_frontend_url
```

### Frontend (.env)
```env
VITE_API_URL=your_backend_url
VITE_SUPABASE_URL=supabase_project_url
VITE_SUPABASE_ANON_KEY=supabase_anon_key
```

## 9. Troubleshooting

### Common Issues:
1. **CORS Errors**: Ensure FRONTEND_URL is correctly set in backend
2. **Database Connection**: Verify Supabase credentials are correct
3. **Authentication Issues**: Check JWT_SECRET is set
4. **Build Errors**: Ensure all dependencies are installed

### Getting Help:
- Check browser console for JavaScript errors
- Check network tab for API request failures
- Verify environment variables are correctly set
- Ensure Supabase tables are created properly

## 10. Project Structure

```
golf-charity-platform/
├── frontend/                 # React Vite application
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── context/         # React context
│   │   ├── pages/           # Page components
│   │   └── main.jsx         # App entry point
│   ├── package.json
│   └── vite.config.js
├── backend/                  # Node.js Express API
│   ├── routes/              # API routes
│   ├── middleware/          # Express middleware
│   ├── config/              # Database configuration
│   ├── scripts/             # Utility scripts
│   └── server.js           # Server entry point
├── database/                # Database schema
│   └── schema.sql          # Supabase SQL script
├── README.md               # Project overview
└── SETUP.md               # This setup guide
```

## 11. Next Steps

This MVP demonstrates all core features. For production:

1. Add real payment integration (Stripe)
2. Implement email notifications
3. Add more sophisticated draw algorithms
4. Enhance security measures
5. Add comprehensive testing
6. Implement caching strategies
7. Add analytics and monitoring

Enjoy your Golf Charity Platform! 🏆
