import { Router } from "express";
import { createUser, getAllUser } from "./user.controller";

const router=Router()
router.post('/register',createUser)
router.get('/all-user',getAllUser)


export const userRoutes=router