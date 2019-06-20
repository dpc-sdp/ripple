import { elasticApi, elasticClient } from './services/elasticsearch/elasticsearch'
// The concept here is to provide a handler/service that acts as
// a way to abstract the API calls.
// The service handler needs to provide implementations of get etc.
export default ({
  getClient: async function (config) {
    let client = ''
    switch (config.service) {
      case 'elasticsearch':
        client = await elasticClient(config)
    }
    return client
  },
  api: elasticApi
})
