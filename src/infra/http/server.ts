import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authorization } from './middleware/authorization';
import { refreshrization } from './middleware/refreshrization';
import { loginRoute, registerRoute } from './routes/auth-route';
import { refreshRoute } from './routes/refresh-route';
import apiRouter from './api-router';
import {
  buildAccessManager,
  buildLoginUser,
  buildRefreshManager,
  buildRefreshRepository,
  buildRefreshStorage,
  buildRegisterNewUser,
  buildUserInputValidator,
} from './builders/builders';

import connectMongoDB from '../db/mongo/db';
connectMongoDB();

const app: Express = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.status(200);
  res.json({ message: 'Hi from todo' });
});

app.post('/login', loginRoute(buildUserInputValidator(), buildLoginUser()));
app.post(
  '/register',
  registerRoute(buildUserInputValidator(), buildRegisterNewUser()),
);

app.get(
  '/refresh',
  refreshrization(buildRefreshManager()),
  refreshRoute(
    buildRefreshRepository(),
    buildRefreshManager(),
    buildAccessManager(),
    buildRefreshStorage(),
  ),
);

app.use('/api', authorization(buildAccessManager()), apiRouter);

export default app;
