import { defineAppConfig } from '#imports'
import itemMapping from './mapping/item'

export default defineAppConfig({
  ripple: {
    customInputs: {
      item: {
        id: 'RplFormItem',
        type: 'item',
        formkitDefProps: {
          type: 'input',
          family: 'text',
          props: ['placeholder', 'validationMeta', 'columnClasses', 'pii'],
          forceTypeProp: 'text'
        },
        mapping: itemMapping
      }
    }
  }
})
