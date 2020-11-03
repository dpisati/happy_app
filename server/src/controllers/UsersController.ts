import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Users from '../models/Users';
import * as Yup from 'yup';
import usersView from '../views/users_view';

import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

interface User {
    name: string;
    email: string;
    password: string;
}

export default {
    async index(req: Request, res: Response) {
        const userRepository = getRepository(Users);

        return res.json(userRepository);
    },

    async show(req: Request, res: Response) {
        const { id } = req.params;
        const userRepository = getRepository(Users);

        const user = await userRepository.findOneOrFail(id);

        return res.json(usersView.render(user));
    },

    async create(req: Request, res: Response) {
        const {
            name,
            email,
            password,
        } = req.body;

        const hashPassword = await bcrypt.hash(password, 10);

        const userRepository = getRepository(Users);

        const data = {
            name,
            email,
            password: hashPassword,
            type: 'user',
            createdAt: new Date()
        };

        const emailInUse = await getRepository(Users)
            .createQueryBuilder("user")
            .where("user.email = :email", { email: email })
            .getOne();

        if(emailInUse) {
            return res.status(500).json({ message: "Email already in use"});
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(4).required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });        
     
        const user = userRepository.create(data as User);
     
        await userRepository.save(user);
       
        return res.status(201).json(usersView.render(user));
    },

    async login(req: Request, res: Response) {
        const {
            email,
            password,
        } = req.body;

        const user = await getRepository(Users)
            .createQueryBuilder("user")
            .where("user.email = :email", { email: email })
            .getOne();
        
        if(user) {
            const match = await bcrypt.compare(password, user.password);
            if(match) {
                const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET as string);
                return res.status(200)
                    .header('auth-token', token)
                    .json({
                            message: "Correct Password", 
                            user: {
                                name: user.name, 
                                id: user.id, 
                                type: user.type, 
                                email: user.email, 
                                token 
                            }});
            }
            return res.status(400).json({message: "Password or email not valid"});
        }
        return res.status(400).json({ message: "Email or password not valid"})
    }
}