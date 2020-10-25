import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import errorHandler from './errors/handler';

import 'express-async-errors';

import './database/connection';
import routes from './routes/routes';
import authRoutes from './routes/auth';

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use('/api/user', authRoutes);

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use(errorHandler);


app.listen(3333);