import { TideImageField } from '@dpc-sdp/ripple-tide-api/types'
import {
  getField,
  getCardImageFromField,
  getImageFromField,
  getLinkFromField
} from '@dpc-sdp/ripple-tide-api'

export interface ITideCardMeta {
  dateStart: string
  dateEnd: string
  topic: string
  contentType: string
  fvRecommendationStatus: string
  inductionYear: string
  isGrantOngoing: boolean
}

export interface ITideCardBase {
  title: string
  summary: string
  image: TideImageField | null
  url: string
  showMetadata: boolean
  metadata: ITideCardMeta
}

const getCardTitle = (field: { [key: string]: any }) => {
  // There are two possible titles to choose from:
  // - one is linked to another drupal node (i.e. an event page)
  // - one is the title of this node, used if there is no linked node
  //
  // Must prioritise displaying the linked title if it exists before the own title

  const linkedTitle = getField(
    field,
    ['field_paragraph_link', 'internal_node_fields', 'title'],
    ''
  )
  const ownTitle = field.field_paragraph_title || ''

  return linkedTitle ? linkedTitle : ownTitle
}

const getCardSummary = (field: { [key: string]: any }) => {
  // There are two possible summaries to choose from:
  // - one is linked to another drupal node (i.e. an event page)
  // - one is the title of this node, used if there is no linked node
  //
  // Must prioritise displaying the linked summary if it exists before the own summary

  const linkedSummary = getField(
    field,
    ['field_paragraph_link', 'internal_node_fields', 'summary'],
    ''
  )
  const ownSummary = field.field_paragraph_summary || ''

  return linkedSummary ? linkedSummary : ownSummary
}

const getCardImage = (field: {}): TideImageField => {
  // There are two possible images to choose from:
  // - one is linked to another drupal node (i.e. an event page)
  // - one is the image of this node, used if there is no linked node
  //
  // Must prioritise displaying the linked image if it exists before the own image
  const linkedImage = getCardImageFromField(field, 'field_paragraph_link.image')
  const ownImage = getImageFromField(
    field,
    'field_paragraph_media.field_media_image'
  )

  return linkedImage ? linkedImage : ownImage
}

const getIsGrantOngoing = (field: {}): boolean => {
  const value = getField(
    field,
    ['field_paragraph_link', 'internal_node_fields', 'ongoing'],
    ''
  )

  // False value comes back as '0' from the backend
  if (value === '0') {
    return false
  }

  return !!value
}

export const genericCardMapping = (field: {}): ITideCardBase => {
  const link = getLinkFromField(field, 'field_paragraph_link')

  return {
    title: getCardTitle(field),
    summary: getCardSummary(field),
    image: getCardImage(field),
    url: link?.url,
    showMetadata: getField(field, 'field_customise', ''),
    metadata: {
      dateStart: getField(
        field,
        ['field_paragraph_link', 'internal_node_fields', 'date', 'value'],
        ''
      ),
      dateEnd: getField(
        field,
        ['field_paragraph_link', 'internal_node_fields', 'date', 'end_value'],
        ''
      ),
      topic: getField(
        field,
        ['field_paragraph_link', 'internal_node_fields', 'topic'],
        ''
      ),
      contentType: getField(
        field,
        ['field_paragraph_link', 'internal_node_fields', 'node_type'],
        ''
      ),
      fvRecommendationStatus: getField(
        field,
        [
          'field_paragraph_link',
          'internal_node_fields',
          'fv_recommendation_status'
        ],
        ''
      ),
      inductionYear: getField(
        field,
        ['field_paragraph_link', 'internal_node_fields', 'induction_year'],
        ''
      ),
      isGrantOngoing: getIsGrantOngoing(field)
    }
  }
}
