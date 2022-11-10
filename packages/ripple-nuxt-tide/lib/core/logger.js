const { UDPTransport } = require('udp-transport-winston');
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
  const sumoFormat = format(info => {
    const LAGOON_PROJECT = process.env.LAGOON_PROJECT || 'project_unset'
    const LAGOON_GIT_SAFE_BRANCH = process.env.LAGOON_GIT_SAFE_BRANCH || 'safe_branch_unset'
    info.source_host = LAGOON_PROJECT + '-' + LAGOON_GIT_SAFE_BRANCH
    info.source_category = process.env.SUMOLOGIC_CATEGORY || 'sdp/dev/origin/app/ripple'
    return info
  })

  const udp = new UDPTransport({
    host: process.env.SUMO_HOST || 'sumologic-otel-collector.sdp-services.svc.cluster.local',
    port: process.env.SUMO_PORT || '5514',
    handleExceptions: true,
    format: format.combine(
      sumoFormat(),
      errorPrint(),
      format.json()
    )
  })
  logger.add(udp)
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
