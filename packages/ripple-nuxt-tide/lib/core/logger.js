const { LogstashTransport } = require('winston-logstash-transport')
const { createLogger, format, transports, addColors } = require('winston')

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

if (!process.browser) {
  // Add background color for server console.
  // However the background color is not working in browser console.
  const colors = {
    error: 'black redBG',
    warn: 'black yellowBG',
    info: 'black greenBG',
    verbose: 'black cyanBG',
    debug: 'black blueBG',
    silly: 'black magentaBG'
  }
  addColors(colors)
}

// Format for our console output.
const printFormat = format.printf(info => {
  const { timestamp, message, level, label, error } = info
  const printLabel = label ? `[${label}] ` : ' '
  let log = `${timestamp} ${printLabel}${level} ${message}`
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

// Add lagoon required meta.
const lagoonFormat = format(info => {
  const LAGOON_LOGS_DEFAULT_SAFE_BRANCH = 'safe_branch_unset'
  const LAGOON_LOGS_DEFAULT_LAGOON_PROJECT = 'project_unset'
  const openshiftProject = process.env.LAGOON_PROJECT || LAGOON_LOGS_DEFAULT_LAGOON_PROJECT
  const gitBranch = process.env.LAGOON_GIT_SAFE_BRANCH || LAGOON_LOGS_DEFAULT_SAFE_BRANCH
  const type = [openshiftProject, gitBranch]
  info.type = type.join('-')
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
  transports: [
    new transports.Console({
      format: format.combine(
        format(info => {
          info.level = ` ${info.level.toUpperCase()} `
          return info
        })(),
        format.colorize(),
        printFormat
      )
    })
  ]
})

if (!process.browser) {
  // TODO: We may not need to log to ES for pr branch.
  if (process.env.LAGOON_GIT_SAFE_BRANCH) {
    logger.add(new LogstashTransport({
      host: 'application-logs.lagoon.svc',
      port: 5140,
      handleExceptions: true,
      format: format.combine(
        lagoonFormat(),
        errorPrint(),
        format.json()
      )
    }))
  }
}

// TODO: remove console log in production as we should use kibana to check log.
// if (process.env.NODE_ENV === 'production') {
//   logger.remove(console)
// }

//
// Handle logger errors
// For example, transport to Logstash failed.
//
logger.on('error', (error) => {
  if (process.server) {
    logger.error('Logger has a error:', { error, label: 'Logger' })
  }
})

export default logger
