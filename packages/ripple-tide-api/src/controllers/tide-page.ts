import { Request, Response } from "express";
import TidePage from './../services/tide-page'

/**
 * Page API
 * @route GET /page
 */
export default async (req: Request, res: Response) => {
  const runtimeConfig = req.app.locals.config
  const tidePageApi = new TidePage(runtimeConfig)

  try {
    if (!req.query.path) {
      throw new Error('No id given')
    }
    const config = {
      params: {
        site: req.query.site || runtimeConfig.tide.site
      }
    }
    const data = await tidePageApi.getPageByPath(req.query.path, config)
    if (data) {
      return res.status(200).json(data)
    }
  } catch (error) {
    res.status(error.status || 500).json({
      error: true,
      debug: error.debug ? error.debug : undefined,
      message: error.message || 'Error'
    })
  }
}
