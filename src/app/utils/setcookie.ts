import { Response } from "express";
export interface AuthToken {
  accessesToken?: string;
  refreshToken?: string;
   accessToken?: string;
}
export const setAuthCookie = (res: Response, tokenInfo: AuthToken) => {
  if (tokenInfo.accessesToken) {
    res.cookie("accessToken", tokenInfo.accessesToken, {
      httpOnly: true,
      secure: false,
    });
  }
  if (tokenInfo.refreshToken) {
    res.cookie("refreshToken", tokenInfo.refreshToken, {
      httpOnly: true,
      secure: false,
    });
  }
};
