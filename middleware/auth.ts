import jwt from "jsonwebtoken";
import express,{type Response,type Request,type NextFunction} from 'express';
import dotenv from 'dotenv';
dotenv.config();

interface decoded_token {
    id:string;
    role:string;
}


export const auth = (req:Request,res:Response,next:NextFunction):void=>{
    const token = req.headers.authorization?.split(" ")[1];
    console.log(req.headers);
    if(!token){
        res.status(400).json({message:'Unauthorized'});
        return;
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    if(!JWT_SECRET){
        throw new Error('jwt missing');
    } 
    try {
        const decoded = jwt.verify(token,JWT_SECRET) as decoded_token;
        
        req.user = decoded;
        next()
    } catch (error) {
        res.status(401).json({message:'Invalid Token'});        
    }
}