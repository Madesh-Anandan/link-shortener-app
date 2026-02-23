# Vercel Deployment Troubleshooting Guide

## Quick Checklist - Do This First! ✅

### 1. Verify Environment Variables in Vercel

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

Make sure ALL 7 variables are added for **ALL environments** (Production, Preview, Development):

```bash
DATABASE_URL=postgresql://...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### 2. Set Root Directory in Vercel

**Important:** Your project is in a subdirectory!

In Vercel Project Settings:

- Go to: **Settings → General → Root Directory**
- Set to: `linkshortenerproject`
- Click **Save**

### 3. Redeploy After Changes

After adding environment variables or changing settings:

- Go to **Deployments** tab
- Find the latest deployment
- Click the **"..."** menu
- Click **"Redeploy"**
- Check **"Use existing Build Cache"** is OFF
- Click **"Redeploy"**

## Common Issues & Solutions

### Issue 1: "DATABASE_URL environment variable is not set"

**Solution:**

1. Add `DATABASE_URL` in Vercel environment variables
2. Make sure it's checked for: Production, Preview, Development
3. Redeploy

### Issue 2: "Failed to collect page data for /[shortCode]"

**Solution:**
This usually means database connection failed during build.

1. Check `DATABASE_URL` is set correctly
2. Verify your Neon database is active (not suspended)
3. Test the connection string locally:

```bash
# In your .env.local file, add DATABASE_URL
npm run dev
# Visit http://localhost:3000/dashboard
```

### Issue 3: "Module not found" or "Export doesn't exist"

**Solution:**

1. Clear build cache in Vercel
2. Redeploy without cache
3. Make sure all recent commits are pushed to GitHub

### Issue 4: Vercel finds wrong root directory

**Solution:**
Your project structure is:

```
link-shortener/
  linkshortenerproject/  ← This is the root!
    package.json
    next.config.ts
    app/
```

In Vercel:

1. Settings → General → Root Directory
2. Set to: `linkshortenerproject`
3. Save and redeploy

### Issue 5: Build succeeds but runtime errors

**Solution:**
Check runtime logs:

1. Vercel Dashboard → Your Project → Logs
2. Look for runtime errors
3. Common causes:
   - Missing environment variables
   - Database connection issues
   - Clerk configuration issues

## Step-by-Step: Fresh Deployment

If nothing works, try a fresh deployment:

### Step 1: Remove Project from Vercel

1. Go to Vercel Dashboard
2. Select your project
3. Settings → General → Delete Project

### Step 2: Reimport from GitHub

1. Click **"Add New..." → "Project"**
2. Find your GitHub repo: `link-shortener-app` or `project-link-shortener`
3. Click **Import**

### Step 3: Configure Before First Deploy

**IMPORTANT: Do this BEFORE clicking Deploy!**

1. **Set Root Directory:**
   - Root Directory: `linkshortenerproject`

2. **Add Environment Variables:**
   Click "Environment Variables" and add ALL 7:

   ```
   DATABASE_URL=your_neon_url
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   ```

3. **Deploy:**
   - Click **"Deploy"**
   - Wait 2-3 minutes

### Step 4: Verify Deployment

1. Check build logs for errors
2. Visit your deployed URL
3. Test sign in/up
4. Test creating a link

## Debugging Tips

### Check Build Logs

In Vercel:

1. Go to Deployments
2. Click on the failed deployment
3. Click "Building" to see detailed logs
4. Look for the actual error message

### Test Locally First

Before deploying, always test locally:

```bash
# Make sure build works
npm run build

# Test production build
npm start
```

### Check Environment Variables Are Applied

In Vercel deployment logs, you should see:

```
- Environments: .env.production
```

If you don't see this, environment variables aren't loaded.

### Verify Database Connection

Test your Neon database URL:

```bash
# Install psql or use Neon's SQL editor
# Run a simple query to verify connection
SELECT NOW();
```

## Still Not Working?

### Share These Details:

1. **Full error message** from Vercel build logs
2. **Screenshot** of your Vercel environment variables (hide sensitive values)
3. **Confirm** you set Root Directory to `linkshortenerproject`
4. **Verify** all 7 environment variables are added
5. **Check** your Neon database status (active/suspended)

### Common Error Messages & Solutions

#### "Command failed with exit code 1"

- Usually means build failed
- Check the logs above this message for the actual error

#### "Error: Cannot find module"

- Wrong root directory in Vercel
- Should be `linkshortenerproject`

#### "DATABASE_URL is not set"

- Environment variable not added in Vercel
- Or wrong environment selected (Production vs Preview)

#### "Clerk initialization failed"

- Missing Clerk environment variables
- Or domain not added in Clerk dashboard

## Project Structure Reference

Your correct structure should be:

```
GitHub Repo (link-shortener-app or project-link-shortener)
└── linkshortenerproject/          ← ROOT DIRECTORY FOR VERCEL
    ├── package.json
    ├── next.config.ts
    ├── tsconfig.json
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── dashboard/
    │   └── [shortCode]/
    ├── components/
    ├── db/
    └── public/
```

## Vercel Project Settings Summary

**Framework Preset:** Next.js  
**Root Directory:** `linkshortenerproject`  
**Build Command:** `npm run build` (default)  
**Output Directory:** `.next` (default)  
**Install Command:** `npm install` (default)  
**Node Version:** 20.x (automatic)

## After Successful Deployment

1. **Copy your Vercel URL** (e.g., `your-app.vercel.app`)
2. **Add it to Clerk Dashboard:**
   - Go to https://dashboard.clerk.com
   - Select your application
   - Go to "Domains"
   - Click "Add domain"
   - Paste your Vercel URL
   - Save

3. **Test everything:**
   - Home page loads
   - Sign up/Sign in works
   - Dashboard loads
   - Create a link
   - Test the short link redirect
   - Theme toggle works

4. **Optional: Custom Domain**
   - Vercel: Settings → Domains
   - Add your custom domain
   - Update DNS records
   - Update Clerk with custom domain

## Need More Help?

If you're still stuck, please provide:

1. ✅ Full error from Vercel logs
2. ✅ Screenshot of environment variables (hide values)
3. ✅ Confirm root directory setting
4. ✅ Your GitHub repo name
5. ✅ Neon database status

---

**Remember:** The build works locally, so the issue is likely:

- Environment variables not set in Vercel
- Wrong root directory
- Database connection from Vercel to Neon

All of these are configuration issues, not code issues!
