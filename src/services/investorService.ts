import { db } from "../db";
import { investorTable } from "../db/schema";
import { eq } from "drizzle-orm";

export class InvestorService {
  static async createInvestor(data: any) {
    const investor = await db.insert(investorTable).values(data).returning();
    return investor[0];
  }

  static async getAllInvestors() {
    return await db.select().from(investorTable);
  }

  static async getInvestorById(investorId: number) {
    const investor = await db.select().from(investorTable).where(eq(investorTable.investorId, investorId));
    return investor[0];
  }

  static async updateInvestor(investorId: number, data: any) {
    const investor = await db.update(investorTable).set(data).where(eq(investorTable.investorId, investorId)).returning();
    return investor[0];
  }

  static async deleteInvestor(investorId: number) {
    await db.delete(investorTable).where(eq(investorTable.investorId, investorId));
  }
}
