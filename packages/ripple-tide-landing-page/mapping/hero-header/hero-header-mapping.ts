import {
  getField,
  getLinkFromField,
  getImageFromField
} from '@dpc-sdp/ripple-tide-api'
import type { TideUrlField } from '@dpc-sdp/ripple-tide-api/types'
import { TideHeroHeader } from '@dpc-sdp/nuxt-ripple/types'

// Intro text goes by many names depending on the content type
const getIntroText = (src) => {
  return (
    src.field_news_intro_text ||
    src.field_landing_page_intro_text ||
    src.field_page_intro_text ||
    ''
  )
}

const getHeaderTheme = (src) => {
  if (src.field_landing_page_hero_theme === 'dark') {
    return 'reverse'
  }

  return 'default'
}

export const heroHeaderMapping = (src): TideHeroHeader => {
  return {
    title: src.title,
    summary: getIntroText(src),
    links: {
      title: getField(
        src,
        'field_landing_page_key_journeys.field_paragraph_title',
        ''
      ),
      items: (
        src.field_landing_page_key_journeys?.field_paragraph_links || []
      ).map((link): TideUrlField => {
        return getLinkFromField(link)
      }),
      more: getLinkFromField(src, [
        'field_landing_page_key_journeys',
        'field_paragraph_cta'
      ])
    },
    backgroundImageCaption: getField(
      src,
      'field_landing_page_hero_image.field_media_caption',
      ''
    ),
    theme: getHeaderTheme(src),
    logoImage: getImageFromField(
      src,
      'field_landing_page_hero_logo.field_media_image'
    ),
    backgroundImage: getImageFromField(
      src,
      'field_landing_page_hero_image.field_media_image'
    ),
    cornerTop: getImageFromField(
      src,
      'field_graphical_image.field_media_image'
    ),
    cornerBottom: getImageFromField(
      src,
      'field_bottom_graphical_image.field_media_image'
    ),
    primaryAction: getLinkFromField(src, [
      'field_landing_page_hero_banner',
      'field_paragraph_cta'
    ]),
    secondaryAction: getLinkFromField(src, [
      'field_landing_page_hero_banner',
      'field_paragraph_link_text'
    ]),
    secondaryActionLabel: getField(
      src,
      'field_landing_page_hero_banner.field_paragraph_freetext',
      ''
    )
  }
}

export const heroHeaderIncludes = [
  'field_landing_page_hero_banner',
  'field_landing_page_key_journeys',
  'field_landing_page_hero_logo.field_media_image',
  'field_landing_page_hero_image.field_media_image',
  'field_graphical_image.field_media_image',
  'field_bottom_graphical_image.field_media_image'
]

export default {
  includes: heroHeaderIncludes,
  mapping: heroHeaderMapping,
  contentTypes: ['landing_page']
}
