import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Only protect dashboard routes - everything else is public
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;

  // Check if it's a short code route (single path segment, not a known system route)
  const isShortCodeRoute = 
    !pathname.startsWith('/dashboard') &&
    !pathname.startsWith('/sign-in') &&
    !pathname.startsWith('/sign-up') &&
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/api') &&
    pathname !== '/' &&
    pathname.length > 1;

  // Allow ALL short code redirects WITHOUT authentication - PUBLIC ACCESS
  if (isShortCodeRoute) {
    return NextResponse.next();
  }

  const { userId } = await auth();

  // Redirect authenticated users from home to dashboard
  if (userId && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Protect dashboard - redirect unauthenticated users to sign-in
  if (isProtectedRoute(req) && !userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  
  // All other routes are public
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Match all routes except static files and Next.js internals
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
