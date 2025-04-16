import { PrismaClient, SeverityLevel } from '@prisma/client'
import { LogDataSource } from '../../domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

const prismaClient = new PrismaClient()

const levelMap = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
}

export class PostgresLogDataSource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await prismaClient.logModel.create({
      data: {
        ...log,
        level: levelMap[log.level],
      },
    })
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const dbLogs = await prismaClient.logModel.findMany({
      where: {
        level: levelMap[severityLevel],
      },
    })

    return dbLogs.map(LogEntity.fromObject)
  }
}
