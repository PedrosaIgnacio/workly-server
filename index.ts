import "reflect-metadata";
import express, { Express } from "express";
import dotenv from "dotenv";
import { useContainer, useExpressServer } from "routing-controllers";
import Container from "typedi";
import path from "path";
import cors from "cors";
import * as MongoDB from "./src/config/mongoose";
import cookieParser from "cookie-parser";

(async () => {
  dotenv.config();

  const app: Express = express();

  const port = process.env.PORT;

  useContainer(Container);
  app.use(cookieParser());
  app.use(express.json());
  app.use(cors());

  MongoDB.initializeMongoose();

  const controllersPath = "./src/controllers/**/*.controller.ts";

  useExpressServer(app, {
    controllers: [path.join(__dirname, controllersPath)],
  });

  app.listen(port, () => {
    console.log(
      `⚡️[Workly] [Server]: Server is running at https://localhost:${port}`
    );
  });
})();
