import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

// Initialize database connection
async function openDb() {
  try {
    const dbPath = path.resolve(process.cwd(), 'startups.db');
    console.log('Attempting to open database at:', dbPath);
    
    return await open({
      filename: dbPath,
      driver: sqlite3.Database
    });
  } catch (error) {
    console.error('Failed to open database:', error);
    throw error;
  }
}

export interface Startup {
  id: number;
  company_name: string;
  stage: string;
  product_short: string;
  description: string;
  arr: string;
  founders: string;
  tam: string;
  market_growth_rate: string;
  product_stage: string;
  user_growth: string;
  revenue_growth: string;
  current_valuation: string;
  projected_exit_value: string;
  exit_timeline: string;
}

export async function getAllStartups(): Promise<Startup[]> {
  try {
    console.log('getAllStartups: Opening database connection');
    const db = await openDb();
    console.log('getAllStartups: Executing query');
    const results = await db.all('SELECT * FROM startups');
    console.log(`getAllStartups: Found ${results.length} startups`);
    return results;
  } catch (error) {
    console.error('getAllStartups error:', error);
    throw error;
  }
}

export async function getStartupById(id: number): Promise<Startup | undefined> {
  try {
    console.log('getStartupById: Opening database connection for id:', id);
    const db = await openDb();
    console.log('getStartupById: Executing query');
    const result = await db.get('SELECT * FROM startups WHERE id = ?', [id]);
    console.log('getStartupById: Result:', result);
    return result;
  } catch (error) {
    console.error('getStartupById error:', error);
    throw error;
  }
}

export async function getStartupsByStage(stage: string): Promise<Startup[]> {
  const db = await openDb();
  return db.all('SELECT * FROM startups WHERE stage = ?', [stage]);
}

// Get featured startups (you can modify the criteria as needed)
export async function getFeaturedStartups(): Promise<Startup[]> {
  try {
    console.log('getFeaturedStartups: Opening database connection');
    const db = await openDb();
    console.log('getFeaturedStartups: Executing query');
    const results = await db.all(`
      SELECT * FROM startups 
      WHERE stage IN ('Series A', 'Series B') 
      ORDER BY CAST(REPLACE(REPLACE(current_valuation, '$', ''), 'M', '') AS REAL) DESC
    `);
    console.log(`getFeaturedStartups: Found ${results.length} startups`);
    return results;
  } catch (error) {
    console.error('getFeaturedStartups error:', error);
    throw error;
  }
}

// Get trending startups based on growth rate
export async function getTrendingStartups(): Promise<Startup[]> {
  try {
    console.log('getTrendingStartups: Opening database connection');
    const db = await openDb();
    console.log('getTrendingStartups: Executing query');
    const results = await db.all(`
      SELECT * FROM startups 
      WHERE revenue_growth NOT LIKE 'Pre-revenue%'
      ORDER BY 
        CASE 
          WHEN revenue_growth LIKE '%QoQ%' THEN CAST(REPLACE(REPLACE(revenue_growth, '%', ''), 'QoQ', '') AS REAL) * 4
          WHEN revenue_growth LIKE '%MoM%' THEN CAST(REPLACE(REPLACE(revenue_growth, '%', ''), 'MoM', '') AS REAL) * 12
          ELSE 0
        END DESC
    `);
    console.log(`getTrendingStartups: Found ${results.length} startups`);
    return results;
  } catch (error) {
    console.error('getTrendingStartups error:', error);
    throw error;
  }
}

// Get early stage startups (Pre-Seed and Seed)
export async function getEarlyStageStartups(): Promise<Startup[]> {
  try {
    console.log('getEarlyStageStartups: Opening database connection');
    const db = await openDb();
    console.log('getEarlyStageStartups: Executing query');
    const results = await db.all(`
      SELECT * FROM startups 
      WHERE stage IN ('Pre-Seed', 'Seed') 
      ORDER BY CAST(REPLACE(REPLACE(current_valuation, '$', ''), 'M', '') AS REAL) DESC
    `);
    console.log(`getEarlyStageStartups: Found ${results.length} startups`);
    return results;
  } catch (error) {
    console.error('getEarlyStageStartups error:', error);
    throw error;
  }
} 