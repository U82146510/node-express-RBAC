import {type Document,model,Schema} from "mongoose";

interface IUser extends Document{
    name:string;
    email:string;
    password:string;
    role:'admin'|'editor'|'user';
}

const user_schema = new Schema<IUser>({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:6},
    role:{type:String,enum:['admin','editor','user'],default:'user'}
});

export const User = model<IUser>('User',user_schema);