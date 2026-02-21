import { drizzle } from 'drizzle-orm/neon-http';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';

let dbInstance: NeonHttpDatabase | null = null;

export const db = new Proxy({} as NeonHttpDatabase, {
  get(_, prop) {
    if (!dbInstance) {
      if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL environment variable is not set');
      }
      dbInstance = drizzle(process.env.DATABASE_URL);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (dbInstance as any)[prop];
  }
});
