import type { IRplTideModuleMapping } from '@dpc-sdp/ripple-tide-api/types'
import {
  tidePageBaseMapping,
  tidePageBaseIncludes
} from '@dpc-sdp/nuxt-ripple/mapping'

const tideTopicModule: IRplTideModuleMapping = {
  mapping: {
    ...tidePageBaseMapping(),
    type: () => 'topic',
    title: (field) =>
      `${field.type === 'taxonomy_term--tags' ? 'Tags' : 'Topic'} - ${
        field.name
      }`,
    header: {
      title: 'name'
    },
    filter: {
      field: (field) => {
        return field.type === 'taxonomy_term--tags'
          ? 'field_tags_name'
          : 'field_topic_name'
      },
      value: 'name'
    }
  },
  includes: [...tidePageBaseIncludes()]
}

export default tideTopicModule
