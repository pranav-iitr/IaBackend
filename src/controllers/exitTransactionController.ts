
import { ExitTransactionService } from "../services/exitTransactionService";

export class ExitTransactionController {
  static async createExitTransaction(req: Request) {
    try {
      const data = req.body;
      const exitTransaction = await ExitTransactionService.createExitTransaction(data);
      return new Response(
        JSON.stringify({ message: "Exit transaction created successfully", exitTransaction }),
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

  static async getAllExitTransactions(req: Request) {
    try {
      const exitTransactions = await ExitTransactionService.getAllExitTransactions();
      return new Response(
        JSON.stringify(exitTransactions),
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

  static async getExitTransactionById(req: Request) {
    try {
      const  exitId  = req.url.split("/").pop();
      const exitTransaction = await ExitTransactionService.getExitTransactionById(Number(exitId));
      if (exitTransaction) {
        return new Response(
          JSON.stringify(exitTransaction),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        return new Response(
          JSON.stringify({ message: "Exit transaction not found" }),
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

  static async updateExitTransaction(req: Request) {
    try {
      const  exitId  = req.url.split("/").pop();
      const data = req.body;
      const exitTransaction = await ExitTransactionService.updateExitTransaction(Number(exitId), data);
      return new Response(
        JSON.stringify({ message: "Exit transaction updated successfully", exitTransaction }),
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

  static async deleteExitTransaction(req: Request) {
    try {
      const  exitId  = req.url.split("/").pop();
      await ExitTransactionService.deleteExitTransaction(Number(exitId));
      return new Response(
        JSON.stringify({ message: "Exit transaction deleted successfully" }),
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
