import { createSection } from '@formkit/inputs'

export const rplDescription = createSection('description', () => ({
  $cmp: 'RplFormDescription',
  if: '$description',
  props: {
    id: `$id + '__description'`,
    html: '$description'
  }
}))
