import TideSearch from '../services/tide-search'
import utils from './../utils'

export const searchGetController = (config) => {
  const tideSearchApi = new TideSearch(config)
  return async function (req, res) {
    try {
      if (req.params.template) {
        const results = await tideSearchApi.searchByTemplate(req.params.template, req.query)
        if (results && !results.error) {
          return res.json(results)
        } else {
          utils.handleError(results, res)
        }
      }
      throw new Error('No page requested!')
    } catch (error) {
      utils.handleError(error, res)
    }
  }
}

export const searchPostController = (config) => {
  const tideSearchApi = new TideSearch(config)
  return async function (req, res) {
    try {
      if (req && req.body) {
        const results = await tideSearchApi.searchByTemplate(req.params.template, req.body)
        if (results && !results.error) {
          return res.json(results)
        } else {
          utils.handleError(results.error, res)
        }
      }
    } catch (error) {
      utils.handleError(error, res)
    }
  }
}

export default {
  post: searchPostController,
  get: searchGetController
}
