
import { ne,eq } from "drizzle-orm";
import { PortfolioCompanyService } from "../services/portfolioCompanyService";

export class PortfolioCompanyController {
  static async createCompany(req: Request) {
    try {
      const data = req.body;
      const company = await PortfolioCompanyService.createCompany(data);
      return new Response(JSON.stringify(company), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error:any) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
        });
    }
  }

  static async getAllCompanies(req: Request) {
    try {
      const companies = await PortfolioCompanyService.getAllCompanies();
        return new Response(JSON.stringify(companies), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
            });
        
    } catch (error:any) {
        return new Response(JSON.stringify({ message: error.message }), {
            status: 400,
            headers: {
            "Content-Type": "application/json",
            },
        });
    }
  }

  static async getCompanyById(req: Request) {
    try {
      const  companyId  = req.url.split("/").pop();
      const company = await PortfolioCompanyService.getCompanyById(Number(companyId));
      if (company) {
        return new Response(JSON.stringify(company), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        return new Response(JSON.stringify({ message: "Company not found" }), {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    } catch (error:any) {
        return new Response(JSON.stringify({ message: error.message }), {
            status: 400,
            headers: {
            "Content-Type": "application/json",
            },  
        });
    }
  }

  static async updateCompany(req: Request) {
    try {
      const  companyId  = req.url.split("/").pop();
      const data = req.body;
      const company = await PortfolioCompanyService.updateCompany(Number(companyId), data);
      return new Response(
        JSON.stringify(company),
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

  static async deleteCompany(req: Request) {
    try {
      const companyId  = req.url.split("/").pop();
      await PortfolioCompanyService.deleteCompany(Number(companyId));
      return new Response(
        JSON.stringify({ message: "Company deleted successfully" }),
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
