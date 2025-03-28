import fs from 'fs'
import { SaveFile } from '../src/domain/use-cases/save-file.use-case'

describe('SaveFileUseCase', () => {
  afterEach(() => {
    fs.rmSync('outputs', { recursive: true, force: true })
    fs.rmSync('custom-outputs', { recursive: true, force: true })
  })

  test('should have file with content', () => {
    const saveFile = new SaveFile()
    const filePath = 'outputs/table.txt'
    const options = {
      fileContent: 'test content',
    }

    const result = saveFile.execute(options)
    const fileExists = fs.existsSync(filePath)
    const fileContent = fs.readFileSync(filePath, 'utf-8')

    expect(result).toBe(true)
    expect(fileExists).toBe(true)
    expect(fileContent).toBe(options.fileContent)

    expect(saveFile).toBeInstanceOf(SaveFile)
  })

  test('should save file with custom values', () => {
    const saveFile = new SaveFile()

    const options = {
      fileContent: 'custom test content',
      fileDestination: 'custom-outputs/file-destination',
      fileName: 'custom-table-name',
    }

    const result = saveFile.execute(options)

    const filePath = `${options.fileDestination}/${options.fileName}.txt`
    const fileExists = fs.existsSync(filePath)
    const fileContent = fs.readFileSync(filePath, 'utf-8')

    expect(result).toBe(true)
    expect(fileExists).toBe(true)
    expect(fileContent).toBe(options.fileContent)
  })
})
