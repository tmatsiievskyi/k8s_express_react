import { Router } from "express";
import { signUpHandler } from "../controllers/auth/auth.controller";
import { getAllUsers } from "../controllers/user/user.controller";
import { validate } from "../middlewares";
import { signUpSchema } from "../schemas/auth.schema";

const router = Router();

router.post("/signup", validate(signUpSchema), signUpHandler);
router.get("/", getAllUsers);

export { router as authRouter };
