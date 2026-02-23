export function getBaseUrl(): string {
  // Client-side: use window.location.origin
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  // Server-side: Check for custom app URL (production)
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  
  // Server-side: Check for Vercel URL (automatic deployment)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Default to localhost for development
  return "http://localhost:3000";
}
