import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

export const checkAuth =
  (...authRoles:string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessesToken=req.headers.authorization
        if (!accessesToken) {
            throw new AppError(403,'No token','')
        }
        const varifyToken=verifyToken(accessesToken,envVars.JWT_ACCESS) as JwtPayload
        console.log(varifyToken);
        if (!authRoles.includes(varifyToken.role)) {
           throw new AppError(403,'Not Parmit This rolls','') 
        }
        next()
    } catch (error) {
      next(error);
    }
  };
