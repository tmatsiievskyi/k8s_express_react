import { Router } from "express";

import { authRouter } from "./auth.route";
import { usersRouter } from "./user.route";

const router = Router();

router.use("/api/users", usersRouter);
router.use("/api/auth", authRouter);

export { router as appRouter };
