import { createSection } from '@formkit/inputs'

export const rplHelp = createSection('help', () => ({
  $cmp: 'RplFormHelpText',
  if: '$help',
  props: {
    id: `$id + '__help'`,
    html: '$help'
  }
}))
