import jwt from "jsonwebtoken";
import { AuthService } from "../services/authService";

const JWT_SECRET = "your-secret-key"; // Store securely in environment variables


export const jwtMiddleware = async ({ request }: { request: Request }) => {
  // console.log("Checking for token",headers,next);
  const headers =  request.headers
  const authHeader = headers.get("authorization")


  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      status: 401,
      message: "Unauthorized: No token provided",
    };
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Add the user data to the context if needed
    return {
      status :200,
      userInfo : decoded
    }
  } catch (error) {
    return {
      status: 401,
      message: "Unauthorized: Invalid token",
    };
  }
};
