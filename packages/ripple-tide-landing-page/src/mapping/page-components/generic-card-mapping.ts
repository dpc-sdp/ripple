import {
  getField,
  getImageFromField,
  getLinkFromField
} from '@dpc-sdp/ripple-tide-api'

const getCardTitle = (field) => {
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

const getCardSummary = (field) => {
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

export const genericCardMapping = (field) => {
  return {
    title: getCardTitle(field),
    summary: getCardSummary(field),
    image: getImageFromField(field, 'field_paragraph_link.image'),
    link: getLinkFromField(field, 'field_paragraph_link'),
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
      isGrantOnGoing: getField(
        field,
        ['field_paragraph_link', 'internal_node_fields', 'ongoing'],
        ''
      )
    }
  }
}
