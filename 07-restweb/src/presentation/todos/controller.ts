import { Request, Response } from 'express'

const todos = [
  { id: 1, title: 'Todo 1', completed: false, createdAt: new Date() },
  { id: 2, title: 'Todo 2', completed: true, createdAt: new Date() },
  { id: 3, title: 'Todo 3', completed: false, createdAt: new Date() },
]

export class TodosController {
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.json(todos)
  }

  public getTodoById = (req: Request, res: Response) => {
    const { id } = req.params

    const todo = todos.find((todo) => todo.id === +id)

    todo ? res.json(todo) : res.status(404).json({ message: 'Todo not found' })
  }

  public createTodo = (req: Request, res: Response) => {
    const { title } = req.body

    if (!title) {
      res.status(400).json({ message: 'Title is required' })
    }

    const newTodo = {
      id: todos.length + 1,
      title,
      completed: false,
      createdAt: new Date(),
    }

    todos.push(newTodo)
    res.status(201).json(newTodo)
  }

  public updateTodo = (req: Request, res: Response) => {
    const { id } = req.params

    const todoUpdate = todos.find((todo) => todo.id === +id)
    if (!todoUpdate) {
      res.status(404).json({ message: 'Todo not found' })
      return
    }

    const { title, completed } = req.body

    if (title) {
      todoUpdate.title = title
    }

    if (completed !== undefined) {
      todoUpdate.completed = completed
    }

    todoUpdate
      ? res.json(todoUpdate)
      : res.status(404).json({ message: 'Todo not found' })
  }

  public deleteTodo = (req: Request, res: Response) => {
    const { id } = req.params

    const todoIndex = todos.findIndex((todo) => todo.id === +id)

    if (todoIndex === -1) {
      res.status(404).json({ message: `Todo with id ${id} not found` })
      return
    }

    todos.splice(todoIndex, 1)
    res.status(204).send()
  }
}
