import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Initialize database connection
export async function openDb() {
  return open({
    filename: './startups.db', // Path to your database file
    driver: sqlite3.Database
  });
}

// Helper function to get startup by ID
export async function getStartupById(id: number) {
  const db = await openDb();
  return db.get('SELECT * FROM startups WHERE id = ?', [id]);
}

// Helper function to get all startups
export async function getAllStartups() {
  const db = await openDb();
  return db.all('SELECT * FROM startups');
}

// Helper function to get startups by stage
export async function getStartupsByStage(stage: string) {
  const db = await openDb();
  return db.all('SELECT * FROM startups WHERE stage = ?', [stage]);
}

// Helper function to get high ARR startups
export async function getHighArrStartups() {
  const db = await openDb();
  return db.all("SELECT company_name, arr, current_valuation FROM startups WHERE arr LIKE '$%M'");
}

// Helper function to get startups sorted by valuation
export async function getStartupsByValuation() {
  const db = await openDb();
  return db.all(`
    SELECT company_name, current_valuation, projected_exit_value 
    FROM startups 
    ORDER BY CAST(REPLACE(REPLACE(current_valuation, '$', ''), 'M', '') AS REAL) DESC
  `);
}

// Helper function to get average TAM by stage
export async function getAverageTamByStage() {
  const db = await openDb();
  return db.all(`
    SELECT stage, AVG(CAST(REPLACE(REPLACE(tam, '$', ''), 'B', '') AS REAL)) AS avg_tam_billions 
    FROM startups 
    GROUP BY stage
  `);
}

// Helper function to get AI startups
export async function getAiStartups() {
  const db = await openDb();
  return db.all("SELECT company_name, product_short FROM startups WHERE description LIKE '%AI%'");
} 