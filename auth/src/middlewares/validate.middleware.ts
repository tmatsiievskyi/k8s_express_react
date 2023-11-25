import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import { HttpException } from "../utils/response";

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      });

      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        // return res.status(400).send({
        //   status: "fail",
        //   message: error.errors,
        // });
        const customError = new HttpException(
          404,
          "Validation",
          "Validation Error",
          null,
          null,
          error.errors
        );
        return next(customError);
      }
      next(error);
    }
  };
