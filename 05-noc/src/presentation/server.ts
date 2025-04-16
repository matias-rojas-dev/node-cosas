import { envs } from '../config/plugins/envs.plugin'
import { LogSeverityLevel } from '../domain/entities/log.entity'
import { LogRepository } from '../domain/repository/log.repository'
import { CheckService } from '../domain/use-cases/checks/check-service'
import { SendEmailLogs } from '../domain/use-cases/email/send-email-log'
import { FileSystemDataSource } from '../infraestructure/datasources/file-system.datasource'
import { MongoLogDataSource } from '../infraestructure/datasources/mongo-log.datasource'
import { PostgresLogDataSource } from '../infraestructure/datasources/postgres-log.datasource'
import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository.implementation'
import { CronService } from './cron/cron-service'
import { EmailService } from './email/email.service'

const logRepository = new LogRepositoryImpl(
  // new FileSystemDataSource()
  // new MongoLogDataSource()
  new PostgresLogDataSource()
)

const emailService = new EmailService()

export class ServerApp {
  static async start(): Promise<void> {
    const logs = await logRepository.getLogs(LogSeverityLevel.MEDIUM)
    console.log(logs)
    CronService.createJob('*/5 * * * * *', () => {
      const url = 'https://google.com'
      new CheckService(
        logRepository,
        () => console.log(`${url} is ok`), // () => {},
        (error) => console.log(error) // () => {}
      ).execute(url)
    })
  }
}
