# Clerk Authentication Instructions

## Overview

All authentication in this application is handled exclusively by Clerk. No other authentication methods should be implemented or used.

## Authentication Rules

### Protected Routes

- The `/dashboard` page is a protected route
- Users must be logged in to access `/dashboard`
- Redirect unauthenticated users to sign-in when attempting to access protected routes

### Home Page Behavior

- If a user is already logged in and tries to access the home page (`/`), they should be automatically redirected to `/dashboard`

### Sign In/Sign Up

- All sign-in and sign-up flows must use Clerk's modal component
- Always launch Clerk authentication as a modal (not as a separate page)
- Use Clerk's `<SignIn />` and `<SignUp />` components with modal mode

## Implementation Guidelines

### Middleware

- Use Next.js middleware with Clerk's `clerkMiddleware` to protect routes
- Configure public routes explicitly (home page when not logged in)
- Ensure `/dashboard` and related routes require authentication

### Components

- Import Clerk components: `<SignInButton />`, `<SignUpButton />`, `<UserButton />`
- Use modal mode for authentication flows
- Display user button in the navigation when authenticated

### Best Practices

- Never implement custom authentication logic
- Always rely on Clerk's session management
- Use `useAuth()` and `useUser()` hooks for user state
- Leverage Clerk's redirect mechanisms for route protection

## Reference

See [CLERK_SETUP.md](../CLERK_SETUP.md) for configuration details.
