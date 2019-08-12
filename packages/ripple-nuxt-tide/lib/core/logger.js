const { LogstashTransport } = require('winston-logstash-transport')
const { createLogger, format, transports } = require('winston')

// The logging levels we are using is winston default.
// https://github.com/winstonjs/winston#logging-levels
// {
//   error: 0,
//   warn: 1,
//   info: 2,
//   verbose: 3,
//   debug: 4,
//   silly: 5
// }

// Format for our console output.
const printFormat = format.printf(info => {
  const { timestamp, level, message, label, error } = info
  const printLabel = label ? `[${label}] ` : ' '
  let log = `${timestamp} ${printLabel}${level}: ${message}`
  // Only if there is an error
  // Must pass error obj by using `error` meta.
  if (error) {
    log = error.stack ? `${log}\n${error.stack}` : log
  }
  return log
})

// Add error stack into error meta value.
const errorPrint = format(info => {
  if (info.error) {
    info.error = info.error.stack || info.error.toString()
  }
  return info
})

let logger = createLogger({
  level: process.env.TIDE_DEBUG === '1' ? 'debug' : 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.splat()
  ),
  defaultMeta: { service: 'ripple-tide' },
  handleExceptions: true,
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        printFormat
      )
    })
  ]
})

if (!process.browser) {
  if (process.env.LOGSTASH_HOST && process.env.LOGSTASH_PORT) {
    logger.add(new LogstashTransport({
      host: process.env.LOGSTASH_HOST,
      port: process.env.LOGSTASH_PORT,
      format: format.combine(
        format.json()
      )
    }))
  }

  logger.add(new transports.File({
    filename: 'app-error.log',
    format: format.combine(
      errorPrint(),
      format.json()
    )
  }))

  // TODO: this will disable all log, need more research.
  // // Catch and log uncaughtException events from our process.
  // // By default, winston will exit after logging an uncaughtException. If this is not the behavior we want, set exitOnError = false.
  // // https://github.com/winstonjs/winston#to-exit-or-not-to-exit
  // logger.configure({
  //   exceptionHandlers: [
  //     new transports.Console()
  //   ]
  // })
}

// TODO: remove console log in production as we should use kibana to check log.
// if (process.env.NODE_ENV === 'production') {
//   logger.remove(console)
// }

//
// Handle logger errors
// For example, transport to Logstash failed.
//
logger.on('error', (err) => {
  if (process.server) {
    console.error('Logger has a error:', err)
  }
})

export default logger
