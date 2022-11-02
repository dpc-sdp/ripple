const { LogstashTransport } = require('winston-logstash-transport')
const { SumoLogic } = require('winston-sumologic-transport')
const { createLogger, format, transports, addColors } = require('winston')

// Set up level based on env settings.
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
let logLevel = process.env.LOG_LEVEL || 'info'
if (process.env.TIDE_DEBUG === '1') {
  logLevel = 'debug'
}

// Theming
if (!process.client) {
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

// Create logger transports.
// Create the console transport.
// Format for our console output.
const printFormat = format.printf(info => {
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

// Add error stack into error meta value.
const errorPrint = format(info => {
  if (info.error) {
    info.error = info.error.stack || info.error.toString()
  }
  return info
})

const consoleLog = new transports.Console({
  format: format.combine(
    format(info => {
      info.level = ` ${info.level.toUpperCase()} `
      return info
    })(),
    format.colorize(),
    printFormat
  )
})

// Create our logger
let logger = createLogger({
  level: logLevel,
  format: format.combine(
    format.timestamp(),
    format.splat()
  ),
  defaultMeta: { service: 'ripple-tide' },
  transports: [
    consoleLog
  ]
})

// Use Logstash transport in Lagoon server instead of console
if (process.env.LAGOON_GIT_SAFE_BRANCH && !process.client) {
  // Sumo Logic
  // Sumo Host = LAGOON_PROJECT-LAGOON_GIT_SAFE_BRANCH

  var sumoHost = 'project_unset-safe_branch_unset'
  if (process.env.LAGOON_PROJECT && process.env.LAGOON_GIT_SAFE_BRANCH) {
    sumoHost = process.env.LAGOON_PROJECT + '-' + process.env.LAGOON_GIT_SAFE_BRANCH
  }

  // Sumo Category = SUMOLOGIC_CATEGORY envvar

  var sumoCategory = ''
  if (process.env.SUMOLOGIC_CATEGORY) {
    sumoCategory = process.env.SUMOLOGIC_CATEGORY
  }
  
  var options = {
    url: process.env.SUMOLOGIC_HOST || 'sumologic-otel-collector.sdp-services.svc.cluster.local',
    customSourceHost: sumoHost,
    customSourceCategory: sumoCategory,
  }

  const sumo = new SumoLogic(options)
  
  logger.add(sumo)
  logger.remove(consoleLog)
}

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
