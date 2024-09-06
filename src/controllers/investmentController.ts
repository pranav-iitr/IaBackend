import { InvestmentService } from "../services/investmentService";

export class InvestmentController {
  static async createInvestment({ body }: { body: any }) {
    try {
      const investment = await InvestmentService.createInvestment(body);
      return {
        status: 201,
        message: "Investment created successfully",
        investment,
      };
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  static async getAllInvestments() {
    try {
      const investments = await InvestmentService.getAllInvestments();
      return {
        status: 200,
        investments,
      };
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  static async getInvestmentById({ params }: { params: { id: string } }) {
    try {
      const investmentId = Number(params.id);
      const investment = await InvestmentService.getInvestmentById(investmentId);
      if (investment) {
        return {
          status: 200,
          investment,
        };
      } else {
        return {
          status: 404,
          message: "Investment not found",
        };
      }
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  static async updateInvestment({ params, body }: { params: { id: string }; body: any }) {
    try {
      const investmentId = Number(params.id);
      const investment = await InvestmentService.updateInvestment(investmentId, body);
      return {
        status: 200,
        message: "Investment updated successfully",
        investment,
      };
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  static async deleteInvestment({ params }: { params: { id: string } }) {
    try {
      const investmentId = Number(params.id);
      await InvestmentService.deleteInvestment(investmentId);
      return {
        status: 200,
        message: "Investment deleted successfully",
      };
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }
}
