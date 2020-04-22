const logger = (msg, lvl = 'info') => {
  switch (lvl) {
    case 'error':
      console.error(`ERROR: ${msg}`)
      break
    case 'info':
      console.info(`> ${msg}`)
      break
    default:
      console.log(`> ${msg}`)
      break
  }
}

module.exports = logger
