import HttpClient from './http-client.js'

export default class TideApi extends HttpClient {
  constructor(config) {
    super(config)
  }
  get(path: string) {
    return `${this.siteId} ${path}`
  }
}
