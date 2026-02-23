# URGENT: Fix Vercel Deployment - Missing Environment Variables

## The Problem

You're seeing this error:

```
Missing publishableKey. You can get your key at https://dashboard.clerk.com
```

**Why?** Vercel doesn't have your environment variables. Your `.env.local` file only works on YOUR computer, not on Vercel's servers.

## THE SOLUTION (Follow This Exactly)

### Part 1: Get Your COMPLETE Clerk Keys

1. **Go to Clerk Dashboard**: https://dashboard.clerk.com
2. **Select your application** (or create one if you don't have it)
3. **Click "API Keys"** in the left sidebar
4. **Copy BOTH keys:**

   **Publishable Key** (visible by default):
   - Should look like: `pk_test_xxxxxx-xxxxx-xx.clerk.accounts.dev$xxxxxxxxxxxxxxxxxxxxxxxxxx`
   - Or: `pk_live_xxxxxx-xxxxx-xx.clerk.accounts.dev$xxxxxxxxxxxxxxxxxxxxxxxxxx`
   - **Make sure you copy the ENTIRE key** (it's long!)

   **Secret Key** (click "Show" to reveal):
   - Should look like: `sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - Or: `sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Part 2: Add Variables to Vercel (MANDATORY!)

**Go to Vercel Dashboard**: https://vercel.com

1. **Find your project** and click on it
2. **Click "Settings"** (top menu)
3. **Click "Environment Variables"** (left sidebar)
4. **Add each variable ONE BY ONE:**

#### Variable 1: Clerk Publishable Key

```
Key: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
Value: [Paste your FULL key from Clerk - starts with pk_test_ or pk_live_]
Environments: ✅ Check ALL THREE boxes (Production, Preview, Development)
Click "Save"
```

#### Variable 2: Clerk Secret Key

```
Key: CLERK_SECRET_KEY
Value: [Paste your FULL secret key from Clerk - starts with sk_test_ or sk_live_]
Environments: ✅ Check ALL THREE boxes
Click "Save"
```

#### Variable 3: Database URL

```
Key: DATABASE_URL
Value: postgresql://neondb_owner:npg_eEsD0PYxaho3@ep-bitter-feather-aiwn8bjs-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require
Environments: ✅ Check ALL THREE boxes
Click "Save"
```

#### Variable 4: Sign In URL

```
Key: NEXT_PUBLIC_CLERK_SIGN_IN_URL
Value: /sign-in
Environments: ✅ Check ALL THREE boxes
Click "Save"
```

#### Variable 5: Sign Up URL

```
Key: NEXT_PUBLIC_CLERK_SIGN_UP_URL
Value: /sign-up
Environments: ✅ Check ALL THREE boxes
Click "Save"
```

#### Variable 6: After Sign In URL

```
Key: NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
Value: /dashboard
Environments: ✅ Check ALL THREE boxes
Click "Save"
```

#### Variable 7: After Sign Up URL

```
Key: NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
Value: /dashboard
Environments: ✅ Check ALL THREE boxes
Click "Save"
```

### Part 3: Verify Variables Are Added

After adding all 7 variables, you should see them listed:

```
✅ NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
✅ CLERK_SECRET_KEY
✅ DATABASE_URL
✅ NEXT_PUBLIC_CLERK_SIGN_IN_URL
✅ NEXT_PUBLIC_CLERK_SIGN_UP_URL
✅ NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
✅ NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
```

Each should show: `Production, Preview, Development`

### Part 4: Redeploy

1. **Go to "Deployments" tab** (top menu in your Vercel project)
2. **Find the latest deployment** (top of the list)
3. **Click the "..." menu** (three dots on the right)
4. **Click "Redeploy"**
5. **IMPORTANT:** Uncheck "Use existing Build Cache"
6. **Click "Redeploy"** button
7. **Wait 2-3 minutes** for the new deployment

### Part 5: Watch the Build

1. Click on the new deployment
2. Watch the "Building" section
3. Look for:

   ```
   ✓ Compiled successfully
   ✓ Running TypeScript
   ✓ Collecting page data
   ✓ Generating static pages
   ```

4. If you see the Clerk error again:
   - Your publishable key is incomplete or wrong
   - Go back to Clerk dashboard and copy the FULL key
   - Update it in Vercel
   - Redeploy again

## Common Mistakes

### ❌ Mistake 1: Only updated .env.local file

**Fix:** You MUST add variables to Vercel dashboard. Local files don't get deployed.

### ❌ Mistake 2: Copied incomplete Clerk key

**Fix:** Make sure you copy the ENTIRE key. It's very long!

### ❌ Mistake 3: Didn't check all environment boxes

**Fix:** Check Production, Preview, AND Development for each variable.

### ❌ Mistake 4: Used existing build cache

**Fix:** Always uncheck "Use existing Build Cache" when redeploying after changing environment variables.

### ❌ Mistake 5: Forgot to redeploy

**Fix:** Adding variables doesn't automatically redeploy. You must manually redeploy.

## Troubleshooting

### Still seeing "Missing publishableKey" error?

**Check 1:** Verify key is complete

- Go to Vercel → Settings → Environment Variables
- Click "Edit" on `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- Make sure it's the FULL key (very long string)

**Check 2:** Verify it's set for all environments

- Make sure Production, Preview, Development are all checked

**Check 3:** Clear cache and redeploy

- Deployments → Latest → "..." → Redeploy
- Uncheck cache → Redeploy

### How to verify your Clerk key is correct?

1. Go to Clerk Dashboard
2. Copy the publishable key
3. It should be 60+ characters long
4. Should contain: `clerk.accounts.dev$` or `clerk.live$`
5. Example format: `pk_test_abc123-def456-78.clerk.accounts.dev$longstringofcharacters`

### Database connection error?

1. Check your Neon database is active (not suspended)
2. Verify DATABASE_URL is complete and correct
3. Make sure it includes `?sslmode=require` at the end

## Quick Test - Use Vercel CLI (Optional)

If you have Vercel CLI installed:

```powershell
# Login to Vercel
vercel login

# Link your project
vercel link

# Add environment variables via CLI
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
# Paste your key when prompted

vercel env add CLERK_SECRET_KEY
# Paste your secret when prompted

vercel env add DATABASE_URL
# Paste your database URL when prompted

# Continue for all 7 variables...

# Deploy
vercel --prod
```

## After Successful Deployment

Once deployment succeeds:

1. **Copy your Vercel URL** (e.g., `your-app.vercel.app`)
2. **Add to Clerk:**
   - Clerk Dashboard → Domains
   - Click "Add domain"
   - Paste your Vercel URL
   - Save

3. **Test your app:**
   - Visit your Vercel URL
   - Try signing up
   - Try signing in
   - Test creating a link
   - Test link redirect

## Still Stuck?

If you're still having issues:

1. **Screenshot your Vercel environment variables** (blur the values)
2. **Copy the EXACT error message** from Vercel build logs
3. **Confirm:**
   - ✅ All 7 variables are added in Vercel
   - ✅ All are checked for Production, Preview, Development
   - ✅ You redeployed WITHOUT cache
   - ✅ Your Clerk key is COMPLETE (not truncated)

## Summary Checklist

Before asking for more help, verify:

- [ ] Added NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY to Vercel
- [ ] Added CLERK_SECRET_KEY to Vercel
- [ ] Added DATABASE_URL to Vercel
- [ ] Added all 4 CLERK_URL variables to Vercel
- [ ] Each variable is checked for all 3 environments
- [ ] Redeployed without cache
- [ ] Clerk key is COMPLETE (not cut off)
- [ ] Waited for deployment to finish

If all checkboxes are checked and it still fails, there might be an issue with your Clerk account or keys.
