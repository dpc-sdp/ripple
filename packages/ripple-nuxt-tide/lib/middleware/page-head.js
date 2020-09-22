import { getPageHeadConfig } from '@dpc-sdp/ripple-nuxt-tide/lib/core/tide-helper.js'

const tidePageHead = (context, pageData) => {
  // Add Page meta tags
  if (pageData.tidePage) {
    if (pageData.tidePage.type === 'media--embedded_video') {
      // Media entity has different fields, we set it in its own module.
      return
    }

    // Set details.
    const title = pageData.tidePage.appMetatag.title || pageData.tidePage.appPageTitle || ''
    const description = pageData.tidePage.appMetatag.description || pageData.tidePage.field_news_intro_text || pageData.tidePage.field_landing_page_intro_text || pageData.tidePage.field_page_intro_text || pageData.tidePage.field_landing_page_summary || ''
    const url = context.store.state.tide.currentUrl || ''
    const siteSection = pageData.tidePage.section && pageData.tidePage.field_node_site && pageData.tidePage.field_node_site.find(site => site.drupal_internal__tid === parseInt(pageData.tidePage.section, 10))

    // Set image.
    const featuredImage = pageData.tidePage.field_featured_image ? pageData.tidePage.field_featured_image.field_media_image : null
    const sectionImage = siteSection && siteSection.field_site_og_image ? siteSection.field_site_og_image.field_media_image : null
    const twitterImage = siteSection && siteSection.field_site_twitter_image ? siteSection.field_site_twitter_image.field_media_image : null
    const primaryImage = pageData.tidePage.field_node_primary_site && pageData.tidePage.field_node_primary_site.field_site_og_image ? pageData.tidePage.field_node_primary_site.field_site_og_image.field_media_image : null
    const mediaImage = (featuredImage || sectionImage || primaryImage || null)
    const mediaTwitterImage = (twitterImage || mediaImage || null)
    const image = mediaImage ? mediaImage.url : `${context.store.state.tide.protocol + '//' + context.store.state.tide.host}/img/social-media-image.jpg`
    const imageAlt = mediaImage ? mediaImage.meta.alt : ''
    const imageTwitter = mediaTwitterImage ? mediaTwitterImage.url : `${context.store.state.tide.protocol + '//' + context.store.state.tide.host}/img/social-media-image.jpg`
    const imageTwitterAlt = mediaTwitterImage ? mediaTwitterImage.meta.alt : ''

    // Set robots
    const robotsMeta = pageData.tidePage.appMetatag.robots ? pageData.tidePage.appMetatag.robots : ''
    const headData = {
      langcode: pageData.tidePage.appMetatag.lang || pageData.tidePage.langcode || 'en',
      title,
      description,
      url,
      siteSectionName: siteSection ? siteSection.name : '',
      image,
      imageAlt,
      imageTwitter,
      imageTwitterAlt,
      pageType: pageData.tidePage.type,
      robotsMeta
    }

    context.store.dispatch('tide/setPageHead', getPageHeadConfig(headData))
  }
}

export default tidePageHead
