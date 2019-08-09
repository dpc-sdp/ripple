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

let logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'ripple-tide' },
  handleExceptions: true
})

if (process.server) {
  // logger.add(new transports.File({
  //   filename: 'app-error.log'
  // }))
  console.log('On PR 480.')

  logger.add(new LogstashTransport({
    host: 'application-logs.lagoon.svc',
    port: 5140
  }))
}

// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
if (process.env.NODE_ENV === 'development') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }))
}

if (process.env.NODE_ENV === 'production') {
  logger.configure({
    level: 'info'
  })
}

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
