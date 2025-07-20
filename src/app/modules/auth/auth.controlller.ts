import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus  from 'http-status-codes';
import { AuthService } from "./auth.service";

export const credentialLogin=catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo=await AuthService.credentialLogin(req.body)
    
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Login Successfully",
      data: loginInfo,
    });
  }
);

