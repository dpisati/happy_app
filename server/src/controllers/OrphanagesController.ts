import { Request, Response } from 'express';
import { getRepository, getConnection } from 'typeorm';
import Orphanage from '../models/Orphanage';
import Image from '../models/Image';
import orphanageView from '../views/orphanages_view';
import * as Yup from 'yup';

export default {
    async index(req: Request, res: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        return res.json(orphanageView.renderMany(orphanages));
    },

    async show(req: Request, res: Response) {
        const { id } = req.params;
        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return res.json(orphanageView.render(orphanage));
    },

    async create(req: Request, res: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            user_id
        } = req.body;
     
        const orphanagesRepository = getRepository(Orphanage);

        const requestImages = req.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename }
        });

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            user_id,
            open_on_weekends: open_on_weekends === 'true',
            images
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            user_id: Yup.number().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
            }))
        });

        await schema.validate(data, {
            abortEarly: false,
        });
     
        const orphanage = orphanagesRepository.create(data);
     
        await orphanagesRepository.save(orphanage);   
        return res.status(201).json(orphanage);
    },

    async user(req: Request, res: Response) {
        const { id } = req.params;
        
        const userOrphanages = await 
            getRepository(Orphanage)
            .createQueryBuilder("orphanages")
            .where("user_id = :id", { id })
            .getMany();

        return res.json(userOrphanages);
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            user_id
        } = req.body;

        const orphanagesRepository = getRepository(Orphanage);        

        const requestImages = req.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename }
        });

        function removeDateFromString(string: string) {
            return string.substring(14);
        }

        const dan = []

        const testNaming = images.map(image => {
            const newName = removeDateFromString(image.path);
            return dan.push(newName)
        });

        return res.json(testNaming);

 
        

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            user_id,
            open_on_weekends,
            images
        };
        
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            user_id: Yup.number().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
            }))
        });

        await schema.validate(data, {
            abortEarly: false,
        });
                
        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        }).catch((err => {
            console.log(err);
        }));

        if(orphanage) {
            getRepository(Orphanage).merge(orphanage, data);
            const results = await getRepository(Orphanage).save(orphanage);
            return res.json(results);
        }       
    },
}