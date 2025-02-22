import { type Request,type Response,type NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {User} from '../model/user_model.ts';
import Joi from "joi";
import dotenv from 'dotenv';


dotenv.config();


interface reg_params {
    name:string;
    email:string;
    password:string;
    role:'admin'|'editor'|'user';
}

const register_schema = Joi.object<reg_params>({
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().required().min(6),
    role:Joi.string().valid('admin','editor','user').required()
});

export const register_user = async(req:Request<{},{},reg_params>,res:Response,next:NextFunction):Promise<void>=>{
    const {value,error} = register_schema.validate(req.body);
    if(error){
        res.status(400).json({error:error.message});
        return;
    }
    try {
        const existing_user = await User.findOne({email:value.email});
        if(!existing_user){
            res.status(409).json({message:'user already exists'});
            return;
        }
        const hashed_password = await bcrypt.hash(value.password,10);
        await User.create({name:value.name,email:value.email,password:hashed_password,role:value.role});
        res.status(201).json({message:'Registered successfully'})
    } catch (error) {
        next(error);
    }
};

interface login_params{
    email:string;
    password:string
};

const login_schema = Joi.object<login_params>({
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required()
})



export const login_user = async(req:Request<{},{},login_params>,res:Response,next:NextFunction):Promise<void>=>{
    const {value,error} = login_schema.validate(req.body);
    if(error){
        res.status(400).json({error:error.message});
        return;
    }

    try {
        const user = await User.findOne({email:value.email});
        if(!user){
            res.status(404).json({message:'invalid credentials'});
            return;
        }
        const check_password = await bcrypt.compare(value.password,user.password);
        if(!check_password){
            res.status(403).json({message:'invalid credentials'});
            return;
        }
        const JWT_SECRET = process.env.JWT_SECRET;
        if(!JWT_SECRET){
            throw new Error('jwt missing');
        }

        const token = jwt.sign({id:user.id,role:user.role},JWT_SECRET,{expiresIn:'15m'})
        res.status(200).json({message:'success',token})

    } catch (error) {
        next(error);
    }
};

export const get_all_users = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try {
        const users = await User.find({});
        res.status(200).json({message:users})
    } catch (error) {
        next(error);
    }
};


interface param_user_id{
    id:string;
};

  
const param_user_id_schema = Joi.object<param_user_id>({
    id:Joi.string().hex().length(24).required(),
});


export const delete_a_user = async(req:Request<{id:string}>,res:Response,next:NextFunction):Promise<void>=>{
    const{value,error} = param_user_id_schema.validate(req.params);
    console.log(value);
    try {
        if(error){
            res.status(400).json({error:error.message});
            return;
        }

        const user = await User.findByIdAndDelete(value.id);
        if(!user){
            res.status(404).json({message:'user not found'});
            return;
        }
        res.status(201).json({message:user});
    } catch (error) {
        next(error);
    }
}