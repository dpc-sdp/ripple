import { TideApi } from '@dpc-sdp/ripple-tide-api'

const tideApi = new TideApi({ site: 4 })

export default (req, res) => {
  return `test ${tideApi.get('/test')}`
}
