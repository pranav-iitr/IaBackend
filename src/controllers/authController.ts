// /src/controllers/authController.ts

import { AuthService } from "../services/authService";

import { t } from "elysia";

// AuthController class refactored for Elysia
export class AuthController {
  static async register({ body }: { body: { userName: string, email: string, password: string, role: string } }) {
    try {
      const { userName, email, password, role } = body;
      const user = await AuthService.registerUser({ userName, email, password, role });
      return {
        message: "User registered successfully",
        user,
      };
    } catch (error: any) {
      console.log(error);
      return {
        message: error.message,
        status: 400
      };
    }
  }

  static async login({ body }: { body: { email: string, password: string } }) {
    try {
      const { email, password } = body;
      const token = await AuthService.loginUser(email, password);
      return {
        token,
        status: 200,
      };
    } catch (error: any) {
      console.log(error);
      return {
        message: error.message,
        status: 400
      };
    }
  }
}