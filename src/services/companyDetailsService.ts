import { db } from "../db";
import { companyDetailsTable } from "../db/schema";
import { eq } from "drizzle-orm";

export class CompanyDetailsService {
  static async createDetails(data: any) {
    const details = await db.insert(companyDetailsTable).values(data).returning();
    return details[0];
  }

  static async getAllDetails() {
    return await db.select().from(companyDetailsTable);
  }

  static async getDetailsById(detailsId: number) {
    const details = await db.select().from(companyDetailsTable).where(eq(companyDetailsTable.detailsId, detailsId));
    return details[0];
  }

  static async updateDetails(detailsId: number, data: any) {
    const details = await db.update(companyDetailsTable).set(data).where(eq(companyDetailsTable.detailsId, detailsId)).returning();
    return details[0];
  }

  static async deleteDetails(detailsId: number) {
    await db.delete(companyDetailsTable).where(eq(companyDetailsTable.detailsId, detailsId));
  }
}
