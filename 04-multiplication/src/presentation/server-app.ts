import { CreateTable } from '../domain/use-cases/create-table.use-case'
import { SaveFile } from '../domain/use-cases/save-file.use-case'

interface RunOptionsProps {
  base: number
  limit: number
  showTable: boolean
  name: string
  destination: string
}

export class ServerApp {
  static async run({
    base,
    limit,
    showTable,
    name,
    destination,
  }: RunOptionsProps) {
    console.log('Server running ...')

    const table = new CreateTable().execute({ base, limit })

    const wasCreated = new SaveFile().execute({
      fileContent: table,
      fileDestination: destination,
      fileName: name,
    })

    if (showTable) {
      console.log(table)
    }

    console.log(wasCreated ? 'File saved' : 'File not saved')
  }
}
