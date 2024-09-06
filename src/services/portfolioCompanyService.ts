import { db } from "../db";
import { portfolioCompanyTable } from "../db/schema";
import { eq } from "drizzle-orm";

export class PortfolioCompanyService {
  static async createCompany(data: any) {
    const company = await db.insert(portfolioCompanyTable).values(data).returning();
    return company[0];
  }

  static async getAllCompanies() {
    return await db.select().from(portfolioCompanyTable);
  }

  static async getCompanyById(companyId: number) {
    const company = await db.select().from(portfolioCompanyTable).where(eq(portfolioCompanyTable.companyId, companyId));
    return company[0];
  }

  static async updateCompany(companyId: number, data: any) {
    const company = await db.update(portfolioCompanyTable).set(data).where(eq(portfolioCompanyTable.companyId, companyId)).returning();
    return company[0];
  }

  static async deleteCompany(companyId: number) {
    await db.delete(portfolioCompanyTable).where(eq(portfolioCompanyTable.companyId, companyId));
  }
}
