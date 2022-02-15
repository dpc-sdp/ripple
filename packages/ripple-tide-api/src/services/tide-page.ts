import TideApi from './tide-api.js'

export default class TidePageApi extends TideApi {
  constructor(config) {
    super(config)
  }
  get(path: string) {
    return `${this.siteId} ${path}`
  }
}
