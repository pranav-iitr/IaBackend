import { db } from "../db";
import { investmentTable } from "../db/schema";
import { eq } from "drizzle-orm";

export class InvestmentService {
  static async createInvestment(data: any) {
    const investment = await db.insert(investmentTable).values(data).returning();
    return investment[0];
  }

  static async getAllInvestments() {
    return await db.select().from(investmentTable);
  }

  static async getInvestmentById(investmentId: number) {
    const investment = await db.select().from(investmentTable).where(eq(investmentTable.investmentId, investmentId));
    return investment[0];
  }

  static async updateInvestment(investmentId: number, data: any) {
    const investment = await db.update(investmentTable).set(data).where(eq(investmentTable.investmentId, investmentId)).returning();
    return investment[0];
  }

  static async deleteInvestment(investmentId: number) {
    await db.delete(investmentTable).where(eq(investmentTable.investmentId, investmentId));
  }
}
