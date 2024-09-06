import { Elysia } from "elysia";
import { AuthController } from "./controllers/authController";
import { ApplicationController } from "./controllers/applicationController";
import { ExitTransactionController } from "./controllers/exitTransactionController";
import { InvestmentController } from "./controllers/investmentController";
import { InvestorController } from "./controllers/investorController";
import { ValuationController } from "./controllers/valuationController";
import { PortfolioCompanyController } from "./controllers/portfolioCompanyController";
import { jwtMiddleware } from "./middlewares/authMiddleware";
import { swagger } from "@elysiajs/swagger";

new Elysia()
  .use(swagger())

//   .onParse(({ request, contentType }) => {
//    if(request.method == "POST" && contentType == "application/json"){
//      let data = request.json();
//     //  update data where key has the word date
//     let keys = Object.keys(data);
//     keys.forEach((key) => {
//       if(key.includes("date")){
//         data[key] = new Date(data[key]);
//       }
//     })
//     return data;
//    }
// })
  .onBeforeHandle(async ({ request }) => {
    
    const resp = await jwtMiddleware({request});
    

    const url_array = request.url.split("/");

  


    if (url_array.indexOf("auth") == -1) {
      if (Math.floor(resp.status / 100) == 4) {
        return resp;
      }
      
    }
    // update the original request body if type is post
    
  })

  .group("/auth", (group) =>
    group

      .post("/register", async ({ body }) => {
        const response = await AuthController.register({
          body: body as {
            userName: string;
            email: string;
            password: string;
            role: string;
          },
        });
        return response;
      })

      .post(
        "/login",
        async ({ body }: { body: { email: string; password: string } }) => {
          const response = await AuthController.login({ body });
          return response;
        }
      )
  )
  .group("/applications", (group) =>
    group

      .get("/",  async () => {
        return await ApplicationController.getAllApplications();
      })

      // Get application by ID (public route)
      .get(
        "/:id",
        
        async ({ params }: { params: { id: string } }) => {
          return await ApplicationController.getApplicationById({ params });
        }
      )

      // Create application (protected route)
      .post("/",  async ({ body }: { body: any }) => {
        return await ApplicationController.createApplication({ body });
      })

      // Update application by ID (protected route)
      .put("/:id",  async ({ params, body }) => {
        return await ApplicationController.updateApplication({ params, body });
      })

      // Delete application by ID (protected route)
      .delete("/:id",  async ({ params }) => {
        return await ApplicationController.deleteApplication({ params });
      })
  )

  .group("/exit-transactions", (group) =>
    group
      // Get all exit transactions (protected by JWT)
      .get("/",  async () => {
        const response =
          await ExitTransactionController.getAllExitTransactions();
        return new Response(JSON.stringify(response), {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        });
      })

      // Get exit transaction by ID (protected by JWT)
      .get("/:id",  async ({ params }) => {
        const response = await ExitTransactionController.getExitTransactionById(
          { params }
        );
        return new Response(JSON.stringify(response), {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        });
      })

      // Create exit transaction (protected by JWT)
      .post("/",  async ({ body }) => {
        const response = await ExitTransactionController.createExitTransaction({
          body,
        });
        return new Response(JSON.stringify(response), {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        });
      })

      // Update exit transaction by ID (protected by JWT)
      .put("/:id",  async ({ params, body }) => {
        const response = await ExitTransactionController.updateExitTransaction({
          params,
          body,
        });
        return new Response(JSON.stringify(response), {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        });
      })

      // Delete exit transaction by ID (protected by JWT)
      .delete("/:id",  async ({ params }) => {
        const response = await ExitTransactionController.deleteExitTransaction({
          params,
        });
        return new Response(JSON.stringify(response), {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        });
      })
  )

  .group("/investments", (group) =>
    group
      // Get all investments (protected by JWT)
      .get("/",  async () => {
        const response = await InvestmentController.getAllInvestments();
        return new Response(JSON.stringify(response), {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        });
      })

      // Get investment by ID (protected by JWT)
      .get("/:id",  async ({ params }) => {
        const response = await InvestmentController.getInvestmentById({
          params,
        });
        return new Response(JSON.stringify(response), {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        });
      })

      // Create investment (protected by JWT)
      .post("/",  async ({ body }) => {
        const response = await InvestmentController.createInvestment({ body });
        return new Response(JSON.stringify(response), {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        });
      })

      // Update investment by ID (protected by JWT)
      .put("/:id",  async ({ params, body }) => {
        const response = await InvestmentController.updateInvestment({
          params,
          body,
        });
        return new Response(JSON.stringify(response), {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        });
      })

      // Delete investment by ID (protected by JWT)
      .delete("/:id",  async ({ params }) => {
        const response = await InvestmentController.deleteInvestment({
          params,
        });
        return new Response(JSON.stringify(response), {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        });
      })
  )

  .group("/investors", (group) =>
    group
      // Get all investors (protected by JWT)
      .get("/",  async () => {
        const response = await InvestorController.getAllInvestors();
        return new Response(JSON.stringify(response), {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        });
      })

      // Get investor by ID (protected by JWT)
      .get("/:id",  async ({ params }) => {
        const response = await InvestorController.getInvestorById({ params });
        return new Response(JSON.stringify(response), {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        });
      })

      // Create investor (protected by JWT)
      .post("/",  async ({ body }) => {
        const response = await InvestorController.createInvestor({ body });
        return new Response(JSON.stringify(response), {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        });
      })

      // Update investor by ID (protected by JWT)
      .put("/:id",  async ({ params, body }) => {
        const response = await InvestorController.updateInvestor({
          params,
          body,
        });
        return new Response(JSON.stringify(response), {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        });
      })

      // Delete investor by ID (protected by JWT)
      .delete("/:id",  async ({ params }) => {
        const response = await InvestorController.deleteInvestor({ params });
        return new Response(JSON.stringify(response), {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        });
      })
  )
  .group("/companies", (group) =>
    group
      // Get all companies (protected by JWT)
      .get("/",  async () => {
        const response = await PortfolioCompanyController.getAllCompanies();
        return new Response(JSON.stringify(response), {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        });
      })

      // Get company by ID (protected by JWT)
      .get("/:id",  async ({ params }) => {
        const response = await PortfolioCompanyController.getCompanyById({
          params,
        });
        return new Response(JSON.stringify(response), {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        });
      })

      // Create company (protected by JWT)
      .post("/",  async ({ body }) => {
        const response = await PortfolioCompanyController.createCompany({
          body,
        });
        return new Response(JSON.stringify(response), {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        });
      })

      // Update company by ID (protected by JWT)
      .put("/:id",  async ({ params, body }) => {
        const response = await PortfolioCompanyController.updateCompany({
          params,
          body,
        });
        return new Response(JSON.stringify(response), {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        });
      })

      // Delete company by ID (protected by JWT)
      .delete("/:id",  async ({ params }) => {
        const response = await PortfolioCompanyController.deleteCompany({
          params,
        });
        return new Response(JSON.stringify(response), {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        });
      })
  )
  .group("/valuations", (group) =>
    group

      // Get all valuations (protected by JWT)
      .get("/", async () => {
        const response = await ValuationController.getAllValuations();
        return new Response(JSON.stringify(response), {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        });
      })

      // Get valuation by ID (protected by JWT)
      .get("/:id",  async ({ params }) => {
        const response = await ValuationController.getValuationById({ params });
        return new Response(JSON.stringify(response), {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        });
      })

      // Create valuation (protected by JWT)
      .post("/", async ({ body }) => {
      
        const response = await ValuationController.createValuation({ body });
        return new Response(JSON.stringify(response), {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        });
      })

      // Update valuation by ID (protected by JWT)
      .put("/:id",  async ({ params, body }) => {
        const response = await ValuationController.updateValuation({
          params,
          body,
        });
        return new Response(JSON.stringify(response), {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        });
      })

      // Delete valuation by ID (protected by JWT)
      .delete("/:id",  async ({ params }) => {
        const response = await ValuationController.deleteValuation({ params });
        return new Response(JSON.stringify(response), {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        });
      })
  )

  .listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
  })

 


// const server = serve({
//   port,
//   fetch(req) {

//     const url = new URL(req.url);
//     if (url.pathname === "/hello") {
//       return helloRoute(req);
//     }
//     if (url.pathname === "/auth/login") {
//       return authRouter.login(req);
//     }
//     if (url.pathname === "/auth/register") {
//       return authRouter.register(req);
//     }

//     return new Response("Not Found", { status: 404 });
//   },
// });

// console.log(`Server is running on http://localhost:${port}`);
