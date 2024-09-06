import { ValuationService } from "../services/valuationService";

export class ValuationController {
  static async createValuation({ body }: { body: any }) {
 
    try {
      const valuation = await ValuationService.createValuation(body);
      return {
        status: 201,
        message: "Valuation history created successfully",
        valuation,
      };
    } catch (error: any) {
      console.log("ValuationController -> createValuation -> error", error);
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  static async getAllValuations() {
    try {
      const valuations = await ValuationService.getAllValuations();
      return {
        status: 200,
        valuations,
      };
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  static async getValuationById({ params }: { params: { id: string } }) {
    try {
      const valuationId = Number(params.id);
      const valuation = await ValuationService.getValuationById(valuationId);
      if (valuation) {
        return {
          status: 200,
          valuation,
        };
      } else {
        return {
          status: 404,
          message: "Valuation history not found",
        };
      }
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  static async updateValuation({ params, body }: { params: { id: string }; body: any }) {
    try {
      const valuationId = Number(params.id);
      const valuation = await ValuationService.updateValuation(valuationId, body);
      return {
        status: 200,
        message: "Valuation history updated successfully",
        valuation,
      };
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  static async deleteValuation({ params }: { params: { id: string } }) {
    try {
      const valuationId = Number(params.id);
      await ValuationService.deleteValuation(valuationId);
      return {
        status: 200,
        message: "Valuation history deleted successfully",
      };
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }
}
