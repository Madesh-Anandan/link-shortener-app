export function getBaseUrl(): string {
  // Client-side: use window.location.origin (always returns the actual public URL)
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  // Server-side on Vercel: use VERCEL_URL (this is the public production URL)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Server-side: Check for custom app URL (if manually set)
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  
  // Default to localhost for development
  return "http://localhost:3000";
}
