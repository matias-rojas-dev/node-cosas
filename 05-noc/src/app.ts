import 'dotenv/config'
import { ServerApp } from './presentation/server'
import { envs } from './config/plugins/envs.plugin'

// IIFE asíncrona (Immediately Invoked Function Expression)
/*
En resumen, este patrón se utiliza para encapsular y ejecutar código asíncrono 
de forma inmediata, permitiendo aprovechar las ventajas de async/await 
en un contexto de ejecución global o de módulo. En este caso, lo que 
hace es llamar inmediatamente a la función main(), que a su vez inicia 
el servidor mediante ServerApp.start().

*/
import { LogModel, MongoDatabase } from './data/mongo'
import { PrismaClient } from '@prisma/client'
;(async () => {
  main()
})()

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  })

  const prisma = new PrismaClient({})

  // const newLog = await prisma.logModel.create({
  //   data: {
  //     level: 'HIGH',
  //     message: 'Test Prisma log',
  //     origin: 'app.ts',
  //   },
  // })

  const logs = await prisma.logModel.findMany({
    where: {
      level: 'MEDIUM',
    },
  })

  console.log(logs)

  ServerApp.start()
  // console.log(envs.PORT)
}
