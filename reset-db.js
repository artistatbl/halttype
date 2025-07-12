// reset-db.js - Script to drop all tables and run a new migration
require('dotenv').config();
const { Pool } = require('pg');
const { exec } = require('child_process');

// Create a connection pool using the DATABASE_URL from .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function resetDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('Starting database reset...');
    
    // Start a transaction
    await client.query('BEGIN');
    
    // Get all tables in the public schema
    const tablesResult = await client.query(`
      SELECT tablename FROM pg_tables WHERE schemaname = 'public'
    `);
    
    const tables = tablesResult.rows.map(row => row.tablename);
    console.log(`Found ${tables.length} tables: ${tables.join(', ')}`);
    
    if (tables.length > 0) {
      // Disable foreign key checks temporarily
      await client.query('SET CONSTRAINTS ALL DEFERRED');
      
      // Drop all tables
      for (const table of tables) {
        console.log(`Dropping table: ${table}`);
        await client.query(`DROP TABLE IF EXISTS "${table}" CASCADE`);
      }
      
      // Re-enable foreign key checks
      await client.query('SET CONSTRAINTS ALL IMMEDIATE');
    }
    
    // Commit the transaction
    await client.query('COMMIT');
    console.log('All tables dropped successfully!');
    
    // Run the migration
    console.log('Running migration...');
    runMigration();
    
  } catch (error) {
    // Rollback the transaction in case of error
    await client.query('ROLLBACK');
    console.error('Database reset failed:', error);
  } finally {
    // Release the client back to the pool
    client.release();
    // Close the pool
    await pool.end();
  }
}

function runMigration() {
  // First, run the SQL migration from the drizzle folder
  console.log('Applying initial SQL migration...');
  exec('cat ./drizzle/0000_lively_triton.sql | psql "' + process.env.DATABASE_URL + '"', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error applying SQL migration: ${error.message}`);
      return;
    }
    if (stderr && !stderr.includes('CREATE TABLE')) {
      console.error(`SQL migration stderr: ${stderr}`);
    } else {
      console.log('SQL migration applied successfully');
    }
    
    // Now run the drizzle-kit generate command to create any new migrations
    exec('npm run db:generate', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error generating migration: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Generate stderr: ${stderr}`);
      }
      console.log(`Generate stdout: ${stdout}`);
      
      // Finally, run our custom migration script to add any missing columns
      console.log('Applying custom migration...');
      exec('node migrate.js', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error in custom migration: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Custom migration stderr: ${stderr}`);
        }
        console.log(`Custom migration stdout: ${stdout}`);
        console.log('Database reset and migration completed successfully!');
      });
    });
  });
}

// Run the reset
console.log('Starting database reset and migration process...');
resetDatabase().catch(console.error);