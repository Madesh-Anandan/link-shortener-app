import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

// Disable SSL verification for development
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const userId = 'user_39vBneWYZJMTCwRbhD2nAbHRlDe';

const sampleLinks = [
  { shortCode: 'gh2024', url: 'https://github.com/trending' },
  { shortCode: 'yt-vid', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { shortCode: 'docs-react', url: 'https://react.dev/learn' },
  { shortCode: 'neon-db', url: 'https://neon.tech/docs/introduction' },
  { shortCode: 'clerk-auth', url: 'https://clerk.com/docs/quickstarts/nextjs' },
  { shortCode: 'drizzle', url: 'https://orm.drizzle.team/docs/overview' },
  { shortCode: 'nextjs15', url: 'https://nextjs.org/blog/next-15' },
  { shortCode: 'tailwind', url: 'https://tailwindcss.com/docs' },
  { shortCode: 'vercel', url: 'https://vercel.com/docs' },
  { shortCode: 'typescript', url: 'https://www.typescriptlang.org/docs/' }
];

async function seedSampleLinks() {
  try {
    console.log('🌱 Seeding sample links...\n');
    
    const sql = neon(process.env.DATABASE_URL!);
    
    let inserted = 0;
    let skipped = 0;
    
    for (const link of sampleLinks) {
      try {
        await sql`
          INSERT INTO links (short_code, url, user_id, created_at, updated_at)
          VALUES (
            ${link.shortCode},
            ${link.url},
            ${userId},
            NOW(),
            NOW()
          )
        `;
        console.log(`✅ Added: ${link.shortCode} -> ${link.url}`);
        inserted++;
      } catch (error: any) {
        if (error.message?.includes('duplicate') || error.message?.includes('unique')) {
          console.log(`⏭️  Skipped (already exists): ${link.shortCode}`);
          skipped++;
        } else {
          throw error;
        }
      }
    }
    
    console.log('\n📊 Summary:');
    console.log(`  ✅ Inserted: ${inserted} links`);
    console.log(`  ⏭️  Skipped: ${skipped} links`);
    
    console.log('\n📋 All links for user:');
    const allLinks = await sql`
      SELECT id, short_code, url, created_at 
      FROM links 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;
    
    allLinks.forEach((link, index) => {
      console.log(`  ${index + 1}. [${link.short_code}] -> ${link.url}`);
    });
    
    console.log(`\n🎉 Total: ${allLinks.length} links for user ${userId}`);
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedSampleLinks();
