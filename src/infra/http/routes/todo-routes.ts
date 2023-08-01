import { Request, Response } from 'express';
import { TodoList } from '../../../application/use-cases/todo-list';
import { CreateNewTodo } from '../../../application/use-cases/create-new-todo';
import { EditTodo } from '../../../application/use-cases/edit-todo';
import { MoveTodo } from '../../../application/use-cases/move-todo';
import { DeleteTodo } from '../../../application/use-cases/delete-todo';

export function getTodosRoute(todoList: TodoList) {
  return async function (req: Request, res: Response) {
    const { userId } = req.body;

    const userWithTodos = await todoList.getList(userId);
    res.status(200);
    res.json({ userWithTodos });
  };
}

export function newTodoRoute(createNewTodo: CreateNewTodo) {
  return async function (req: Request, res: Response) {
    const { userId, content, completed } = req.body;

    const newTodo = await createNewTodo.create(userId, content, completed);
    res.status(200);
    res.json({ newTodo });
  };
}

export function editTodoRoute(editTodo: EditTodo) {
  return async function (req: Request, res: Response) {
    const { todoId } = req.params;
    const { content, completed } = req.body;

    const editedTodo = await editTodo.edit(todoId, content, completed);
    res.status(200);
    res.json({ editedTodo });
  };
}

export function editTodosOrderRoute(moveTodo: MoveTodo) {
  return async function (req: Request, res: Response) {
    const { userId, newOrder } = req.body;

    const newTodosOrder = await moveTodo.move(userId, newOrder);
    res.status(200);
    res.json({ newTodosOrder });
  };
}

export function deleteTodoRoute(deleteTodo: DeleteTodo) {
  return async function (req: Request, res: Response) {
    const { todoId } = req.params;
    const { userId } = req.body;

    const deletedTodo = await deleteTodo.delete(userId, todoId);
    res.status(200);
    res.json({ deletedTodo });
  };
}
