import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import componentMappings from '../../components'

export interface ITideFromLibrary {
  id: string | null
}

export const fromLibraryMapping = async (
  field,
  page,
  tidePageApi
): TideDynamicPageComponent<ITideFromLibrary> => {
  const paragraph = field?.field_reusable_paragraph?.paragraphs;
  if (paragraph) {
    return componentMappings[paragraph.type].mapping(paragraph, page, tidePageApi)
  }

  console.error(`No mapping found for paragraphs library item ${id}`)
}

export const fromLibraryIncludes = [
  'field_landing_page_component.field_reusable_paragraph.paragraphs'
]

export default {
  includes: fromLibraryIncludes,
  mapping: fromLibraryMapping,
  contentTypes: ['landing_page']
}
