// **********************************************************************
// Explicación sobre Mocks y spyOn en Jest:
//
// Un "mock" es una función simulada que reemplaza el comportamiento real de una función
// durante las pruebas. Esto permite controlar sus salidas, simular errores o simplemente
// evitar efectos secundarios en el código que se está probando.
//
// "jest.spyOn" es una función que crea un "espía" sobre una función existente. Con ello,
// se puede observar cuántas veces se llama, con qué argumentos y, además, modificar su
// comportamiento durante la prueba. A diferencia de un mock completo, con spyOn se puede
// restaurar la implementación original fácilmente, permitiendo un control más granular
// sobre las funciones que se desean espiar o modificar.
// **********************************************************************

import fs from 'fs'
import { SaveFile } from '../src/domain/use-cases/save-file.use-case'

// 'describe' agrupa un conjunto de pruebas relacionadas. Aquí se agrupan todas las pruebas para "SaveFileUseCase"
describe('SaveFileUseCase', () => {
  // 'beforeEach' se ejecuta antes de cada prueba dentro del bloque 'describe'
  beforeEach(() => {
    // 'jest.clearAllMocks()' reinicia el estado de todos los mocks creados por Jest,
    // asegurando que cada prueba comience sin efectos secundarios de otras.
    jest.clearAllMocks()
  })

  // 'afterEach' se ejecuta después de cada prueba dentro del bloque 'describe'
  afterEach(() => {
    // Se elimina el directorio 'outputs' de forma recursiva y forzada para limpiar el entorno después de cada prueba
    fs.rmSync('outputs', { recursive: true, force: true })
    // Se elimina el directorio 'custom-outputs' de forma recursiva y forzada para limpiar el entorno después de cada prueba
    fs.rmSync('custom-outputs', { recursive: true, force: true })
  })

  // Prueba que verifica si se crea un archivo con el contenido esperado
  test('should have file with content', () => {
    const saveFile = new SaveFile()
    const filePath = 'outputs/table.txt'
    const options = {
      fileContent: 'test content',
    }

    const result = saveFile.execute(options)
    const fileExists = fs.existsSync(filePath)
    const fileContent = fs.readFileSync(filePath, 'utf-8')

    // 'expect' se utiliza para hacer una aserción. Se espera que 'result' sea true
    expect(result).toBe(true)
    // Se espera que el archivo exista (fileExists === true)
    expect(fileExists).toBe(true)
    // Se espera que el contenido del archivo sea igual al contenido definido en 'options.fileContent'
    expect(fileContent).toBe(options.fileContent)

    // Se verifica que 'saveFile' es una instancia de la clase SaveFile
    expect(saveFile).toBeInstanceOf(SaveFile)
  })

  // Prueba que verifica la creación de un archivo con valores personalizados
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

    // Se espera que la ejecución retorne true
    expect(result).toBe(true)
    // Se espera que el archivo en la ruta personalizada exista
    expect(fileExists).toBe(true)
    // Se espera que el contenido del archivo sea igual al definido en 'options.fileContent'
    expect(fileContent).toBe(options.fileContent)
  })

  // Prueba que simula un error al crear el directorio y verifica que se retorna false
  test('should return false if directory does not exist', () => {
    const saveFile = new SaveFile()
    const options = {
      fileContent: 'custom test content',
    }

    // 'jest.spyOn' crea un espía sobre la función 'mkdirSync' de 'fs', permitiendo observar su uso
    // y modificar su comportamiento para simular un error.
    const mkdirMock = jest.spyOn(fs, 'mkdirSync')
    // 'mockImplementation' reemplaza la implementación de 'mkdirSync' para que, al llamarla,
    // lance un error con un mensaje personalizado.
    mkdirMock.mockImplementation(() => {
      throw new Error(
        'This is a custom msg from testing: Directory does not exist'
      )
    })

    const result = saveFile.execute(options)

    // Se espera que, debido al error simulado, el resultado sea false
    expect(result).toBe(false)
    // 'mockRestore' restaura la implementación original de 'mkdirSync' para no afectar a otras pruebas
    mkdirMock.mockRestore()
  })

  // Prueba que simula un error al escribir el archivo y verifica que se retorna false
  test('should return false if file does not exist', () => {
    const saveFile = new SaveFile()
    const options = {
      fileContent: 'custom test content',
    }

    // Se crea un espía sobre la función 'writeFileSync' de 'fs'
    const writeFileMock = jest.spyOn(fs, 'writeFileSync')
    // Se modifica la implementación de 'writeFileSync' para simular un error al escribir el archivo,
    // lanzando un error con un mensaje personalizado.
    writeFileMock.mockImplementation(() => {
      throw new Error('This is a custom msg from testing: File does not exist')
    })

    const result = saveFile.execute(options)

    // Se espera que, por el error simulado, la ejecución retorne false
    expect(result).toBe(false)
  })
})
