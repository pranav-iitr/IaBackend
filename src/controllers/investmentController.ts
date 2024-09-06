
import { InvestmentService } from "../services/investmentService";

export class InvestmentController {
  static async createInvestment(req: Request) {
    try {
      const data = req.body;
      const investment = await InvestmentService.createInvestment(data);
      return new Response(
        JSON.stringify({ message: "Investment created successfully", investment }),
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

  static async getAllInvestments(req: Request) {
    try {
      const investments = await InvestmentService.getAllInvestments();
      return new Response(
        JSON.stringify(investments),
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

  static async getInvestmentById(req: Request) {
    try {
      const investmentId  = req.url.split("/").pop();
      const investment = await InvestmentService.getInvestmentById(Number(investmentId));
      if (investment) {
        return new Response(
          JSON.stringify(investment),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        return new Response(
          JSON.stringify({ message: "Investment not found" }),
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

  static async updateInvestment(req: Request) {
    try {
      const  investmentId  = req.url.split("/").pop();
      const data = req.body;
      const investment = await InvestmentService.updateInvestment(Number(investmentId), data);
     return new Response(
        JSON.stringify({ message: "Investment updated successfully", investment }),
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

  static async deleteInvestment(req: Request) {
    try {
      const  investmentId = req.url.split("/").pop();
      await InvestmentService.deleteInvestment(Number(investmentId));
      return new Response(
        JSON.stringify({ message: "Investment deleted successfully" }),
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
