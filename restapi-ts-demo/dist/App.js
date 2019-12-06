"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const route_1 = require("./routes/route");
const mongoose = require("mongoose");
class App {
    constructor() {
        this.controller = new route_1.Routes();
        this.mongoURL = "mongodb://localhost:27017/tsdemo";
        this.app = express();
        this.config();
        this.controller.routes(this.app);
        this.mongoSetup();
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    mongoSetup() {
        mongoose.connect(this.mongoURL, { useNewUrlParser: true });
        mongoose.Promise == global.Promise;
        var db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error:"));
        db.once("open", () => {
            console.log("connected to MongoDB");
        });
    }
}
exports.default = new App().app;
//# sourceMappingURL=App.js.map