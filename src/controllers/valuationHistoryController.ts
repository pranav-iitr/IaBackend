
import { ValuationService } from "../services/valuationService";

export class ValuationController {
  static async createValuation(req: Request) {
    try {
      const data = req.body;
      const Valuation = await ValuationService.createValuation(data);
      return new Response(
        JSON.stringify({ message: "Valuation history created successfully", Valuation }),
        {
          status: 201,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error:any) {
      return new Response(
        JSON.stringify({ message: error.message }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  }

  static async getAllValuations(req: Request) {
    try {
      const valuations = await ValuationService.getAllValuations();
      return new Response(
        JSON.stringify(valuations),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error:any) {
      return new Response(
        JSON.stringify({ message: error.message }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  }

  static async getValuationById(req: Request) {
    try {
      const  valuationId  = req.url.split("/").pop();
      const Valuation = await ValuationService.getValuationById(Number(valuationId));
      if (Valuation) {
        return new Response(
          JSON.stringify(Valuation),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        return new Response(
          JSON.stringify({ message: "Valuation history not found" }),
          {
            status: 404,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
    } catch (error:any) {
      return new Response(
        JSON.stringify({ message: error.message }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  }

  static async updateValuation(req: Request) {
    try {
      const valuationId  = req.url.split("/").pop();
      const data = req.body;
      const Valuation = await ValuationService.updateValuation(Number(valuationId), data);
      return new Response(
        JSON.stringify(Valuation),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error:any) {
      return new Response(
        JSON.stringify({ message: error.message }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  }

  static async deleteValuation(req: Request) {
    try {
      const  valuationId  = req.url.split("/").pop();
      await ValuationService.deleteValuation(Number(valuationId));
      return new Response(
        JSON.stringify({ message: "Valuation history deleted successfully" }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error:any) {
      return new Response(
        JSON.stringify({ message: error.message }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  }
}
