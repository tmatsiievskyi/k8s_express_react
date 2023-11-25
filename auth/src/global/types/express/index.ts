import { NotFoundException } from "../../exceptions/NotFoundException";

declare global {
  namespace Express {
    // export interface Request {
    //   jwtPayload: JwtPayload;
    //   language: Language;
    // }
    export interface Response {
      customSuccess(
        httpStatusCode: number,
        message: string,
        data?: any
      ): Response;
    }
  }
}
