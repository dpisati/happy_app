import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import verifyToken from './verifyToken';

const authRoutes = Router();

authRoutes.post("/login", UsersController.login);
authRoutes.post("/register", UsersController.create);

// authRoutes.get("/test", verifyToken, (req, res) => {
//     return res.json({ message: "Test success", user: req.user });
// });

export default authRoutes;