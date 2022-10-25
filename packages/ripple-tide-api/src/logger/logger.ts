import * as winston from 'winston'

const setupWinston = () => {
  const winstonLogger = winston.createLogger({
    level: 'debug',
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
  const printFormat = winston.format.printf((info) => {
    const { timestamp, message, level, label, error, ...rest } = info
    const printLabel = label ? `[${label}] ` : ' '
    let log = `${timestamp} ${printLabel}${level} ${message}`
    // Only if there is an error
    // Must pass error obj by using `error` meta.
    if (error) {
      log = error.stack ? `${log}\n${error.stack}` : log
    }

    if (error?.cause) {
      log = error?.cause?.stack
        ? `${log}\nCaused by: ${error?.cause?.stack}`
        : log
    }

    log += ' ' + JSON.stringify(rest)
    return log
  })

  // If we're not in production then **ALSO** log to the `console`
  // with human readable formatting
  if (process.env.NODE_ENV !== 'production') {
    // Add background color for server console.
    // However the background color is not working in browser console.
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
