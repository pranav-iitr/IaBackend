import { AuthController } from "../controllers/authController";
const authController = new AuthController();

async function login(req: Request): Promise<Response> {
  return await AuthController.login(req);
}

async function register(req: Request): Promise<Response> {
  return await AuthController.register(req);
}

const authRouter = {
  login,
  register,
};
export default authRouter
