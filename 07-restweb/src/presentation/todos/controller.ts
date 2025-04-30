import { Request, Response } from 'express'
import { prisma } from '../../data/postgres'

export class TodosController {
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany({ orderBy: { id: 'asc' } })
    res.json(todos)
  }

  public getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params

    const todo = await prisma.todo.findUnique({
      where: {
        id: Number(id),
      },
    })

    todo ? res.json(todo) : res.status(404).json({ message: 'Todo not found' })
  }

  public createTodo = async (req: Request, res: Response) => {
    const { text } = req.body

    if (!text) {
      res.status(400).json({ message: 'Title is required' })
    }

    const todo = await prisma.todo.create({
      data: {
        text,
      },
    })

    res.status(201).json(todo)
  }

  public updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params

    const todoUpdate = await prisma.todo.findUnique({
      where: {
        id: Number(id),
      },
    })

    if (!todoUpdate) {
      res.status(404).json({ message: 'Todo not found' })
      return
    }

    const { text, completedAt } = req.body

    if (text) {
      todoUpdate.text = text
    }

    if (completedAt !== undefined) {
      todoUpdate.completedAt = completedAt
    }

    await prisma.todo.update({
      where: {
        id: todoUpdate.id,
      },
      data: {
        text: todoUpdate.text,
        completedAt: todoUpdate.completedAt,
      },
    })

    todoUpdate
      ? res.json(todoUpdate)
      : res.status(404).json({ message: 'Todo not found' })
  }

  public deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params

    const todoDelete = await prisma.todo.findUnique({
      where: {
        id: Number(id),
      },
    })

    if (!todoDelete) {
      res.status(404).json({ message: 'Todo not found' })
      return
    }

    await prisma.todo.delete({
      where: {
        id: Number(id),
      },
    })
    res.status(204).send(todoDelete)
  }
}
