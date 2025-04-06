import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

interface SendMailOptions {
  to: string | string[]
  subject: string
  htmlBody: string
  attachments?: Attachments[]
}

interface Attachments {
  filename: string
  path: string
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  })

  constructor() {}

  async sendEmail({
    to,
    subject,
    htmlBody,
    attachments,
  }: SendMailOptions): Promise<boolean> {
    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      })

      console.log(sentInformation)

      return true
    } catch (error) {
      return false
    }
  }

  sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = 'Logs del servidor'
    const htmlBody = `
    <h3>LOGS DE SISTEMA - NOC</h3>
    <p>Ver logs adjuntos </p>`

    const attachments: Attachments[] = [
      { filename: 'logs-all.logs', path: './logs/logs-all.log' },
      { filename: 'logs-medium.logs', path: './logs/logs-medium.log' },
      { filename: 'logs-high.logs', path: './logs/logs-high.log' },
    ]

    return this.sendEmail({
      to,
      subject,
      htmlBody,
      attachments,
    })
  }
}
