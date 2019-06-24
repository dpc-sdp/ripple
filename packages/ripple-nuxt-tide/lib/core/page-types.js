import tideDefaultPageTypes from '../config/tide.page-types'
// TODO: This has been disabled as ~ alias doesn't work - need to work out another way of doing this
// import customPageTypes from '~/tide.page-types'

export const getTemplate = (type) => {
  const defaultConfig = tideDefaultPageTypes.pageTemplates
  // const customConfig = customPageTypes.pageTemplates
  const pageTypes = {...defaultConfig}
  return pageTypes[type]
}
