import { db } from "../db";
import { roundTable } from "../db/schema";
import { eq } from "drizzle-orm";

export class RoundService {
  static async createRound(data: any) {
    const round = await db.insert(roundTable).values(data).returning();
    return round[0];
  }

  static async getAllRounds() {
    return await db.select().from(roundTable);
  }

  static async getRoundById(roundId: number) {
    const round = await db.select().from(roundTable).where(eq(roundTable.roundId, roundId));
    return round[0];
  }

  static async updateRound(roundId: number, data: any) {
    const round = await db.update(roundTable).set(data).where(eq(roundTable.roundId, roundId)).returning();
    return round[0];
  }

  static async deleteRound(roundId: number) {
    await db.delete(roundTable).where(eq
