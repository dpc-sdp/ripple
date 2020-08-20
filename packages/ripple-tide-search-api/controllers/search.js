import TideSearch from '../services/tide-search'
import utils from './../utils'

export default function (config) {
  const tideSearchApi = new TideSearch(config)

  return async function (req, res) {
    try {
      if (req.params.template) {
        const results = await tideSearchApi.searchByTemplate(req.params.template, req.query)
        if (results && !results.error) {
          return res.json(results)
        } else {
          utils.handleError(results.error, res)
        }
      }
      throw new Error('No page requested!')
    } catch (error) {
      utils.handleError(error, res)
    }
  }
}
