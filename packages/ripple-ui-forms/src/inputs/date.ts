import { FormKitTypeDefinition } from '@formkit/core'
import { createRplFormGroup, inputLibrary, rplFeatures } from './input-utils'

/**
 * Input definition for a checkbox.
 * @public
 */
export const date: FormKitTypeDefinition = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: createRplFormGroup({
    $cmp: 'RplFormDate',
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
      'aria-describedby': '$fns.getAriaDescribedBy()'
    }
  }),
  library: inputLibrary,
  /**
   * The type of node, can be a list, group, or input.
   */
  type: 'input',
  /**
   * The family of inputs this one belongs too. For example "text" and "email"
   * are both part of the "text" family. This is primary used for styling.
   */
  family: 'box',
  /**
   * An array of extra props to accept for this input.
   */
  props: ['dateFormat'],
  /**
   * Forces node.props.type to be this explicit value.
   */
  forceTypeProp: 'date',
  /**
   * Additional features that should be added to your input
   */
  features: rplFeatures
}
