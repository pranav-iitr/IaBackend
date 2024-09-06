import { db } from "../db";
import { exitTransactionTable } from "../db/schema";
import { eq } from "drizzle-orm";

export class ExitTransactionService {
  static async createExitTransaction(data: any) {
    const exitTransaction = await db.insert(exitTransactionTable).values(data).returning();
    return exitTransaction[0];
  }

  static async getAllExitTransactions() {
    return await db.select().from(exitTransactionTable);
  }

  static async getExitTransactionById(exitId: number) {
    const exitTransaction = await db.select().from(exitTransactionTable).where(eq(exitTransactionTable.exitId, exitId));
    return exitTransaction[0];
  }

  static async updateExitTransaction(exitId: number, data: any) {
    const exitTransaction = await db.update(exitTransactionTable).set(data).where(eq(exitTransactionTable.exitId, exitId)).returning();
    return exitTransaction[0];
  }

  static async deleteExitTransaction(exitId: number) {
    await db.delete(exitTransactionTable).where(eq(exitTransactionTable.exitId, exitId));
  }
}
