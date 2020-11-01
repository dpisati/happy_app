import { Router } from 'express';
import multer from 'multer';
import verifyToken from './verifyToken';

import uploadConfig from '../config/upload';
import OrphanagesController from '../controllers/OrphanagesController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/orphanages", OrphanagesController.index);
routes.get("/orphanages/:id", OrphanagesController.show);
routes.put("/orphanages/id/:id", verifyToken, upload.array('images'), OrphanagesController.update);
routes.post("/orphanages", verifyToken, upload.array('images'), OrphanagesController.create);
routes.delete("/orphanages/id/:id", verifyToken, upload.array('images'), OrphanagesController.delete);

routes.get("/orphanages/user/:id", OrphanagesController.user);
routes.get("/orphanages/user/waiting/:id", OrphanagesController.userWaiting);

export default routes;