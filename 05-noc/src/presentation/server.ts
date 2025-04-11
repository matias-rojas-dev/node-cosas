import { envs } from '../config/plugins/envs.plugin'
import { SendEmailLogs } from '../domain/use-cases/email/send-email-log'
import { FileSystemDataSource } from '../infraestructure/datasources/file-system.datasource'
import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository.implementation'
import { EmailService } from './email/email.service'

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
)

const emailService = new EmailService()

export class ServerApp {
  static start(): void {
    console.log(envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY)

    //send email
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute(
    //   'maigrojas@gmail.com'
    // )
  }
}
