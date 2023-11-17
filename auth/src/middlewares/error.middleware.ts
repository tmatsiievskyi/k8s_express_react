import { NextFunction, Request, Response } from "express";
import { HttpException } from "../global/exceptions/HttpException";

export const errorMiddleware = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).send({
    status: err.status,
    message: err.message,
  });
};
