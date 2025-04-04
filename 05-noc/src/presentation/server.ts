import { ChechService } from '../domain/use-cases/checks/check-service'
import { FileSystemDataSource } from '../infraestructure/datasources/file-system.datasource'
import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository.implementation'
import { CronService } from './cron/cron-service'

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
)

export class ServerApp {
  static start(): void {
    console.log('Server started')

    CronService.createJob('*/5 * * * * *', () => {
      const url = 'https://google.com'
      new ChechService(
        fileSystemLogRepository,
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(url)
    })
  }
}
