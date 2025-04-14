import { LogEntity, LogSeverityLevel } from '../../entities/log.entity'
import { LogRepository } from '../../repository/log.repository'

export const ORIGIN_LOG = 'check-service.ts'

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>
}

type SuccessCallback = () => void | undefined
type ErrorCallback = (error: string) => void | undefined

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

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

      this.logRepository.saveLog(log)
      return true
    } catch (error) {
      const errorMessage = `Error on check service ${url}`
      const logError = new LogEntity({
        level: LogSeverityLevel.HIGH,
        message: errorMessage,
        origin: ORIGIN_LOG,
      })
      this.logRepository.saveLog(logError)

      this.errorCallback && this.errorCallback(`Error: ${error}`)
      return false
    }
  }
}
