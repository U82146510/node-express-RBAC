import { Router } from "express";
import {authorize} from '../middleware/rbac.ts';
import {auth} from '../middleware/auth.ts';
import {register_user,login_user,get_all_users,delete_a_user} from '../controllers/user_controoler.ts';

export const route:Router = Router();

route.post('/register',register_user);
route.post('/login',login_user);
route.get('/users',auth,authorize('viewUsers'),get_all_users);
route.delete('/users/:id',auth,authorize('deleteUser'),delete_a_user)