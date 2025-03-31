import { ChechService } from '../domain/use-cases/checks/check-service'
import { CronService } from './cron/cron-service'

export class ServerApp {
  static start(): void {
    console.log('Server started')

    CronService.createJob('*/5 * * * * *', () => {
      const url = 'http://localhost:3000'
      new ChechService(
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(url)
    })
  }
}
