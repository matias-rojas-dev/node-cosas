export enum LogSeverityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export class LogEntity {
  public level: LogSeverityLevel
  public message: string
  public createdAt: Date

  constructor(level: LogSeverityLevel, message: string) {
    this.level = level
    this.message = message
    this.createdAt = new Date()
  }

  static fromJson = (json: string): LogEntity => {
    const { message, level, createdAt } = JSON.parse(json)
    if (!message) throw new Error('Message is required')
    if (!level) throw new Error('Level is required')
    if (!createdAt) throw new Error('CreatedAt is required')
    const log = new LogEntity(level, message)
    log.createdAt = new Date(createdAt)
    return log
  }
}
