import { Request, Response } from 'express'

export class TodosController {
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.json([
      { id: 1, title: 'Todo 1', completed: false, createdAt: new Date() },
      { id: 2, title: 'Todo 2', completed: true, createdAt: new Date() },
      { id: 3, title: 'Todo 3', completed: false, createdAt: new Date() },
    ])
  }
}
