"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const account_1 = require("../models/account");
const Account = mongoose.model("Account", account_1.AccountSchema);
class AccountController {
    addNewAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newAccount = new Account(req.body);
                const result = yield newAccount.save();
                res.send(result);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    DisplayAccount(req, res) {
        res.json({
            message: "danh sach dang ki"
        });
    }
}
exports.default = new AccountController();
//# sourceMappingURL=controller.js.map