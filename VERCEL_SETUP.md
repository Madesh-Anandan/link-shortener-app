# Vercel Deployment Checklist

## ✅ What I Fixed

1. **Database Error Handling** - Added proper error message when DATABASE_URL is missing
2. **Dynamic Rendering** - Added `export const dynamic = 'force-dynamic'` to pages that use database
3. **Pushed Changes** - All fixes are now on GitHub

## 🚀 Next Steps in Vercel

### 1. Redeploy Your Project

Go to your Vercel dashboard and trigger a new deployment, or Vercel will automatically deploy from the latest push.

### 2. Add REQUIRED Environment Variables

In your Vercel project settings, go to **Settings** → **Environment Variables** and add:

#### Database

```
DATABASE_URL
```

Value: Your Neon database connection string (starts with `postgresql://`)

#### Clerk Authentication

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
```

Value: Your Clerk publishable key (starts with `pk_test_` or `pk_live_`)

```
CLERK_SECRET_KEY
```

Value: Your Clerk secret key (starts with `sk_test_` or `sk_live_`)

#### Clerk URLs (Copy these exactly)

```
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### 3. Where to Find Your Keys

#### Neon Database URL

1. Go to https://console.neon.tech
2. Select your project
3. Click "Connection Details"
4. Copy the connection string (it includes your password)

#### Clerk Keys

1. Go to https://dashboard.clerk.com
2. Select your application
3. Go to "API Keys"
4. Copy both keys:
   - Publishable Key (NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)
   - Secret Key (CLERK_SECRET_KEY)

### 4. Important: Set Environment Variables for ALL Environments

Make sure to add environment variables for:

- ✅ Production
- ✅ Preview
- ✅ Development

### 5. Redeploy After Adding Variables

After adding all environment variables:

1. Go to "Deployments" tab
2. Click "..." menu on the latest deployment
3. Click "Redeploy"

Or just push a small change to trigger a new deployment.

### 6. Configure Clerk Domain

Once deployed:

1. Copy your Vercel URL (e.g., `your-app.vercel.app`)
2. Go to Clerk Dashboard → **Domains**
3. Add your Vercel domain
4. Click "Add domain"

## 🐛 Troubleshooting

### Build Still Failing?

**Check Environment Variables:**

```bash
# In Vercel dashboard, verify all 7 variables are set:
DATABASE_URL ✓
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ✓
CLERK_SECRET_KEY ✓
NEXT_PUBLIC_CLERK_SIGN_IN_URL ✓
NEXT_PUBLIC_CLERK_SIGN_UP_URL ✓
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL ✓
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL ✓
```

### Database Connection Issues?

1. Verify your Neon database is active
2. Check the DATABASE_URL format:
   ```
   postgresql://[user]:[password]@[host]/[database]?sslmode=require
   ```
3. Make sure your Neon project isn't suspended (free tier)

### Clerk Authentication Not Working?

1. Make sure you added your Vercel domain in Clerk
2. Check you're using the correct keys (development vs production)
3. Clear browser cookies and try again

## ✨ After Successful Deployment

1. **Test the Application:**
   - Visit your Vercel URL
   - Try signing up/signing in
   - Create a test link
   - Test the short link redirect
   - Toggle dark/light theme

2. **Update README** with your deployed URL

3. **Optional: Add Custom Domain**
   - In Vercel: Settings → Domains
   - Add your domain (e.g., `links.yourdomain.com`)
   - Update DNS records as shown
   - Update Clerk with new domain

## 📊 Monitoring

Keep an eye on:

- Vercel Dashboard → Functions (for errors)
- Vercel Dashboard → Analytics (for traffic)
- Neon Dashboard → Monitoring (for database usage)

## 💡 Tips

- Environment variable changes require a redeploy
- Use Vercel's preview deployments to test changes
- Check the build logs if deployment fails
- Keep your Neon database active (free tier sleeps after inactivity)

## Need Help?

If deployment still fails:

1. Check the build logs in Vercel
2. Look for the specific error message
3. Verify all environment variables are set correctly
4. Make sure your database is accessible
