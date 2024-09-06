import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: '.env' });
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || "",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 6432,
    database: process.env.DB_NAME,
  };

export default {
  schema: './src/db/schema.ts',
  out: './supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: `postgresql://${dbConfig.user}:${encodeURIComponent(dbConfig.password)}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`,

  },
} satisfies Config;
