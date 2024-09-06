import { InvestorService } from "../services/investorService";

export class InvestorController {
  static async createInvestor({ body }: { body: any }) {
    try {
      const investor = await InvestorService.createInvestor(body);
      return {
        status: 201,
        message: "Investor created successfully",
        investor,
      };
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  static async getAllInvestors() {
    try {
      const investors = await InvestorService.getAllInvestors();
      return {
        status: 200,
        investors,
      };
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  static async getInvestorById({ params }: { params: { id: string } }) {
    try {
      const investorId = Number(params.id);
      const investor = await InvestorService.getInvestorById(investorId);
      if (investor) {
        return {
          status: 200,
          investor,
        };
      } else {
        return {
          status: 404,
          message: "Investor not found",
        };
      }
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  static async updateInvestor({ params, body }: { params: { id: string }; body: any }) {
    try {
      const investorId = Number(params.id);
      const investor = await InvestorService.updateInvestor(investorId, body);
      return {
        status: 200,
        message: "Investor updated successfully",
        investor,
      };
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  static async deleteInvestor({ params }: { params: { id: string } }) {
    try {
      const investorId = Number(params.id);
      await InvestorService.deleteInvestor(investorId);
      return {
        status: 200,
        message: "Investor deleted successfully",
      };
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }
}
