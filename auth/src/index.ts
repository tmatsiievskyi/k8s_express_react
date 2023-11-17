import express, { NextFunction, Request, Response } from "express";
import { json } from "body-parser";
import { authRouter } from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import cookieParser from "cookie-parser";
import { HttpException } from "./global/exceptions/HttpException";
import { NotFoundException } from "./global/exceptions";

const app = express();

app.use(json());
app.use(cookieParser());

app.use(authRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundException(`Route ${req.originalUrl} not exist`));
});

app.use(errorMiddleware);

app.listen(3000, () => console.log("Auth. 3000"));
