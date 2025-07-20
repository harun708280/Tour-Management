import AppError from "../../errorHelpers/AppError";
import { IAUTHPROVIDER, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";
const createUserService = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Already exist", "");
  }

  const authProvider: IAUTHPROVIDER = {
    provider: "credentials",
    providerId: email as string,
  };

  const hashPassword = await bcryptjs.hash(password as string, 10);
  console.log(hashPassword);
  const user = await User.create({
    email,
    password: hashPassword,
    auths: [authProvider],
    ...rest,
  });
  return user;
};

const getAllUser = async () => {
  const users = await User.find({});
  const totalUser = await User.countDocuments();
  return {
    data: users,
    meta: {
      total: totalUser,
    },
  };
};

const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  const isUserExit = await User.findById(userId);
  if (!isUserExit) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found", "");
  }
  if (payload.role) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, "Your Are not Authorized", "");
    }
    if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
      throw new AppError(httpStatus.FORBIDDEN, "Your Are not Authorized", "");
    }
  }
  if (payload.isActive || payload.isDeleted || payload.isVerified) {
    if (decodedToken.role === Role.ADMIN || decodedToken.role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, "Your Are not Authorized", "");
    }
  }

  if (payload.password) {
    payload.password = await bcryptjs.hash(payload.password, 10);
  }

  const newUpdateUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return newUpdateUser
};

export const UserServices = {
  createUserService,
  getAllUser,
  updateUser,
};
