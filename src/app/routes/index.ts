import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { AuthRouter } from "../modules/auth/auth.routes";

export const router = Router();

const ModuleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth", route: AuthRouter ,
  }
];

ModuleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
