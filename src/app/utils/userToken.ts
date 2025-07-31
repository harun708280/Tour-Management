import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { IsActive, IUser } from "../modules/user/user.interface";
import { generateToken, verifyToken } from "./jwt";
import { User } from "../modules/user/user.model";
import AppError from "../errorHelpers/AppError";
import httpStatus from "http-status-codes";

export const createUserToken = (user: Partial<IUser>) => {
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };
  const accessesToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS,
    envVars.JWT_ACCESS_EXPIRE
  );

  const refreshToken = generateToken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXPIRE
  );

  return { accessesToken, refreshToken };
};


export const accessesTokenWithRefreshToken = async (refreshToken: string): Promise<string> => {
  const decoded = verifyToken(refreshToken, envVars.JWT_REFRESH_SECRET) as JwtPayload;
  if (!decoded) throw new Error("Invalid refresh token");

  const accessToken = generateToken(
    {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    },
    envVars.JWT_ACCESS,
    envVars.JWT_ACCESS_EXPIRE
  );

  return accessToken;
};

