import get from 'lodash.get'

export default {
  default: (head, pageData, siteData, hostName, currentPath) => {
    head.title = pageData.title || ''
    head.titleTemplate = siteData.siteName && '%s | ' + siteData.siteName

    const getUrlPath = (path) => {
      if (path && typeof path === 'string') {
        if (path.startsWith('http')) {
          return path
        }
        if (hostName) {
          return hostName + path
        }
      }
    }
    const getSocialImage = (type) => {
      const image = get(
        pageData,
        ['featuredImage'],
        get(
          pageData,
          ['headerImage', 'src'],
          get(siteData, ['socialImages', type, 'src'])
        )
      )
      if (image) {
        return getUrlPath(image)
      }
    }

    head.meta.push(
      {
        property: 'og:title',
        content: head.title,
        vmid: 'og:title'
      },
      {
        property: 'twitter:title',
        content: head.title,
        vmid: 'twitter:title'
      },
      {
        property: 'og:image',
        content: getSocialImage('og'),
        vmid: 'og:image'
      },
      {
        property: 'twitter:image',
        content: getSocialImage('twitter'),
        vmid: 'twitter:image'
      },
      {
        property: 'twitter:description',
        content: get(pageData, 'summary', get(siteData, 'siteName', siteData.siteName)),
        vmid: 'twitter:description'
      },
      {
        name: 'og:description',
        content: get(pageData, 'summary', get(siteData, 'siteName', siteData.siteName)),
        vmid: 'og:description'
      }
    )
    if (pageData.hasOwnProperty('pageType')) {
      head.meta.push({
        name: 'landing-page-content-type',
        content: pageData.pageType,
        vmid: 'pageType'
      })
    }
    if (pageData.hasOwnProperty('partnerName')) {
      head.meta.push({
        name: 'partner-name',
        content: pageData.partnerName,
        vmid: 'partnerName'
      })
    }
    if (pageData.hasOwnProperty('metaTagKeywords')) {
      head.meta.push({
        name: 'keywords',
        content: pageData.metaTagKeywords,
        hid: 'keywords'
      })
    }

    head.htmlAttrs = {
      lang: pageData.lang || 'en'
    }
    return head
  },
  event: (head, pageData, siteData) => {
    // if (!head.hasOwnProperty('script')) {
    //   head.script = []
    // }
    // head.script.push({
    //   type: 'application/ld+json',
    //   json: {
    //     '@context': 'http://schema.org/Event',
    //     unsafe: '<p>hello</p>'
    //   }
    // })
    return head
  }
}
