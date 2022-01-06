import headMetaMapping from './head-meta.mapping'

export const getpageHead = (pageData, siteData, currentUrl) => {
  let head = {
    meta: []
  }

  if (pageData && pageData.type && siteData && currentUrl) {
    if (headMetaMapping.hasOwnProperty('default')) {
      head = headMetaMapping.default(head, pageData, siteData, currentUrl)
    }

    if (headMetaMapping.hasOwnProperty(pageData.type)) {
      head = headMetaMapping[pageData.type](
        head,
        pageData,
        siteData,
        currentUrl
      )
    }
  }
  return head
}
