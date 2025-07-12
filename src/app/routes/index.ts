import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";

export const router = Router();

const ModuleRoutes = [{ 
    path: "/user", route: userRoutes ,

}];

ModuleRoutes.forEach((route)=>{
    router.use(route.path,route.route)
})