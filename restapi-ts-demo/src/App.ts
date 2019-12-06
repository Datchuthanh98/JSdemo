import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/route";
import * as mongoose from "mongoose";

class App {
  public app: express.Application;
  public controller = new Routes();
  public mongoURL = "mongodb://localhost:27017/tsdemo";

  constructor() {
    this.app = express();
    this.config();
    this.controller.routes(this.app);
    this.mongoSetup();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    mongoose.connect(this.mongoURL, { useNewUrlParser: true });
    <any>mongoose.Promise == global.Promise;
    var db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
      console.log("connected to MongoDB");
    });
  }
}

export default new App().app;
