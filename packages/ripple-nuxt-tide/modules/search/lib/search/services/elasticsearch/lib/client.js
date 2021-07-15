import elasticsearch from 'elasticsearch'

const elastic = function (config) {
  const options = {
    host: config.url,
    log: config.log,
    apiVersion: config.apiVersion
  }

  if (Object.keys(config.auth).length > 0 && (config.auth.username && config.auth.password)) {
    options.httpAuth = config.auth.username + ':' + config.auth.password
  }

  return new elasticsearch.Client(options)
}

export default elastic
