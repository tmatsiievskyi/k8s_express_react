import { NextFunction, Request, Response } from "express";
import { SignUpInput } from "../../schemas/auth.schema";
import { getRepository } from "typeorm";
import { User } from "../../entities";
import { HttpException } from "../../utils/response";
import { omit } from "../../utils/omit";
import { hashPassword } from "../../utils/password";
import { generateJwt } from "../../utils/jwt";

export const signUpHandler = async (
  req: Request<{}, {}, SignUpInput>,
  res: Response,
  next: NextFunction
) => {
  const usersRepo = getRepository(User);
  try {
    const userExist = await usersRepo.findOne({
      where: { email: req.body.email },
    });
    if (userExist) {
      const customError = new HttpException(
        400,
        "General",
        "User already exists",
        [`Email '${req.body.email}' already taken`]
      );
      return next(customError);
    }
    try {
      const hashedPassword = await hashPassword(req.body.password);
      const user = new User();
      user.email = req.body.email;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.password = hashedPassword;
      await usersRepo.save(user);

      const token = generateJwt(
        { id: user.id, email: user.email },
        process.env.JWT_KEY
      );

      res.setHeader("Set-Cookie", [
        `access_token=${token}; HttpOnly; Max-Age=100`,
      ]);

      res.customSuccess(
        201,
        "New User has been created",
        omit(["password"], user)
      );
    } catch (error) {
      const customError = new HttpException(
        400,
        "Raw",
        `User '${req.body.email}' can't be created`,
        null,
        error
      );
      return next(customError);
    }
  } catch (error) {
    const customError = new HttpException(400, "Raw", "Error", null, error);
    return next(customError);
  }
};
