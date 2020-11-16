import TideSearch from '../services/tide-search'

export const searchController = (config) => {
  const tideSearchApi = new TideSearch(config)
  return async function (req, res) {
    try {
      if (req.params.template) {
        const response = await tideSearchApi.searchByTemplate(req.params.template, req.query, req.headers)
        if (response && !response.error) {
          return res.status(200).json(response)
        } else {
          return res.status(response.status).json(response)
        }
      }
      throw new Error('No template specified')
    } catch (error) {
      res.status(500).json({
        error: true,
        status: 500,
        message: 'Error fetching data',
        debug: error.message
      })
    }
  }
}

export default searchController
