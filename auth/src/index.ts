import express, { NextFunction, Request, Response } from "express";
import { json } from "body-parser";
import { appRouter } from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import cookieParser from "cookie-parser";
import { NotFoundException } from "./global/exceptions";
import "reflect-metadata";
import "dotenv/config";
import { dbCreateConnection } from "./config/db";
import "./global/types/express/index";
import cookieSession from "cookie-session";

const app = express();

app.use(json());
app.use(cookieParser());
app.set("trust proxy", true);
// app.use(
//   cookieSession({
//     signed: false,
//     secure: true,
//   })
// );

app.use("/", appRouter);

app.post("*", (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundException(`Route ${req.originalUrl} not exist`));
});

app.use(errorMiddleware);

app.listen(3000, () => console.log("Auth. 3000"));

(async () => {
  await dbCreateConnection();
})();
