import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../../entities";
import { HttpException } from "../../utils/response";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const usersRepo = getRepository(User);
  try {
    const users = await usersRepo.find();
    res.customSuccess(200, "List of Users", users);
  } catch (error) {
    const customError = new HttpException(
      400,
      "Raw",
      `Can't retrieve list of users.`,
      null,
      error
    );
    return next(customError);
  }
};
