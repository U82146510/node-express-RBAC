import express,{type Application} from 'express';
import cors from 'cors';
import {connect_to_mongodb} from './config/connect_to_mongodb.ts';
import { route } from './routes/user_routes.ts';
import {error_handler} from './error/error_handler.ts';

const app:Application = express();
const port:number = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use('/',route);

app.use(error_handler);

const start = async()=>{
  try {
    await connect_to_mongodb();
    app.listen(3000,()=>console.log("on"));
  } catch (error) {
    console.error(error);
    process.exit(1);    
  }
};

start();