import { CreateTable } from './../src/domain/use-cases/create-table.use-case'

describe('CreateTableUseCase', () => {
  test('should create table with default values', () => {
    const createTable = new CreateTable()
    const table = createTable.execute({ base: 5, limit: 5 })
    const options = {
      base: 4,
      limit: 4,
    }

    const tableOption = createTable.execute(options)

    expect(createTable).toBeInstanceOf(CreateTable)
    expect(table).toBe(
      '5 x 1 = 5 \n5 x 2 = 10 \n5 x 3 = 15 \n5 x 4 = 20 \n5 x 5 = 25 \n'
    )
    expect(table).toContain('25')
    expect(tableOption).toContain('16')
  })
})
