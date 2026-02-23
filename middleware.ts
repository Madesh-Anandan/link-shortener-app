import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Allow public routes to pass through without auth check
  if (isPublicRoute(req)) {
    const { userId } = await auth();
    
    // Redirect authenticated users from home to dashboard
    if (userId && req.nextUrl.pathname === "/") {
      const dashboardUrl = new URL("/dashboard", req.url);
      return NextResponse.redirect(dashboardUrl);
    }
    
    return;
  }

  const { userId } = await auth();

  // Redirect unauthenticated users from protected routes to home
  if (!userId && isProtectedRoute(req)) {
    const homeUrl = new URL("/", req.url);
    return NextResponse.redirect(homeUrl);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
