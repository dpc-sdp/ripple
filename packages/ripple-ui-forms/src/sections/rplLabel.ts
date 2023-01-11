import { createSection } from '@formkit/inputs'

export const rplLabel = createSection('label', () => ({
  $cmp: 'RplFormLabel',
  if: '$label',
  props: {
    for: '$id',
    id: `$id + '__label'`,
    isRequired: `$fns.isFieldRequired()`,
    tag: 'label'
  }
}))
