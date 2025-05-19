import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Function to get MySQL connection
const getUserDbPool = () => {
  const dbConfig = {
    host: process.env.MYSQL_REF_HOST,
    port: Number.parseInt(process.env.MYSQL_REF_PORT || '3306'),
    user: process.env.MYSQL_REF_USER,
    password: process.env.MYSQL_REF_PASSWORD,
    database: process.env.MYSQL_REF_DATABASE,
    ssl: { rejectUnauthorized: false },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };
  return mysql.createPool(dbConfig);
};

export async function GET(request: NextRequest) {
  try {
    // Get user_id from query parameters
    const user_id = request.nextUrl.searchParams.get('user_id');

    if (!user_id) {
      return NextResponse.json({ error: 'Missing user_id parameter' }, { status: 400 });
    }

    const pool = getUserDbPool();

    // Get user's registration rank (position in order of registration)
    const [userRankResult] = await pool.execute(
      `SELECT registration_rank 
       FROM (
         SELECT user_id, RANK() OVER (ORDER BY created_at) as registration_rank 
         FROM users
       ) as ranked_users
       WHERE user_id = ?`,
      [user_id]
    );

    const userRank = (userRankResult as any[])[0]?.registration_rank || 0;

    return NextResponse.json({ 
      success: true, 
      user_id: user_id,
      rank: userRank
    });
  } catch (error) {
    console.error('Error fetching user rank:', error);
    return NextResponse.json({ 
      error: 'Failed to get user rank', 
      details: (error as Error).message 
    }, { status: 500 });
  }
} 