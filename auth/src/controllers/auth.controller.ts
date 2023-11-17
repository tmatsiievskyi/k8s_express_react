import { NextFunction, Request, Response } from "express";
import { HttpException } from "../global/exceptions/HttpException";
import { NotFoundException } from "../global/exceptions";
import { SignUpInput } from "../schemas/auth.schema";

export const signUpHandler = (
  req: Request<{}, {}, SignUpInput>,
  res: Response,
  next: NextFunction
) => {
  throw new NotFoundException();
  res.status(201).send("asd");
};
