import { Router } from 'express';
import {
  deleteTodoRoute,
  editTodoRoute,
  editTodosOrderRoute,
  getTodosRoute,
  newTodoRoute,
} from './routes/todo-routes';
import {
  buildCreateNewTodo,
  buildDeleteTodo,
  buildEditTodo,
  buildMoveTodo,
  buildTodoList,
} from './builders/builders';

const apiRouter = Router();

apiRouter.get('/', (req, res) => {
  res.json({ message: 'hi from api' });
});

apiRouter.get('/todos', getTodosRoute(buildTodoList()));
apiRouter.post('/todos', newTodoRoute(buildCreateNewTodo()));
apiRouter.put('/todos/:todoId', editTodoRoute(buildEditTodo()));
apiRouter.put('/todos', editTodosOrderRoute(buildMoveTodo()));
apiRouter.delete('/todos/:todoId', deleteTodoRoute(buildDeleteTodo()));

export default apiRouter;
