import { Router, Request, Response } from 'express';

const apiRouter = Router();

apiRouter.get('/', (req, res) => {
  res.json({ message: 'hi from api' });
});

apiRouter.get('/todos', (req: Request, res: Response) => {});

export default apiRouter;
