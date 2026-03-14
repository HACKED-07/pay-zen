import "dotenv/config";
import { Pool } from "pg";

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const client = await pool.connect();
  try {
    console.log("Adding missing columns to User table...");
    await client.query(`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "stripeAccountId" TEXT;`);
    await client.query(`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "stripeAccountSetupComplete" BOOLEAN NOT NULL DEFAULT false;`);
    console.log("Successfully added columns.");
  } catch (error) {
    console.error("Error adding columns:", error);
  } finally {
    client.release();
    pool.end();
  }
}

main().catch(console.error);
