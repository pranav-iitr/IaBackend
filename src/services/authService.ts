// /src/services/authService.ts
import { db } from "../db";
import { asc, between, count, eq, getTableColumns, sql } from 'drizzle-orm';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { appUserTable } from "../db/schema";

const JWT_SECRET = "your-secret-key"; // Store securely in environment variables

export class AuthService {
  static async registerUser(userData: { userName: string; email: string; password: string; role: string }) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const data ={
      userName: userData.userName,
      email: userData.email,
      role: userData.role,
      password: hashedPassword, 
    }
 
    // });
    const user = await db.insert(appUserTable).values(data).returning();
    

    return user[0];
  }

  static async loginUser(email: string, plainPassword: string) {
  
    const user_arr = await db.select().from(appUserTable).where(eq(appUserTable.email, email))
    if (!user_arr) throw new Error("User not found");

    const user = user_arr[0];
    const isPasswordValid = await bcrypt.compare(plainPassword, user.password);
    if (!isPasswordValid) throw new Error("Invalid password");

    const token = jwt.sign({ userId: user.userId, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
    return token;
  }

  static async verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
  }
}
