import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { loginRoute, registerRoute } from './routes/auth-route';
import { UserInputValidator } from '../utils/user-input-validator';
import connectMongoDB from '../db/mongo/db';

const app: Express = express();

connectMongoDB();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200);
  res.json({ message: 'Hi from todo' });
});

const userInputValidator = new UserInputValidator();
app.post('/login', loginRoute(userInputValidator));
app.post('/register', registerRoute(userInputValidator));

export default app;
