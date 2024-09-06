// make crud router for investment
// Import the 'Application' type from the appropriate module
import { InvestorController } from "../controllers/investorController";


export class InvestorRoutes {
  static routes(app: Application): void {
    app
      .route("/investor")
      .post(InvestorController.createInvestor)
      .get(InvestorController.getAllInvestors);

    app
      .route("/investor/:id")
      .get(InvestorController.getInvestorById)
      .put(InvestorController.updateInvestor)
      .delete(InvestorController.deleteInvestor);
  }
}