import { Router } from "express";
import { getAllUsers } from "../controllers/user/user.controller";

const router = Router();

router.get("/", getAllUsers);

export { router as usersRouter };
