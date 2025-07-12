// migrate.js - Simple script to apply the missing columns to the testResult table
require('dotenv').config();
const { Pool } = require('pg');

// Create a connection pool using the DATABASE_URL from .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function migrate() {
  const client = await pool.connect();
  
  try {
    // Start a transaction
    await client.query('BEGIN');
    
    // Check if the columns already exist to avoid errors
    const checkResult = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'testResult' AND column_name IN ('startedAt', 'status')
    `);
    
    const existingColumns = checkResult.rows.map(row => row.column_name);
    
    // Add startedAt column if it doesn't exist
    if (!existingColumns.includes('startedAt')) {
      console.log('Adding startedAt column...');
      await client.query('ALTER TABLE "testResult" ADD COLUMN "startedAt" timestamp');
    } else {
      console.log('startedAt column already exists');
    }
    
    // Add status column if it doesn't exist
    if (!existingColumns.includes('status')) {
      console.log('Adding status column...');
      await client.query('ALTER TABLE "testResult" ADD COLUMN "status" text DEFAULT \'completed\' NOT NULL');
    } else {
      console.log('status column already exists');
    }
    
    // Commit the transaction
    await client.query('COMMIT');
    console.log('Migration completed successfully!');
  } catch (error) {
    // Rollback the transaction in case of error
    await client.query('ROLLBACK');
    console.error('Migration failed:', error);
  } finally {
    // Release the client back to the pool
    client.release();
    // Close the pool
    await pool.end();
  }
}

// Run the migration
migrate().catch(console.error);