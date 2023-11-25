import { NextFunction, Request, Response } from "express";
import { HttpException } from "../utils/response";
// import { HttpException } from "../global/exceptions/HttpException";

export const errorMiddleware = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(err.HttpStatusCode).json(err.JSON);
};
