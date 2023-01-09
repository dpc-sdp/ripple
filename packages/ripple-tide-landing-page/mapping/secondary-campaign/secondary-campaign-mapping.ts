import { TideImageField, TideUrlField } from '@dpc-sdp/ripple-tide-api/types'
import {
  getBody,
  getLinkFromField,
  getField,
  getImageFromField
} from '@dpc-sdp/ripple-tide-api'

export interface ITideSecondaryCampaign {
  title: string
  summaryHtml: string | null
  cta: TideUrlField
  image: TideImageField
  imageCaption: string | null
}

export const secondaryCampaignMapping = (
  src
): ITideSecondaryCampaign | null => {
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
  'field_landing_page_c_secondary.field_block_image.field_media_image'
  // 'field_landing_page_c_secondary.field_block_embedded_video'
]
