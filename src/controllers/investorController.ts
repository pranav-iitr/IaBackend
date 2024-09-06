
import { InvestorService } from "../services/investorService";

export class InvestorController {
  static async createInvestor(req: Request) {
    try {
      const data = req.body;
      const investor = await InvestorService.createInvestor(data);
      return new Response(
        JSON.stringify({ message: "Investor created successfully", investor }),
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

  static async getAllInvestors(req: Request) {
    try {
      const investors = await InvestorService.getAllInvestors();
      return new Response(
        JSON.stringify(investors),
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

  static async getInvestorById(req: Request) {
    try {
      const  investorId  = req.url.split("/").pop();
      const investor = await InvestorService.getInvestorById(Number(investorId));
      if (investor) {
        return new Response(
          JSON.stringify(investor),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        return new Response(
          JSON.stringify({ message: "Investor not found" }),
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

  static async updateInvestor(req: Request) {
    try {
      const investorId  = req.url.split("/").pop();
      const data = req.body;
      const investor = await InvestorService.updateInvestor(Number(investorId), data);
      return new Response(
        JSON.stringify({ message: "Investor updated successfully", investor }),
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

  static async deleteInvestor(req: Request) {
    try {
      const  investorId  = req.url.split("/").pop();
      await InvestorService.deleteInvestor(Number(investorId));
      return new Response(
        JSON.stringify({ message: "Investor deleted successfully" }),
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
