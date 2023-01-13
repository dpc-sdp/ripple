import { createSection } from '@formkit/inputs'

export const rplLegend = createSection('legend', () => ({
  $cmp: 'RplFormLabel',
  if: '$label',
  props: {
    isRequired: `$fns.isFieldRequired()`,
    tag: 'legend'
  }
}))
