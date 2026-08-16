# PARN & MIKE Wedding Platform - Setup Instructions

## ✅ PHASE 1 CODE IS READY!

You now have a **complete Next.js project** with:
- ✅ Authentication system (login/logout)
- ✅ Admin dashboard
- ✅ Placeholder pages for all features
- ✅ Supabase integration
- ✅ TypeScript setup
- ✅ Tailwind CSS
- ✅ Complete project structure

---

## 🚀 How to Run This Project (5 Minutes)

### Step 1: Get the Project

All files are in this folder. You can:
- Download ZIP and extract
- Clone if in a git repo
- Copy folder to your computer

### Step 2: Open Terminal/Command Prompt

```bash
# Navigate to project folder
cd parn-mike-wedding-project
```

### Step 3: Install Dependencies

```bash
npm install
```

This will install:
- next
- react
- typescript
- @supabase/supabase-js
- tailwindcss
- lucide-react
- And more...

**Wait time**: 2-3 minutes (depends on internet)

### Step 4: Add Your Credentials

Open `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=https://grdhijnwjavpsabqeavl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=???? PUT YOUR KEY HERE ????
SUPABASE_SERVICE_ROLE_KEY=???? PUT YOUR KEY HERE ????
```

Get these from:
1. Go to https://supabase.com/dashboard
2. Click your project
3. Settings → API
4. Copy the two keys into .env.local

### Step 5: Run the Project

```bash
npm run dev
```

You should see:
```
▲ Next.js 14.0.0
- Local:        http://localhost:3000
```

### Step 6: Open in Browser

Visit: http://localhost:3000

You should see the home page! ✅

---

## 📍 Test the Application

### Test 1: Home Page
- URL: http://localhost:3000
- Should see: PARN & MIKE hero section with buttons
- ✅ PASS if page loads

### Test 2: Admin Login Page
- URL: http://localhost:3000/admin/login
- Should see: Login form with email/password
- ✅ PASS if form loads

### Test 3: Try to Login
1. Go to http://localhost:3000/admin/login
2. Enter a test email: test@example.com
3. Enter a password: any-password
4. Click "Sign In"

**Expected result:**
- If no user exists: Error "Invalid login credentials"
- This is normal - you need to create a user first

---

## 👤 Create a Test Admin User

To test the login:

### Method 1: Via Supabase Dashboard (Easiest)

1. Go to https://supabase.com/dashboard
2. Click your project: phitchaphornparn-mppm's Project
3. Left sidebar → Authentication
4. Click "Users" tab
5. Click "Create new user" button
6. Fill in:
   - Email: `admin@test.com`
   - Password: `TestPassword123`
   - Auto-confirm: OFF (or ON, doesn't matter)
7. Click "Create user"

Now test login with these credentials:
- Email: `admin@test.com`
- Password: `TestPassword123`

### Method 2: Via Terminal (Later)

```bash
# This requires service role key, skip for now
```

---

## 🎯 After Successful Login

If you login successfully:

1. You should see **Admin Dashboard** ✅
2. With stats cards (Total Guests, Confirmed, etc.)
3. With buttons: Add Guest, Manage Seating, Check-in, etc.
4. With a Getting Started guide

---

## 📁 Project Files Overview

### Key Files:

```
parn-mike-wedding-project/
├── .env.local                   # Your credentials (IMPORTANT!)
├── package.json                 # Dependencies list
├── tsconfig.json                # TypeScript config
├── tailwind.config.ts           # Tailwind config
├── src/
│   ├── app/
│   │   ├── page.tsx            # Home page
│   │   ├── layout.tsx          # Root layout
│   │   └── admin/
│   │       ├── login/page.tsx  # Login page
│   │       └── page.tsx        # Dashboard
│   ├── lib/
│   │   ├── supabase.ts         # Supabase setup
│   │   ├── types.ts            # TypeScript types
│   │   └── auth.ts             # Auth functions
│   └── hooks/
│       └── useAuth.ts          # Auth hook
└── README.md                    # This file
```

---

## 🔑 Important: Environment Variables

**These must be filled in .env.local:**

```
NEXT_PUBLIC_SUPABASE_URL=https://grdhijnwjavpsabqeavl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
SUPABASE_SERVICE_ROLE_KEY=your_key_here
```

**Never commit .env.local to git!**

It's already in .gitignore, so you're safe.

---

## 🚨 Common Issues

### Issue 1: "npm not found"
```
Solution: Install Node.js from nodejs.org
```

### Issue 2: "Cannot find module '@supabase/supabase-js'"
```
Solution: Run: npm install
```

### Issue 3: ".env.local not working"
```
Solution: 
1. Restart dev server (Ctrl+C, then npm run dev)
2. Make sure .env.local exists
3. Check variable names are exact
```

### Issue 4: "Login doesn't work"
```
Solution:
1. Check credentials in .env.local
2. Create user in Supabase Auth first
3. Check email/password in login form
4. Look at browser console for errors (F12)
```

### Issue 5: "Can't access http://localhost:3000"
```
Solution:
1. Check dev server is running (should see Next.js message)
2. Check port 3000 is free (no other app using it)
3. Try http://127.0.0.1:3000 instead
```

---

## 🔄 Development Commands

```bash
# Start dev server (what you'll use most)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check for linting issues
npm run lint
```

---

## 📝 Next Steps

### What Works Now (Phase 1):
- ✅ Home page
- ✅ Admin login
- ✅ Admin dashboard with stats
- ✅ Navigation menu
- ✅ Logout button
- ✅ Responsive design

### What's Coming (Phase 2):
- Guest management
- Seating system
- Check-in functionality
- Photo management
- RSVP form
- Guest portal

---

## 💾 Save Your Progress

Once you have it working, save to git:

```bash
git init
git add .
git commit -m "Phase 1 - Initial setup with auth"
git remote add origin <your-github-repo>
git push -u origin main
```

---

## 🎓 Learning Resources

### Tutorials to understand the code:
1. **Next.js**: https://nextjs.org/learn
2. **React**: https://react.dev
3. **TypeScript**: https://www.typescriptlang.org/docs
4. **Tailwind CSS**: https://tailwindcss.com/docs
5. **Supabase**: https://supabase.com/docs

---

## 🆘 If You Get Stuck

1. **Check browser console** (F12 or right-click → Inspect)
2. **Check terminal output** where npm run dev is running
3. **Check Supabase logs**: Dashboard → Logs
4. **Re-read this file** - answer might be here

---

## ✨ You're All Set!

Your project is ready to use. Simply:

```bash
npm install
npm run dev
```

Then visit: http://localhost:3000

---

**PARN & MIKE**
**2 HEARTS · 1 JOURNEY**

Happy coding! 🚀💕
