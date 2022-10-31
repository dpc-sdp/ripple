import {
  getField,
  getLinkFromField,
  getImageFromField
} from '@dpc-sdp/ripple-tide-api'
import type {
  TideImageField,
  TideUrlField
} from '@dpc-sdp/ripple-tide-api/types'

export interface ITideHeroHeader {
  title: string
  introText: string
  links: {
    title: string
    items: TideUrlField[]
    more: TideUrlField
  }
  theme: 'default' | 'reverse' | 'neutral'
  logoImage: TideImageField
  backgroundImage: TideImageField
  cornerTopImage: TideImageField
  cornerBottomImage: TideImageField
  primaryAction: TideUrlField | null
  secondaryAction: TideUrlField | null
  secondaryActionLabel: string
}

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

  // TODO How will 'neutral' theme work?

  return 'default'
}

export const heroHeaderMapping = (src): ITideHeroHeader => {
  return {
    title: src.title,
    introText: getIntroText(src),
    links: {
      title: getField(
        src,
        'field_landing_page_key_journeys.field_paragraph_title',
        ''
      ),
      items: (
        src.field_landing_page_key_journeys?.field_paragraph_links || []
      ).map((link): TideUrlField => {
        return {
          text: link.title,
          url: link.url
        }
      }),
      more: getLinkFromField(src, [
        'field_landing_page_key_journeys',
        'field_paragraph_cta'
      ])
    },
    theme: getHeaderTheme(src),
    logoImage: getImageFromField(
      src,
      'field_landing_page_hero_logo.field_media_image'
    ),
    backgroundImage: getImageFromField(
      src,
      'field_landing_page_hero_image.field_media_image'
    ),
    cornerTopImage: getImageFromField(
      src,
      'field_graphical_image.field_media_image'
    ),
    cornerBottomImage: getImageFromField(
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
