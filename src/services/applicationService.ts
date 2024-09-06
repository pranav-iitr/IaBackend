import { db } from "../db";
import { applicationTable } from "../db/schema";
import { eq } from "drizzle-orm";

export class ApplicationService {
  static async createApplication(data: any) {
    const Application = await db.insert(applicationTable).values(data).returning();
    return Application[0];
  }

  static async getAllApplications() {
    return await db.select().from(applicationTable);
  }

  static async getApplicationById(ApplicationId: number) {
    const Application = await db.select().from(applicationTable).where(eq(applicationTable.applicationId, ApplicationId));
    return Application[0];
  }

  static async updateApplication(ApplicationId: number, data: any) {
    const Application = await db.update(applicationTable).set(data).where(eq(applicationTable.applicationId, ApplicationId)).returning();
    return Application[0];
  }

  static async deleteApplication(ApplicationId: number) {
    await db.delete(applicationTable).where(eq(applicationTable.applicationId, ApplicationId));
  }
}
