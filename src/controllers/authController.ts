// /src/controllers/authController.ts

import { AuthService } from "../services/authService";

export class AuthController {
  static async register(req: Request) : Promise<Response> {
    const res = new Response();
    try {
      const { userName, email, password, role } = await req.json();
      const user = await AuthService.registerUser({ userName, email, password, role });
      
      return new Response(
        JSON.stringify({ message: "User registered successfully", user }),
        {
          status: 201,
          headers: {
            "Content-Type": "application/json",
          },
        }
       
      )
    } catch (error:any) {
      console.log(error);
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

  static async login(req: Request) : Promise<Response> {
    const res = new Response();
    try {
      const { email, password } = await req.json();
      const token = await AuthService.loginUser(email, password);
     
      return new Response(
        JSON.stringify({ token }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error:any) {
      console.log(error);
      
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
