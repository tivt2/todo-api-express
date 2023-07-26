import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app: Express = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200);
  res.json({ message: 'Hi from todo' });
});

export default app;
