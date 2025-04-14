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
;(async () => {
  main()
})()

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  })

  // crear una colección
  // const newLog = await LogModel.create({
  //   level: 'high',
  //   message: 'tes t 2 ',
  //   origin: 'app.ts',
  // })

  // await newLog.save()

  const logs = await LogModel.find().sort({ _id: -1 })
  console.log(logs)
  ServerApp.start()
  // console.log(envs.PORT)
}
