import fs from 'fs'

interface SaveFileOptions {
  fileDestination?: string
  fileContent: string
  fileName?: string
}

export interface SaveFileUseCaseProps {
  execute: (options: SaveFileOptions) => boolean
}

export class SaveFile implements SaveFileUseCaseProps {
  constructor() /**
   * repository: Storage Repository
   */ {}

  execute({
    fileContent,
    fileDestination = 'outputs',
    fileName = 'table',
  }: SaveFileOptions): boolean {
    try {
      fs.mkdirSync(fileDestination, { recursive: true })

      fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
