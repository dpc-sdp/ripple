import { UDPTransport } from 'udp-transport-winston'
import * as winston from 'winston'

const setupWinston = () => {
  const winstonLogger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'debug',
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      winston.format.json()
    )
  })

  // Format for our console output. Taken from Ripple 1
  const printFormat = winston.format.printf((info: any) => {
    const { timestamp, message, level, label, error, ...rest }: any = info
    const printLabel = label ? `[${label}] ` : ' '
    let log = `${timestamp} ${printLabel}${level} ${message}`

    // Must pass error obj by using `error` meta.
    if (error) {
      log = error.stack ? `${log}\n${error.stack}` : log
    }

    // Also log the error 'cause'
    if (error?.cause) {
      log = error?.cause?.stack
        ? `${log}\nCaused by: ${error?.cause?.stack}`
        : log
    }

    log += ' ' + JSON.stringify(rest)
    return log
  })

  // Add error stack into error meta value.
  const errorPrint = winston.format((info) => {
    if (info.error && info.error instanceof Error) {
      info.error = info.error.stack || info.error.toString()
    }
    return info
  })

  const sumoFormat = winston.format((info) => {
    const LAGOON_PROJECT = process.env.LAGOON_PROJECT || 'project_unset'
    const LAGOON_GIT_SAFE_BRANCH =
      process.env.LAGOON_GIT_SAFE_BRANCH || 'safe_branch_unset'
    info.source_host = LAGOON_PROJECT + '-' + LAGOON_GIT_SAFE_BRANCH
    info.source_category =
      process.env.SUMOLOGIC_CATEGORY || 'sdp/dev/origin/app/ripple'
    return info
  })

  // If we're not in production then **ALSO** log to the `console`
  // with human readable formatting
  if (
    process.env.NODE_ENV !== 'production' ||
    process.env.NUXT_PUBLIC_IS_STATIC === 'true'
  ) {
    const colors = {
      error: 'white redBG',
      warn: 'black yellowBG',
      info: 'black greenBG',
      verbose: 'black cyanBG',
      debug: 'white blueBG',
      silly: 'black magentaBG'
    }
    winston.addColors(colors)

    winstonLogger.add(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format((info) => {
            info.level = ` ${info.level.toUpperCase()} `
            return info
          })(),
          winston.format.colorize(),
          printFormat
        )
      })
    )
  }

  // In production mode, log to sumo instead of console
  if (
    process.env.NODE_ENV === 'production' &&
    process.env.LAGOON_GIT_SAFE_BRANCH
  ) {
    if (!process.env.SUMO_HOST) {
      throw new Error('Missing SUMO_HOST env var, unable to collect logs')
    }

    if (!process.env.SUMO_PORT) {
      throw new Error('Missing SUMO_PORT env var, unable to collect logs')
    }

    const udp = new UDPTransport({
      host: process.env.SUMO_HOST,
      port: parseInt(process.env.SUMO_PORT),
      handleExceptions: true,
      format: winston.format.combine(
        sumoFormat(),
        errorPrint(),
        winston.format.json()
      )
    })
    winstonLogger.add(udp)
  }

  return winstonLogger
}

export interface ILogger {
  info: (message: string, meta?: Record<string, unknown>) => void
  debug: (message: string, meta?: Record<string, unknown>) => void
  error: (message: string, meta?: Record<string, unknown>) => void
  warn: (message: string, meta?: Record<string, unknown>) => void
}

class Logger implements ILogger {
  private winstonLogger

  constructor() {
    this.winstonLogger = setupWinston()
  }

  public info = (message: string, meta?: Record<string, unknown>) => {
    this.winstonLogger.info(message, meta)
  }

  public debug = (message: string, meta?: Record<string, unknown>) => {
    this.winstonLogger.debug(message, meta)
  }

  public error = (message: string, meta?: Record<string, unknown>) => {
    this.winstonLogger.error(message, meta)
  }

  public warn = (message: string, meta?: Record<string, unknown>) => {
    this.winstonLogger.warn(message, meta)
  }
}

let logger: Logger | null = null

// FIXME: This is a workaround for an issue where this file gets run twice
// in the example nuxt app (I think because of the dynamic imports), the
// first time it runs the transports are an empty array and winston crashes.
if (winston.transports.Console) {
  logger = new Logger()
}

export default logger as Logger
