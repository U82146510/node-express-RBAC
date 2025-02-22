import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


export const connect_to_mongodb = async()=>{
    try {
        const connection_string = process.env.connection_string;
        if(!connection_string){
            throw new Error('connection string missing');
        }
        await mongoose.connect(connection_string)
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

const db:mongoose.Connection = mongoose.connection;

db.on('connected',()=>{
    console.log('Connected to Atlas');
});

db.on('error',(error:unknown)=>{
    console.error('Atlas error:',error);
});

db.on('disconnected',()=>{
    console.log("disconnected from Atlas")
});