import {type Request,type Response,type NextFunction } from "express";
export const error_handler = (err:unknown,req:Request,res:Response,next:NextFunction)=>{
    if(err instanceof Error){
        console.log(err.stack)
        res.status(500).json({error:err.message});
    }
    res.status(500).json({message:'Internal server error'})

}