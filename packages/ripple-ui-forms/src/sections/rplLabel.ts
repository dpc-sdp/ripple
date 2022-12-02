import { createSection } from '@formkit/inputs'

export const rplLabel = createSection('label', () => ({
  $el: 'label',
  if: '$label',
  attrs: {
    for: '$id',
    id: `$id + '__label'`
  }
}))
