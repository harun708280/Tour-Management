import AppError from "../../errorHelpers/AppError";
import { IsActive, IUser } from "../user/user.interface";
import httpStatus from "http-status-codes";
import { User } from "../user/user.model";
import bcryptjs from "bcryptjs";


import { accessesTokenWithRefreshToken, createUserToken } from "../../utils/userToken";
import { JwtPayload } from "jsonwebtoken";

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

  // const jwtPayload = {
  //   userId: isUserExist._id,
  //   email: isUserExist.email,
  //   role: isUserExist.role,
  // };
  // const accessesToken = generateToken(
  //   jwtPayload,
  //   envVars.JWT_ACCESS,
  //   envVars.JWT_ACCESS_EXPIRE
  // );

  // const refreshToken = generateToken(
  //   jwtPayload,
  //   envVars.JWT_REFRESH_SECRET,
  //   envVars.JWT_REFRESH_EXPIRE
  // );
  const userToken = createUserToken(isUserExist);
  const { password: pass, ...rest } = isUserExist.toObject();

  return {
    accessesToken: userToken.accessesToken,
    refreshToken: userToken.refreshToken,
    user: rest,
  };
};



const getNewAccessToken = async (refreshToken: string) => {
  const accessToken = await accessesTokenWithRefreshToken(refreshToken as string); 
  return {
    accessToken,
  };
};
const resetPassword = async (oldPassword:string,newPassword:string,decodedToken:JwtPayload) => {
  const user =await User.findOne(decodedToken.userId)

  const isOldPasswordMatch=await bcryptjs.compare(oldPassword,user!.password as string)
  if (!isOldPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED,"Old Password Dont match",'')
  }
  user!.password=await bcryptjs.hash(newPassword,10)
  user!.save()

  return true
};


export const AuthService = {
  credentialLogin,
  getNewAccessToken,
  resetPassword
};
