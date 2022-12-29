import { TideImageField, TideUrlField } from '@dpc-sdp/ripple-tide-api/types'
import {
  getBody,
  getLinkFromField,
  getField,
  getImageFromField
} from '@dpc-sdp/ripple-tide-api'

export interface ITidePrimaryCampaign {
  title: string
  summaryHtml: string | null
  cta: TideUrlField
  image: TideImageField
  imageCaption: string | null
}

export const primaryCampaignMapping = (src): ITidePrimaryCampaign | null => {
  if (!src.field_landing_page_c_primary) {
    return null
  }

  const imageCaption = src.field_show_c_primary_caption
    ? getField(
        src,
        'field_landing_page_c_primary.field_block_image.field_media_caption',
        ''
      )
    : null

  return {
    title: getField(src, 'field_landing_page_c_primary.field_block_title', ''),
    summaryHtml: getBody(src?.field_landing_page_c_primary?.body?.processed),
    cta: getLinkFromField(src, 'field_landing_page_c_primary.field_block_cta'),
    image: getImageFromField(
      src,
      'field_landing_page_c_primary.field_block_image.field_media_image'
    ),
    imageCaption
  }
}

export const primaryCampaignIncludes = [
  'field_landing_page_c_primary.field_block_image.field_media_image'
]
