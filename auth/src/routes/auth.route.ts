import express from "express";
import { signUpHandler } from "../controllers/auth.controller";
import { validate } from "../middlewares";
import { signUpSchema } from "../schemas/auth.schema";

const router = express.Router();

router.post("/api/auth/signup", validate(signUpSchema), signUpHandler);

export { router as authRouter };
