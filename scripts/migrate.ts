import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { sql } from 'drizzle-orm'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const db = drizzle(pool)

async function migrate() {
  try {
    console.log('Starting migration...')

    // Create visitors table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS visitors (
        id SERIAL PRIMARY KEY,
        ip_address VARCHAR(45),
        user_agent TEXT,
        page VARCHAR(255),
        referrer TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create inquiries table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS inquiries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        occasion VARCHAR(255) NOT NULL,
        theme VARCHAR(255),
        deadline VARCHAR(255),
        whatsapp VARCHAR(20),
        notes TEXT,
        status VARCHAR(50) DEFAULT 'new',
        source VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create indexes
    await db.execute(sql`CREATE INDEX IF NOT EXISTS visitors_ip_idx ON visitors(ip_address)`)
    await db.execute(sql`CREATE INDEX IF NOT EXISTS visitors_page_idx ON visitors(page)`)
    await db.execute(sql`CREATE INDEX IF NOT EXISTS visitors_timestamp_idx ON visitors(timestamp)`)
    await db.execute(sql`CREATE INDEX IF NOT EXISTS inquiries_email_idx ON inquiries(email)`)
    await db.execute(sql`CREATE INDEX IF NOT EXISTS inquiries_status_idx ON inquiries(status)`)
    await db.execute(sql`CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries(created_at)`)

    console.log('Migration completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

migrate()
