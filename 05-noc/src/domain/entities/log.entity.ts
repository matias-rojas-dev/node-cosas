export enum LogSeverityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export interface LogEntityProps {
  level: LogSeverityLevel
  message: string
  origin: string
  createdAt?: Date
}

export class LogEntity {
  public level: LogSeverityLevel
  public message: string
  public origin: string
  public createdAt?: Date

  constructor({
    level,
    message,
    origin,
    createdAt = new Date(),
  }: LogEntityProps) {
    this.level = level
    this.message = message
    this.origin = origin
    this.createdAt = createdAt
  }

  static fromJson = (json: string): LogEntity => {
    const { message, level, createdAt, origin } = JSON.parse(json)
    if (!message) throw new Error('Message is required')
    if (!level) throw new Error('Level is required')
    if (!createdAt) throw new Error('CreatedAt is required')
    if (!origin) throw new Error('Origin is required')

    const log = new LogEntity({
      level,
      message,
      origin,
      createdAt,
    })
    return log
  }
}
