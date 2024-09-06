import { asc, between, count, eq, getTableColumns, sql,and } from 'drizzle-orm';
import { db } from '../db';
import { appUserTable } from '../db/schema';

export default async function controller(req: Request): Promise<Response> {
    const users = await db.select().from(appUserTable);

    console.log(req);
    return new Response(JSON.stringify(users), {
      status: 200,
        headers: {
            "Content-Type": "application/json",
        },
        
    });
  }
  

  