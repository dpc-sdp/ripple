import { markRaw } from 'vue'
import { FormKitTypeDefinition } from '@formkit/core'
import {
  outer,
  inner,
  wrapper,
  label,
  help,
  messages,
  message,
  prefix,
  suffix,
  icon,
  options,
  selects,
  defaultIcon,
  createSection
} from '@formkit/inputs'

import RplFormSelect from './../components/select/select.vue'

/**
 * Input definition for a select.
 * @public
 */
export const select: FormKitTypeDefinition = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(
    wrapper(
      label('$label'),
      help('$help'),
      inner(
        createSection('input', () => ({
          $cmp: 'rplFormSelect',
          class: '$classes.select',
          props: {
            onBlur: '$handlers.blur',
            id: '$id',
            prefixIcon: '$node.props.prefixIcon',
            value: '$node.value',
            disabled: '$node.attrs.disabled',
            options: '$node.context.options',
            test: '$node'
          }
        }))(),
        suffix(),
        icon('suffix')
      )
    ),

    messages(message('$message.value'))
  ),
  library: { rplFormSelect: markRaw(RplFormSelect) },
  /**
   * The type of node, can be a list, group, or input.
   */
  type: 'input',
  /**
   * An array of extra props to accept for this input.
   */
  props: ['options', 'placeholder'],
  /**
   * Forces node.props.type to be this explicit value.
   */
  forceTypeProp: 'select',
  /**
   * Additional features that should be added to your input
   */
  features: [options, selects, defaultIcon('select', 'select')]
}
