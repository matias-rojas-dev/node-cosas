import fs from 'fs'
import { LogDataSource } from '../../domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

export class FileSystemDataSource implements LogDataSource {
  private readonly logPath = 'logs/'
  private readonly allLogsPath = 'logs/logs-all.log'
  private readonly mediumLogsPath = 'logs/logs-medium.log'
  private readonly highLogsPath = 'logs/logs-high.log'

  constructor() {
    this.createLogsFile()
  }

  private createLogsFile = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath)
    }

    ;[this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (!fs.existsSync(path)) {
          fs.writeFileSync(path, '')
        }
      }
    )
  }

  async saveLog(newLog: LogEntity): Promise<void> {
    const logSchedule = `${newLog.level} - ${newLog.message} - ${newLog.createdAt}\n`

    fs.appendFileSync(this.allLogsPath, logSchedule)

    if (newLog.level === LogSeverityLevel.MEDIUM) {
      fs.appendFileSync(this.mediumLogsPath, logSchedule)
      return
    }

    if (newLog.level === LogSeverityLevel.HIGH) {
      fs.appendFileSync(this.highLogsPath, logSchedule)
      return
    }
  }

  getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    throw new Error('Method not implemented.')
  }
}
