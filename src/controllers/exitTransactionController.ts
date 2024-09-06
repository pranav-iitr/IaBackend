import { ExitTransactionService } from "../services/exitTransactionService";

export class ExitTransactionController {
  static async createExitTransaction({ body }: { body: any }) {
    try {
      const exitTransaction = await ExitTransactionService.createExitTransaction(body);
      return {
        status: 201,
        message: "Exit transaction created successfully",
        exitTransaction,
      };
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  static async getAllExitTransactions() {
    try {
      const exitTransactions = await ExitTransactionService.getAllExitTransactions();
      return {
        status: 200,
        exitTransactions,
      };
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  static async getExitTransactionById({ params }: { params: { id: string } }) {
    try {
      const exitId = Number(params.id);
      const exitTransaction = await ExitTransactionService.getExitTransactionById(exitId);
      if (exitTransaction) {
        return {
          status: 200,
          exitTransaction,
        };
      } else {
        return {
          status: 404,
          message: "Exit transaction not found",
        };
      }
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  static async updateExitTransaction({ params, body }: { params: { id: string }; body: any }) {
    try {
      const exitId = Number(params.id);
      const exitTransaction = await ExitTransactionService.updateExitTransaction(exitId, body);
      return {
        status: 200,
        message: "Exit transaction updated successfully",
        exitTransaction,
      };
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }

  static async deleteExitTransaction({ params }: { params: { id: string } }) {
    try {
      const exitId = Number(params.id);
      await ExitTransactionService.deleteExitTransaction(exitId);
      return {
        status: 200,
        message: "Exit transaction deleted successfully",
      };
    } catch (error: any) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }
}

