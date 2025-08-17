import type {
  TidePageBase,
  TideSiteData,
  TideSiteSection
} from '@dpc-sdp/ripple-tide-api/types'

interface PageProps extends TidePageBase {
  meta?: any
  type?: string
}

interface OverrideProps {
  [key: string]: string
}

interface MetaProps {
  tag?: string
  attributes?: {
    name?: string
    property?: string
    rel?: string
    content?: string
  }
}

const metaProperty = (str: string) => {
  const p = str.split(':')
  if (p.length === 1) return str
  return p[0] + p[1].charAt(0).toUpperCase() + p[1].slice(1)
}

/**
 * The og:image attribute should be an absolute URL, but the share image can come to us in many formats.
 * Here we standardize all of them to absolute URLs.
 */
const getAbsoluteImageUrl = (siteURL: string, imgURL: string): string => {
  if (siteURL && imgURL) {
    const url = new URL(imgURL, siteURL)
    return `${siteURL}${url?.pathname}`
  }

  return imgURL
}

export default (props: {
  page: PageProps
  site: TideSiteData
  pageTitle?: string
  siteSection?: TideSiteSection
}) => {
  const { public: config } = useRuntimeConfig()
  const route = useRoute()

  const page = props.page
  const site = props.site

  const pageTitle = computed(() => {
    const titleOfPage = `${props.pageTitle || props.page?.title || ''}`
    const titleOfSite = `${props.site?.name}`
    if (titleOfPage && titleOfSite) {
      return `${titleOfPage} | ${titleOfSite}`
    }
    return titleOfSite
  })

  // Gets the correct absolute canonical/og:url for the current page
  const getAbsoluteUrl = (url: string): string => {
    if (!url || !config.siteUrl || !config.tide?.baseUrl) return url
    // The homepage exists on two URLs so we need to ensure the real homepage takes precedence
    if (route.path === '/' || (page?.nid && page?.nid === site?.homePageId)) {
      return config.siteUrl + '/'
    }
    return url.replace(config.tide.baseUrl, config.siteUrl)
  }

  if (!page) {
    useHead({
      title: pageTitle
    })
  } else {
    // Additional <link>s in head
    const links: any = []
    const additionalMeta = page?.meta?.additional || []
    let canonical = null

    additionalMeta
      .filter((attr: MetaProps) => attr.tag === 'link' && attr.attributes?.rel)
      .forEach((attr: MetaProps) => {
        if (attr.attributes.rel === 'canonical') {
          attr.attributes.href = canonical = getAbsoluteUrl(
            attr.attributes.href
          )
        }

        links.push(attr.attributes)
      })

    // Define basic attributes
    useHead({
      link: links
    })

    // Override API values with metatag
    const metaDescriptions: OverrideProps = {
        ogDescription: '',
        description: ''
      },
      metaOverrides: OverrideProps = {}
    additionalMeta
      .filter(
        (attr: MetaProps) =>
          attr.tag === 'meta' && attr.attributes?.name !== 'title'
      )
      .map((attr: MetaProps) => {
        if (attr.attributes?.name || attr.attributes?.property) {
          // Assert name || property
          const field: string = metaProperty(
            attr.attributes!.name! || attr.attributes!.property!
          )
          if (['ogDescription', 'description'].includes(field)) {
            // Keep description fields in a separate collection
            metaDescriptions[field] = attr.attributes!.content!
          } else {
            metaOverrides[field] = attr.attributes!.content!
          }
        }
      })

    // Determine unified description
    let description = page.meta?.description

    if (metaDescriptions.ogDescription !== '') {
      description = metaDescriptions.ogDescription
    } else if (metaDescriptions.description !== '') {
      description = metaDescriptions.description
    }

    // Determine images
    let featuredImage = '',
      featuredImageAlt = ''
    if (metaOverrides.ogImage) {
      featuredImage = metaOverrides.ogImage
      featuredImageAlt = metaOverrides.ogImageAlt
    } else if (page.meta?.image) {
      featuredImage = page.meta.image.src
      featuredImageAlt = page.meta.image.alt
    } else if (site.socialImages.og) {
      featuredImage = site.socialImages.og.src
      featuredImageAlt = site.socialImages.og.alt
    }

    let twitterImage = '',
      twitterImageAlt = ''
    if (metaOverrides.ogImage) {
      twitterImage = metaOverrides.ogImage
      twitterImageAlt = metaOverrides.ogImageAlt
    } else if (page.meta?.image) {
      twitterImage = page.meta.image.src
      twitterImageAlt = page.meta.image.alt
    } else if (site.socialImages.twitter) {
      twitterImage = site.socialImages.twitter.src
      twitterImageAlt = site.socialImages.twitter.alt
    } else if (site.socialImages.og) {
      twitterImage = site.socialImages.og.src
      twitterImageAlt = site.socialImages.og.alt
    }

    // Remove ogImage from metaOverrides,
    // it's being set manually and shouldn't be overridden
    delete metaOverrides.ogImage

    // Define SEO meta
    useSeoMeta({
      title: () => pageTitle.value,
      description: () => description,
      ogTitle: props.pageTitle,
      ogDescription: description,
      ogType: 'website',
      ogUrl: canonical,
      ogImage: getAbsoluteImageUrl(config.siteUrl, featuredImage),
      ogImageAlt: featuredImageAlt,
      twitterCard: 'summary',
      twitterTitle: props.pageTitle,
      twitterDescription: description,
      twitterImage: getAbsoluteImageUrl(config.siteUrl, twitterImage),
      twitterImageAlt: twitterImageAlt,
      keywords: page.meta?.keywords,

      // Custom props
      sitesection: props.siteSection ? props.siteSection.name : null,
      'content-type': page.type && page.type.replace('node--', ''),

      // Metatag escape hatch
      ...metaOverrides
    } as any) // overriding default useSeoMeta prop type to add sitesection
  }
}
