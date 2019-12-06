import * as mongoose from "mongoose";
import { AccountSchema } from "../models/account";
import { Request, Response } from "express";

const Account = mongoose.model("Account", AccountSchema);

class AccountController {
  public async addNewAccount(req: Request, res: Response) {
    try {
      const newAccount = new Account(req.body);
      const result = await newAccount.save();
      res.send(result);
    } catch (err) {
      console.log(err);
    }
  }

  public DisplayAccount(req: Request, res: Response) {
    res.json({
      message: "danh sach dang ki"
    });
  }
}
export default new AccountController();
