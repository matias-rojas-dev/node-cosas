interface CreateTableOptions {
  base: number
  limit: number
}

interface CreateTableUseCaseProps {
  execute: (options: CreateTableOptions) => string
}

export class CreateTable implements CreateTableUseCaseProps {
  constructor() {}

  execute({ base, limit }: CreateTableOptions) {
    let outputMessage = ''
    for (let i = 1; i <= limit; i++) {
      outputMessage += `${base} x ${i} = ${base * i} \n`
    }

    return outputMessage
  }
}
