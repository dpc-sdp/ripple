import * as winston from 'winston'

const setupWinston = () => {
  const winstonLogger = winston.createLogger({
    level: 'info',
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

    log += ' ' + JSON.stringify(rest)
    return log
  })

  // If we're not in production then **ALSO** log to the `console`
  // with human readable formatting
  if (process.env.NODE_ENV !== 'production') {
    console.log(winston.transports)
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

class Logger {
  private winstonLogger

  constructor() {
    this.winstonLogger = setupWinston()
  }

  public info = (message: string, meta?: Record<string, unknown>) => {
    this.winstonLogger.info(message, meta)
  }

  public error = (
    message: string,
    error?: Error,
    meta?: Record<string, unknown>
  ) => {
    this.winstonLogger.error(message, {
      ...(meta || {}),
      error
    })
  }

  public warn = (
    message: string,
    error?: Error,
    meta?: Record<string, unknown>
  ) => {
    this.winstonLogger.warn(message, {
      ...(meta || {}),
      error
    })
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
