import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { AuthService } from "./auth.service";
import AppError from "../../errorHelpers/AppError";
import { setAuthCookie } from "../../utils/setcookie";

export const credentialLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthService.credentialLogin(req.body);

    // res.cookie("accessToken", loginInfo.refreshToken, {
    //   httpOnly: true,
    //   secure: false,
    // });
    // res.cookie("refreshToken", loginInfo.refreshToken, {
    //   httpOnly: true,
    //   secure: false,
    // });

    setAuthCookie(res, loginInfo);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Login Successfully",
      data: loginInfo,
    });
  }
);
export const getNewAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new AppError(httpStatus.BAD_REQUEST, "Not Refresh token", "");
    }
    const tokenInfo = await AuthService.getNewAccessToken(
      refreshToken as string
    );

    setAuthCookie(res, tokenInfo);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Login Successfully",
      data: tokenInfo,
    });
  }
);
export const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken",{
      httpOnly:true,
      secure:false,
      sameSite:"lax"
    })
    res.clearCookie("refreshToken",{
      httpOnly:true,
      secure:false,
      sameSite:"lax"
    })
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Logout Successfully",
      data: null,
    });
  }
);
export const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken=req.user

    const oldPassword=req.body.oldPassword
    const newPassword=req.body.newPassword
    const UpdatedPassword=await AuthService.resetPassword(oldPassword,newPassword,decodedToken)
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Reset Password Successfully",
      data: null,
    });
  }
);
