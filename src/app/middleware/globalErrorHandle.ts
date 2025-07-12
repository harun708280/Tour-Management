import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";

export const  globalErrorHandler=(err:any,req:Request,res:Response,next:NextFunction)=>{
    let statuscode=500
    let message=`Something went Wrong ${err.message} from global error`
    if (err instanceof AppError) {
        statuscode=err.statusCode
        message=err.message
    }else if (err instanceof Error){
        statuscode = 500;
        message=err.message
    }
    
    res.status(500).json({
        success:false,
        message,
        err,
        stack:envVars.NODE_ENV==='development'?err.stack:null
    })
}