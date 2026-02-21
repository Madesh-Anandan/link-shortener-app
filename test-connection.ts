import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

// Disable SSL verification for development
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function testConnection() {
  try {
    console.log('🔌 Connecting to Neon database...');
    
    const sql = neon(process.env.DATABASE_URL!);
    
    // Test connection with a simple query
    const result = await sql`SELECT version(), current_database(), current_user`;
    
    console.log('✅ Successfully connected to Neon!');
    console.log('\n📊 Database Info:');
    console.log('  PostgreSQL Version:', result[0].version);
    console.log('  Database:', result[0].current_database);
    console.log('  User:', result[0].current_user);
    
    // List all tables in the database
    console.log('\n📋 Tables in database:');
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;
    
    if (tables.length === 0) {
      console.log('  No tables found. Run migrations first!');
    } else {
      tables.forEach(table => {
        console.log(`  - ${table.table_name}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Connection failed:', error);
    process.exit(1);
  }
}

testConnection();
