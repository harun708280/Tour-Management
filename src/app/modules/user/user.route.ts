import { NextFunction, Request, Response, Router } from "express";
import { createUser, getAllUser } from "./user.controller";
import { ZodObject } from "zod";
import { createUserZodSchema } from "./user.zodValidation";
import { validateRequest } from "../../middleware/validateZod";


const router = Router();
router.post("/register",validateRequest(createUserZodSchema), createUser);
router.get("/all-user", getAllUser);

export const userRoutes = router;
