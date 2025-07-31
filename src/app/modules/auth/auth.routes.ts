import { Router } from "express";
import { credentialLogin, getNewAccessToken, logout, resetPassword } from "./auth.controlller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";

const router=Router()

router.post('/login',credentialLogin)
router.post("/refresh-token",getNewAccessToken)
router.post("/logout",logout)
router.post("/reset-password",checkAuth(...Object.values(Role)),resetPassword)

export const AuthRouter=router