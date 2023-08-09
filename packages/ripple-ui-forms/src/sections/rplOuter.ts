import { createSection } from '@formkit/inputs'

export const rplOuter = createSection('outer', () => ({
  $cmp: 'FormkitOuter',
  props: {
    key: '$id',
    fieldName: '$node.name'
  }
}))
