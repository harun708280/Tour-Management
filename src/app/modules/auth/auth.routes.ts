import { Router } from "express";
import { credentialLogin } from "./auth.controlller";

const router=Router()

router.post('/login',credentialLogin)

export const AuthRouter=router