# PARN & MIKE - Wedding Guest Experience Platform

A modern, full-stack wedding management system built with Next.js, React, TypeScript, and Supabase.

**2 HEARTS · 1 JOURNEY**

---

## 🚀 Features

- **Admin Dashboard** - Manage guests, seating, check-in
- **Guest Portal** - RSVP, find seats, share photos
- **Authentication** - Secure admin login with Supabase Auth
- **Real-time Database** - PostgreSQL with Row Level Security
- **Photo Management** - Upload and manage wedding photos
- **Check-in System** - Track guest arrivals
- **Responsive Design** - Works on mobile and desktop

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth (JWT)
- **Storage**: Supabase Storage
- **Icons**: Lucide React
- **QR Code**: qrcode.react

---

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn
- Supabase account with project created
- Database schema and RLS policies applied

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Update `.env.local` with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://grdhijnwjavpsabqeavl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

Get these from:
- Supabase Dashboard → Settings → API

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📍 URLs

- **Home**: http://localhost:3000/
- **Admin Login**: http://localhost:3000/admin/login
- **Admin Dashboard**: http://localhost:3000/admin

---

## 🔐 Admin Login

To test the admin dashboard:

1. Create a user in Supabase Auth:
   - Go to Supabase Dashboard
   - Authentication → Users
   - Click "Add User"
   - Email: your@email.com
   - Password: your-password

2. Use these credentials to login at `/admin/login`

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin pages
│   │   ├── layout.tsx     # Admin sidebar & header
│   │   ├── page.tsx       # Dashboard
│   │   ├── guests/        # Guest management
│   │   ├── seating/       # Seating management
│   │   ├── checkin/       # Check-in system
│   │   ├── photos/        # Photo management
│   │   ├── information/   # Event info
│   │   └── schedule/      # Timeline
│   ├── api/               # API routes
│   │   └── auth/          # Authentication endpoints
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── lib/
│   ├── supabase.ts        # Supabase client
│   ├── types.ts           # TypeScript types
│   └── auth.ts            # Auth utilities
├── hooks/
│   └── useAuth.ts         # Auth hook
└── components/            # (Coming in Phase 2)
```

---

## 🔌 API Routes

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout

### Coming Soon
- Guest management endpoints
- Seating management endpoints
- Check-in endpoints
- Photo management endpoints

---

## 🎨 Customization

### Colors
Edit `tailwind.config.ts`:
```ts
colors: {
  primary: '#667eea',
  secondary: '#764ba2',
}
```

### App Name
Edit `.env.local`:
```
NEXT_PUBLIC_APP_NAME=PARN & MIKE
NEXT_PUBLIC_APP_TAGLINE=2 HEARTS · 1 JOURNEY
```

---

## 📦 Build for Production

```bash
npm run build
npm start
```

---

## 🚀 Deployment

### Option 1: Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Follow the prompts to deploy.

### Option 2: Other Providers

1. Build: `npm run build`
2. Set environment variables on hosting platform
3. Deploy the `.next` folder

---

## 🆘 Troubleshooting

### Login not working?
- Check `.env.local` has correct credentials
- Verify user exists in Supabase Auth
- Check RLS policies are applied

### Database queries not working?
- Verify RLS policies applied
- Check user has correct permissions
- Review Supabase logs

### Styling issues?
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Restart dev server

---

## 📚 Documentation

See the Phase 1 documentation files:
- `00-PHASE1-SUMMARY.md` - System overview
- `01-ARCHITECTURE-PLANNING.md` - Technical architecture
- `02-DATABASE-SCHEMA-FIXED.sql` - Database schema
- `03-RLS-POLICIES-FIXED.sql` - Security policies
- `05-SUPABASE-SETUP-GUIDE.md` - Setup guide

---

## 🔄 Phase Roadmap

- **Phase 1** ✅ - Setup & Authentication
- **Phase 2** 🚀 - Admin Dashboard & Guest Management
- **Phase 3** - Guest Portal
- **Phase 4** - Check-in System
- **Phase 5** - Photo Management
- **Phase 6** - Production Launch

---

## 📝 Git Setup

```bash
git init
git add .
git commit -m "Initial commit - Phase 1"
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

---

## 📞 Support

For questions or issues:
1. Check the documentation files
2. Review Supabase logs
3. Check browser console for errors

---

## 📄 License

This project is created for PARN & MIKE's wedding.

---

**Built with ❤️ for PARN & MIKE**

**2 HEARTS · 1 JOURNEY**
