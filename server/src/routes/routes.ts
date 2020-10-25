import { Router } from 'express';
import multer from 'multer';
import verifyToken from './verifyToken';

import uploadConfig from '../config/upload';
import OrphanagesController from '../controllers/OrphanagesController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/orphanages", OrphanagesController.index);
routes.get("/orphanages/:id", OrphanagesController.show);
routes.post("/orphanages", verifyToken, upload.array('images'), OrphanagesController.create);

// routes.get("/headers", (req, res) => {
//     return res.json(req.headers);
// });

export default routes;