import CkanDataStoreApi from './../services/ckan-data-store'
import ApiError from './../utils/api-error'
import logger from './../utils/api-logger'
export default function (config) {
  const ckanDataStoreApi = new CkanDataStoreApi (config)

  return async function (req, res) {
    try {
      if (req.params && req.params.name) {
        if (!config.resources.hasOwnProperty(req.params.name)) {
          throw new ApiError({ message: 'Resource not found', status: 404})
        }
        const data = await ckanDataStoreApi.getByResourceName(req.params.name, req.query)
        if (data) {
          return res.status(200).json(data)
        }
      }
      throw new ApiError({ message: 'Error fetching site data', status: 500})
    } catch (error) {
      if (config.logLevel === 'development') {
        logger.error(error)
      }
      res.status(error.status || 500).json({
        ...error
      })
    }
  }
}
