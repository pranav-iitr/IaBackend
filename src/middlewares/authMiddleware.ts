// /src/middlewares/authMiddleware.ts
import { AuthService } from "../services/authService";

export const authMiddleware = async (req: Request) => {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return false ;
    }

    const token = authHeader.split(" ")[1];
    const user = await AuthService.verifyToken(token);
    return user
  } catch (error:any) {
    console.log(error);
    return false;
    
  }
};
