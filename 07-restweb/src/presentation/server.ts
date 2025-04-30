import express, { Router } from 'express'
import path from 'path'
import { envs } from '../config/envs'

interface Props {
  port: number
  public_path: string
  file_name: string
  router: Router
}

export class Server {
  private readonly port: number
  private readonly publicPath: string
  private readonly fileName: string
  private readonly router: Router

  private app = express()

  constructor(options: Props) {
    this.port = options.port
    this.publicPath = options.public_path
    this.fileName = options.file_name
    this.router = options.router
  }
  async start() {
    // Pblic folder
    this.app.use(express.static(this.publicPath))

    // routes
    this.app.use(this.router)

    this.app.use((req, res) => {
      res.sendFile(path.join(process.cwd(), this.publicPath, this.fileName))
    })

    this.app.listen(this.port, () => {
      console.log(`Server running on Port ${this.port}`)
    })
  }
}
