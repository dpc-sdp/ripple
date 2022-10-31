import { TideImageField } from '@dpc-sdp/ripple-tide-api'
import { TideUrlField } from '@dpc-sdp/ripple-tide-api'
import {
  getBody,
  getLinkFromField,
  getField,
  getImageFromField
} from '@dpc-sdp/ripple-tide-api'

export interface ITideCampaign {
  title: string
  summaryHtml: string | null
  cta: TideUrlField
  image: TideImageField
  imageCaption: string
}

export const secondaryCampaignMapping = (src): ITideCampaign | null => {
  if (!src.field_landing_page_c_secondary) {
    return null
  }

  return {
    title: getField(
      src,
      'field_landing_page_c_secondary.field_block_title',
      ''
    ),
    summaryHtml: getBody(src?.field_landing_page_c_secondary?.body?.processed),
    cta: getLinkFromField(
      src,
      'field_landing_page_c_secondary.field_block_cta'
    ),
    image: getImageFromField(
      src,
      'field_landing_page_c_secondary.field_block_image.field_media_image'
    ),
    imageCaption: getField(
      src,
      'field_landing_page_c_secondary.field_block_image.field_media_caption',
      ''
    )
  }
}

export const secondaryCampaignIncludes = [
  'field_landing_page_c_primary.field_block_image.field_media_image'
]
