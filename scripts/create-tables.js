// Script to create necessary database tables
const mysql = require('mysql2/promise');

async function main() {
  // Database connection configuration
  const dbConfig = {
    host: 'switchyard.proxy.rlwy.net',
    port: 37716,
    user: 'root',
    password: 'rTqHwVobvxtTWNKLXBwVaRooeckxOzoG',
    database: 'railway',
    ssl: { rejectUnauthorized: false }
  };

  console.log('Connecting to database...');
  
  // Create connection pool
  const pool = mysql.createPool(dbConfig);
  
  try {
    // Check connection
    await pool.query('SELECT 1');
    console.log('Database connection successful');
    
    // Create user_points table if it doesn't exist
    console.log('Creating user_points table if it doesn\'t exist...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_points (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(50) NOT NULL,
        points INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_user_id (user_id)
      )
    `);
    console.log('user_points table is ready');
    
    // Create user_tasks table if it doesn't exist
    console.log('Creating user_tasks table if it doesn\'t exist...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(50) NOT NULL,
        task_type VARCHAR(50) NOT NULL,
        task_id VARCHAR(50) NOT NULL,
        completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_user_task (user_id, task_type, task_id)
      )
    `);
    console.log('user_tasks table is ready');
    
    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    // Close the pool
    await pool.end();
    console.log('Database connection closed');
  }
}

main().catch(console.error); 