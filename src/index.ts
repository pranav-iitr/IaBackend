import { serve } from "bun";
import { db } from "./db";
import helloRoute from "./routes/";
import authRouter from "./routes/ authRoutes";

const port = 5000;



const server = serve({
  port,
  fetch(req) {


    const url = new URL(req.url);
    if (url.pathname === "/hello") {
      return helloRoute(req);
    }
    if (url.pathname === "/auth/login") {
      return authRouter.login(req);
    }
    if (url.pathname === "/auth/register") {
      return authRouter.register(req);
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server is running on http://localhost:${port}`);
