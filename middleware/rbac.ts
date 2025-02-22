import { type Request,type Response,type NextFunction } from "express";

const roles = {
    admin:['createUser', 'deleteUser', 'updateUser', 'viewUsers'],
    editor:['updateUser', 'viewUsers'],
    user:['viewUsers'],
};

const check_permisions = (role:string,action:string):boolean=>{
     return roles[role]?.includes(action)
};

export const authorize = (action:string)=>{
    return (req:Request,res:Response,next:NextFunction)=>{

        if(!req.user||!check_permisions(req.user.role,action)){
            res.status(403).json({message:'Forbidden: Insufficient permissions'})
            return;
        }
        next();
    }
}