import { PortfolioCompanyService } from "../services/portfolioCompanyService";

export class PortfolioCompanyController {
  static async createCompany({ body }: { body: any }) {
    try {
      const company = await PortfolioCompanyService.createCompany(body);
      return {
        status: 201,
        message: "Company created successfully",
        company,
      };
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  static async getAllCompanies() {
    try {
      const companies = await PortfolioCompanyService.getAllCompanies();
      return {
        status: 200,
        companies,
      };
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  static async getCompanyById({ params }: { params: { id: string } }) {
    try {
      const companyId = Number(params.id);
      const company = await PortfolioCompanyService.getCompanyById(companyId);
      if (company) {
        return {
          status: 200,
          company,
        };
      } else {
        return {
          status: 404,
          message: "Company not found",
        };
      }
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  static async updateCompany({ params, body }: { params: { id: string }; body: any }) {
    try {
      const companyId = Number(params.id);
      const company = await PortfolioCompanyService.updateCompany(companyId, body);
      return {
        status: 200,
        message: "Company updated successfully",
        company,
      };
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  static async deleteCompany({ params }: { params: { id: string } }) {
    try {
      const companyId = Number(params.id);
      await PortfolioCompanyService.deleteCompany(companyId);
      return {
        status: 200,
        message: "Company deleted successfully",
      };
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }
}
