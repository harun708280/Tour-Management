import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import httpStatus from "http-status-codes";
import { User } from "../user/user.model";
import bcryptjs from "bcryptjs";

import jwt from "jsonwebtoken"
import { generateToken } from "../../utils/jwt";
import { envVars } from "../../config/env";


 const credentialLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email Doesnot macth", "");
  }

  const isPasswordMatch = await bcryptjs.compare(
    password as string,
    isUserExist.password as string
  );
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "incorect password", "");
  }
  
//   const {password,...rest}=isUserExist

const jwtPayload= {
    userId:isUserExist._id,
    email:isUserExist.email,
    role:isUserExist.role
}
const accessesToken=generateToken(jwtPayload,envVars.JWT_ACCESS,envVars.JWT_ACCESS_EXPIRE)

  return {
   accessesToken
  }
};


export const AuthService={
credentialLogin,
}