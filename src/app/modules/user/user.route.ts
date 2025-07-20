import { NextFunction, Request, Response, Router } from "express";
import { createUser, getAllUser } from "./user.controller";

import { createUserZodSchema } from "./user.zodValidation";
import { validateRequest } from "../../middleware/validateZod";

import { Role } from "./user.interface";
import { checkAuth } from "../../middleware/checkAuth";

const router = Router();


router.post("/register", validateRequest(createUserZodSchema), createUser);
router.get("/all-user",checkAuth(Role.ADMIN,Role.SUPER_ADMIN), getAllUser);

export const userRoutes = router;
