import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const authRoutes = Router();

authRoutes.post("/login", UsersController.login);
authRoutes.post("/register", UsersController.create);

export default authRoutes;