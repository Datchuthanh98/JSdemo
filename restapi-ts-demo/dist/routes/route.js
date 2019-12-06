"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../controllers/controller");
class Routes {
    routes(app) {
        app.get("/", (req, res) => {
            res.json({
                message: "Home Page"
            });
        });
        app.get("/register", (req, res) => {
            controller_1.default.DisplayAccount;
        });
        app.route("/register").post(controller_1.default.addNewAccount);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=route.js.map