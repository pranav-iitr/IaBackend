import { ApplicationService } from "../services/applicationService";

export class ApplicationController {
  static async createApplication({ body }: { body: any }) {
    try {
      const application = await ApplicationService.createApplication(body);
      return {
        message: "Application created successfully",
        application,
      };
    } catch (error: any) {
      return {
        message: error.message,
        status: 400,
      };
    }
  }

  static async getAllApplications() {
    try {
      const applications = await ApplicationService.getAllApplications();
      return applications;
    } catch (error: any) {
      return {
        message: error.message,
        status: 400,
      };
    }
  }

  static async getApplicationById({ params }: { params: { id: string } }) {
    try {
      const application = await ApplicationService.getApplicationById(Number(params.id));
      if (application) {
        return application;
      } else {
        return {
          message: "Application not found",
          status: 404,
        };
      }
    } catch (error: any) {
      return {
        message: error.message,
        status: 400,
      };
    }
  }

  static async updateApplication({ params, body }: { params: { id: string }; body: any }) {
    try {
      const application = await ApplicationService.updateApplication(Number(params.id), body);
      return application;
    } catch (error: any) {
      return {
        message: error.message,
        status: 400,
      };
    }
  }

  static async deleteApplication({ params }: { params: { id: string } }) {
    try {
      await ApplicationService.deleteApplication(Number(params.id));
      return {
        message: "Application deleted successfully",
      };
    } catch (error: any) {
      return {
        message: error.message,
        status: 400,
      };
    }
  }
}
