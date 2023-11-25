import jwt, { JwtPayload } from "jsonwebtoken";
export const generateJwt = (payload: JwtPayload, secret: string) => {
  return jwt.sign(payload, secret, {
    expiresIn: 100,
  });
};
