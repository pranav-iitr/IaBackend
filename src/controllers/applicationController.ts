import { ApplicationService } from "../services/applicationService";
export class ApplicationController {
  static async createApplication(req: Request) {
    try {
      const data = req.body;
      const application = await ApplicationService.createApplication(data);
      return new Response(
        JSON.stringify({ message: "Application created successfully", application }),
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

  static async getAllApplications(req: Request) {
    try {
      const applications = await ApplicationService.getAllApplications();
      return new Response(
        JSON.stringify(applications),
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

  static async getApplicationById(req: Request) {
    try {
      const  applicationId  = req.url.split("/").pop();
      const application = await ApplicationService.getApplicationById(Number(applicationId));
      if (application) {
        return new Response(
          JSON.stringify(application),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        return new Response(
          JSON.stringify({ message: "Application not found" }),
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

  static async updateApplication(req: Request) {
    try {
      const  applicationId  = req.url.split("/").pop();
      const data = req.body;
      const application = await ApplicationService.updateApplication(Number(applicationId), data);
      return new Response(
        JSON.stringify(application),
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

  static async deleteApplication(req: Request) {
    try {
      const applicationId  = req.url.split("/").pop();
      await ApplicationService.deleteApplication(Number(applicationId));
      return new Response(
        JSON.stringify({ message: "Application deleted successfully" }),
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
