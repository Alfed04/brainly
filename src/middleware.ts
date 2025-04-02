import { NextFunction , Request , Response } from "express"
import jwt from 'jsonwebtoken'
import { JWT_PASSWORD } from "./config"

export const userMiddleware = (req:Request,res:Response,next:NextFunction) =>{
    const token = req.headers["token"]
    const decode = jwt.verify(token as string,JWT_PASSWORD)
    // console.log(decode)
    if(decode){
        //@ts-ignore
        req.userId = decode.id
        next()
    }
    else{
        res.status(403).json({
        message: "You are not authenticated"
    })
    }
}