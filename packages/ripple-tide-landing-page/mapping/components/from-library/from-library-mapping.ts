import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import componentMappings from '../../components'
import { reusableParagraphTypes } from '../../../types'

interface TideFromLibrary {
  id: string | null
  type: string
}

export const fromLibraryMapping = (
  field: { field_reusable_paragraph: { paragraphs: TideFromLibrary } },
  page: any,
  tidePageApi: any
): TideDynamicPageComponent<TideFromLibrary> => {
  const paragraph = field?.field_reusable_paragraph?.paragraphs
  if (paragraph && reusableParagraphTypes.includes(paragraph.type)) {
    return componentMappings[paragraph.type].mapping(
      paragraph,
      page,
      tidePageApi
    )
  }

  console.error(`No mapping found for paragraphs library item ${field?.id}`)
}

export const fromLibraryIncludes = []

export default {
  includes: fromLibraryIncludes,
  mapping: fromLibraryMapping,
  contentTypes: ['landing_page']
}
