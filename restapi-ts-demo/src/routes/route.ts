import { Request, Response } from "express";
import AccountController from "../controllers/controller";

export class Routes {
  public routes(app: any): void {
    //Home
    app.get("/", (req: Request, res: Response) => {
      res.json({
        message: "Home Page"
      });
    });

    app.get("/register", (req: Request, res: Response) => {
      AccountController.DisplayAccount;
    });

    app.route("/register").post(AccountController.addNewAccount);
  }
}
