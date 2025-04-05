const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const fs = require('fs');
const path = require('path');

async function initDb() {
  try {
    // Read the SQL file
    const sql = fs.readFileSync(path.join(__dirname, '../db/init.sql'), 'utf8');
    
    // Open the database
    const db = await open({
      filename: path.join(__dirname, '../startups.db'),
      driver: sqlite3.Database
    });

    console.log('Initializing database...');
    
    // Execute the SQL
    await db.exec(sql);
    
    console.log('Database initialized successfully!');
    
    // Verify the data
    const startups = await db.all('SELECT * FROM startups');
    console.log(`Inserted ${startups.length} startups:`);
    startups.forEach(startup => {
      console.log(`- ${startup.company_name} (${startup.stage})`);
    });

    await db.close();
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initDb(); 