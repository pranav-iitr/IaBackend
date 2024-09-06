import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

config({ path: '.env' }); // or .env.local
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || "",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 6432,
    database: process.env.DB_NAME,
  };
console.log(`postgresql://${dbConfig.user}:${encodeURIComponent(dbConfig.password)}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`);

const client = postgres(`postgresql://${dbConfig.user}:${encodeURIComponent(dbConfig.password)}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`);
// check if the connection is successful
(async () => {
    await client`SELECT NOW()`;
    console.log("Connected to the database");
})();


export const db = drizzle(client);