import { LogEntity, LogSeverityLevel } from '../../entities/log.entity'
import { LogRepository } from '../../repository/log.repository'

export const ORIGIN_LOG = 'check-service.ts'

interface CheckServiceUseCaseMultiple {
  execute(url: string): Promise<boolean>
}

type SuccessCallback = () => void | undefined
type ErrorCallback = (error: string) => void | undefined

export class CheckServiceMultiple implements CheckServiceUseCaseMultiple {
  constructor(
    private readonly logRepository: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  private callLogsRepository(log: LogEntity) {
    this.logRepository.forEach((logRepository) => {
      logRepository.saveLog(log)
    })
  }

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url)
      if (!req.ok) throw new Error(`Error on check service ${url}`)
      this.successCallback && this.successCallback()

      const log = new LogEntity({
        level: LogSeverityLevel.LOW,
        message: `Service ${url} is ok`,
        origin: ORIGIN_LOG,
      })

      this.callLogsRepository(log)
      return true
    } catch (error) {
      const errorMessage = `Error on check service ${url}`
      const logError = new LogEntity({
        level: LogSeverityLevel.HIGH,
        message: errorMessage,
        origin: ORIGIN_LOG,
      })
      this.callLogsRepository(logError)

      this.errorCallback && this.errorCallback(`Error: ${error}`)
      return false
    }
  }
}
