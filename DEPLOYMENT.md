# Deployment Guide for Link Shortener

## Prerequisites

Before deploying, make sure you have:

1. A GitHub account
2. A Vercel account (sign up at https://vercel.com)
3. Your Neon Database connection string
4. Your Clerk API keys

## Step 1: Push to GitHub

1. **Initialize Git** (if not already done):

```bash
git init
git add .
git commit -m "Initial commit - Link Shortener"
```

2. **Create a new repository on GitHub**:
   - Go to https://github.com/new
   - Name it "link-shortener" or similar
   - Don't initialize with README (you already have one)
   - Click "Create repository"

3. **Push your code**:

```bash
git remote add origin https://github.com/YOUR_USERNAME/link-shortener.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**:
   - Visit https://vercel.com
   - Click "Sign Up" or "Log In"
   - Choose "Continue with GitHub"

2. **Import Your Repository**:
   - Click "Add New..." → "Project"
   - Select your GitHub repository "link-shortener"
   - Click "Import"

3. **Configure Project**:
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./linkshortenerproject`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

4. **Add Environment Variables**:
   Click "Environment Variables" and add:

   ```
   DATABASE_URL=your_neon_database_url
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   ```

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes for deployment
   - You'll get a URL like: `your-project.vercel.app`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:

```bash
npm i -g vercel
```

2. **Login**:

```bash
vercel login
```

3. **Deploy**:

```bash
cd linkshortenerproject
vercel
```

4. Follow the prompts and add environment variables when asked.

## Step 3: Configure Clerk for Production

1. **Go to Clerk Dashboard**:
   - Visit https://dashboard.clerk.com
   - Select your application

2. **Update URLs**:
   - Go to "Domains" section
   - Add your Vercel domain: `your-project.vercel.app`

3. **Get Production Keys**:
   - Go to "API Keys"
   - Switch from "Development" to "Production"
   - Copy your production keys
   - Update them in Vercel's environment variables

## Step 4: Configure Database

Your Neon database should work automatically, but verify:

1. Go to Neon dashboard
2. Check that your database is accessible
3. Verify the connection string is correct in Vercel

## Step 5: Run Database Migrations (if needed)

If you need to run migrations on production:

```bash
# Set your production DATABASE_URL
export DATABASE_URL="your_production_database_url"

# Run migrations
npm run db:push
```

Or add a deployment script in `package.json`:

```json
"scripts": {
  "build": "drizzle-kit push && next build"
}
```

## Step 6: Custom Domain (Optional)

1. **In Vercel Dashboard**:
   - Go to your project
   - Click "Settings" → "Domains"
   - Click "Add"
   - Enter your domain (e.g., `links.yourdomain.com`)

2. **Configure DNS**:
   - Add a CNAME record pointing to `cname.vercel-dns.com`
   - Wait for DNS propagation (5-30 minutes)

3. **Update Clerk**:
   - Add your custom domain in Clerk dashboard
   - Update environment variables if needed

## Troubleshooting

### Build Fails

- Check build logs in Vercel
- Ensure all environment variables are set
- Test build locally: `npm run build`

### Database Connection Issues

- Verify DATABASE_URL is correct
- Check Neon database is active
- Ensure Neon allows connections from Vercel

### Clerk Authentication Issues

- Verify production keys are used
- Check domain is added in Clerk dashboard
- Clear browser cache and cookies

### Environment Variables Not Working

- Ensure variables starting with `NEXT_PUBLIC_` are set
- Redeploy after adding variables
- Check variable names match exactly

## Monitoring & Maintenance

1. **Check Logs**:
   - Vercel Dashboard → Your Project → Logs
   - Monitor errors and performance

2. **Update Dependencies**:

```bash
npm update
git commit -am "Update dependencies"
git push
```

3. **Rollback if Needed**:
   - Vercel Dashboard → Deployments
   - Click "..." on previous deployment
   - Click "Promote to Production"

## Important Notes

- Vercel automatically deploys on every `git push` to main
- Preview deployments are created for pull requests
- Environment variables are encrypted
- Vercel includes automatic HTTPS
- Free tier includes 100GB bandwidth/month

## Production Checklist

Before going live, verify:

- [ ] All environment variables are set
- [ ] Database migrations are run
- [ ] Clerk production keys are configured
- [ ] Clerk domain is whitelisted
- [ ] Test sign up/sign in flow
- [ ] Test link creation and redirects
- [ ] Test both light and dark themes
- [ ] Mobile responsive design works
- [ ] Custom domain configured (if applicable)
- [ ] Analytics setup (optional)
- [ ] Error tracking setup (optional)

## Additional Services (Optional)

### Analytics

- Add Vercel Analytics: `npm i @vercel/analytics`
- Or integrate Google Analytics

### Error Tracking

- Sentry: https://sentry.io
- LogRocket: https://logrocket.com

### Monitoring

- Vercel includes basic monitoring
- For advanced: Datadog, New Relic

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Clerk Docs: https://clerk.com/docs
- Neon Docs: https://neon.tech/docs
