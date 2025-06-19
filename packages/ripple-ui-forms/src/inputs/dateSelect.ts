import type { FormKitTypeDefinition } from '@formkit/core'
import { createRplFormInput, inputLibrary, rplFeatures } from './input-utils'

/**
 * Input definition for Ripple text input.
 * @public
 */
export const dateSelect: FormKitTypeDefinition = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: createRplFormInput(() => ({
    $cmp: 'RplFormDateSelect',
    props: {
      id: `$id`,
      name: '$node.name',
      label: '$label',
      value: '$_value',
      onChange: '$node.input',
      dateFormat: '$node.props.dateFormat',
      disabled: '$node.context.disabled',
      invalid: '$fns.isFieldInvalid()',
      required: '$fns.isFieldRequired()',
      pii: '$node.props.pii',
      'aria-describedby': '$fns.getAriaDescribedBy()'
    }
  })),
  library: inputLibrary,
  /**
   * The type of node, can be a list, group, or input.
   */
  type: 'input',
  /**
   * The family of inputs this one belongs too. For example "text" and "email"
   * are both part of the "text" family. This is primary used for styling.
   */
  family: 'text',
  /**
   * An array of extra props to accept for this input.
   */
  props: [
    'min',
    'max',
    'validationMeta',
    'columnClasses',
    'dateFormat',
    'range',
    'sublabel',
    'pii'
  ],
  /**
   * Forces node.props.type to be this explicit value.
   */
  forceTypeProp: 'date',
  /**
   * Additional features that should be added to your input
   */
  features: rplFeatures
}
