const tideBanners = async (context, pageData) => {
  const mapping = context.app.$tideMapping

  const hasImageBanner = pageData.tidePage.field_landing_page_hero_image && pageData.tidePage.field_landing_page_hero_image.field_media_image

  // Hero banner Core fields
  let heroBanner = {
    type: 'heroBanner',
    pageTitle: pageData.tidePage.appPageTitle,
    introText: pageData.tidePage.field_news_intro_text || pageData.tidePage.field_landing_page_intro_text || pageData.tidePage.field_page_intro_text || pageData.tidePage.field_profile_intro_text || ''
  }

  // Add hero banner modifier(paragraphs)
  if (pageData.tidePage.field_landing_page_hero_banner) {
    heroBanner = Object.assign(heroBanner, pageData.tidePage.field_landing_page_hero_banner)
  }

  // Additional fields may will be moved into core or modifier
  heroBanner.keyJourneys = pageData.tidePage.field_landing_page_key_journeys || {}
  heroBanner.theme = pageData.tidePage.field_landing_page_hero_theme
  heroBanner.showLinks = !hasImageBanner
  heroBanner.logo = pageData.tidePage.field_landing_page_hero_logo ? pageData.tidePage.field_landing_page_hero_logo.field_media_image.url : null

  if (pageData.tidePage.field_landing_page_hero_image && pageData.tidePage.field_landing_page_hero_image.field_media_image) {
    const mediaImage = pageData.tidePage.field_landing_page_hero_image.field_media_image
    pageData.tidePage.appHeroBgImage = {
      src: mediaImage.url,
      focalPoint: mediaImage.meta.focal_point,
      width: mediaImage.meta.width,
      height: mediaImage.meta.height
    }
  }

  // Add bottom graphic.
  if (!hasImageBanner && !pageData.tidePage.field_landing_page_c_primary) {
    const hasBottomImage = (pageData.tidePage.field_bottom_graphical_image && pageData.tidePage.field_bottom_graphical_image.field_media_image)
    heroBanner.backgroundGraphic = (hasBottomImage) ? pageData.tidePage.field_bottom_graphical_image.field_media_image.url : '/img/header-pattern-bottom.png'
  }

  pageData.tidePage.appHeroBanner = await mapping.get(heroBanner)

  // Store Page Data.
  let imageCaption = null
  if (pageData.tidePage.field_show_hero_image_caption) {
    imageCaption = pageData.tidePage.field_landing_page_hero_image && pageData.tidePage.field_landing_page_hero_image.field_media_caption
  }

  context.store.dispatch('tide/setPageData', { imageCaption })

  // Landing pages
  if (pageData.tidePage.field_landing_page_c_primary) {
    pageData.tidePage.field_landing_page_c_primary.field_show_c_primary_caption = pageData.tidePage.field_show_c_primary_caption
    pageData.tidePage.appCampaignPrimary = await mapping.get(pageData.tidePage.field_landing_page_c_primary)
  }

  if (pageData.tidePage.field_landing_page_c_secondary) {
    const cSecondary = pageData.tidePage.field_landing_page_c_secondary
    cSecondary.type = cSecondary.type + '--field_landing_page_c_secondary'
    pageData.tidePage.appCampaignSecondary = await mapping.get(cSecondary)
  }
}

export default tideBanners
