import * as bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePasswords = async (
  hashedPassword: string,
  reqPassword: string
) => {
  return await bcrypt.compare(hashedPassword, reqPassword);
};
