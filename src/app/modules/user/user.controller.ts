import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";

import { UserServices } from "./user.service";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUserService(req.body);
    
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Create Successfully",
      data: user,
    });
  }
);

export const getAllUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserServices.getAllUser();
     sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User get Successfully",
      meta:users.meta,
      data: users.data,
      
    });
  }
);
