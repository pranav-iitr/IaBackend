
import { db } from "../db";
import { valuationHistoryTable } from "../db/schema";
import { eq } from "drizzle-orm";

export class ValuationService {
  static async createValuation(data: any) {
    
    data.createdAt = new Date();
    data.valuationDate = new Date(data.valuationDate);
    // console.log("ValuationService -> createValuation -> data", data);
    const valuation = await db.insert(valuationHistoryTable).values(data).returning();
    return valuation[0];
  }

  static async getAllValuations() {
    return await db.select().from(valuationHistoryTable);
  }

  static async getValuationById(valuationId: number) {
    const valuation = await db.select().from(valuationHistoryTable).where(eq(valuationHistoryTable.valuationId, valuationId));
    return valuation[0];
  }

  static async updateValuation(valuationId: number, data: any) {
    const valuation = await db.update(valuationHistoryTable).set(data).where(eq(valuationHistoryTable.valuationId, valuationId)).returning();
    return valuation[0];
  }

  static async deleteValuation(valuationId: number) {
    await db.delete(valuationHistoryTable).where(eq(valuationHistoryTable.valuationId, valuationId));
  }
}
