import { createSection } from '@formkit/inputs'

export const rplInputGrid = createSection('rplInputGrid', () => ({
  $cmp: 'RplFormInputGrid',
  props: {
    columnClasses: `$node.props.columnClasses`
  }
}))
