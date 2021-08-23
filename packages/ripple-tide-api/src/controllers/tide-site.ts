import { Request, Response } from "express";
import TideSite from './../services/tide-site'

/**
 * Site API
 * @route GET /site
 */
export default async (req: Request, res: Response) => {
  const tideSiteApi = new TideSite(req.app.locals.config)

  try {
    if (req.params && req.params.id) {
      const data = await tideSiteApi.getSiteData(`${req.params.id}`)
      if (data) {
        return res.status(200).json(data)
      }
    }
    tideSiteApi.handleError('No id given')
  } catch (error) {
    res.status(error.status || 500).json(error)
  }
}
