import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { UserInputValidator } from '../utils/user-input-validator';
import { TokenManager } from '../utils/token-manager';
import { authorization } from './middleware/authorization';
import { refreshrization } from './middleware/refreshrization';
import { loginRoute, registerRoute } from './routes/auth-route';
import { refreshRoute } from './routes/refresh-route';
import connectMongoDB from '../db/mongo/db';
import apiRouter from './api-router';
import { RefreshRepository } from '../db/refresh-repository';

const app: Express = express();

connectMongoDB();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.status(200);
  res.json({ message: 'Hi from todo' });
});

const userInputValidator = new UserInputValidator();
app.post('/login', loginRoute(userInputValidator));
app.post('/register', registerRoute(userInputValidator));

const accessManager = new TokenManager(process.env.JWT_ACCESS_SECRET as string);
const refreshManager = new TokenManager(
  process.env.JWT_REFRESH_SECRET as string,
);
const refreshRepository = new RefreshRepository();
app.get(
  '/refresh',
  refreshrization(refreshManager),
  refreshRoute(refreshRepository, refreshManager, accessManager),
);

app.use('/api', authorization(accessManager), apiRouter);

export default app;
