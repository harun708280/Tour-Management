import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { User } from "./user.model";
import { UserServices } from "./user.service";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserServices.createUserService(req.body)
    res.status(httpStatus.CREATED).json({
      message: "User Created Successfully",
      user,
    });
  } catch (error: any) {
    console.log(error);
    res.status(httpStatus.BAD_REQUEST).json({
      message: `Something Went wrong ${error.message}`,
    });
  }
};
