import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Users from '../models/Users';
import * as Yup from 'yup';
import usersView from '../views/users_view';

import bcrypt from 'bcrypt';

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
            email: Yup.string().required(),
            password: Yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });
     
        const user = userRepository.create(data);
     
        await userRepository.save(user);   

        return res.status(201).json(usersView.render(user));
    }
}