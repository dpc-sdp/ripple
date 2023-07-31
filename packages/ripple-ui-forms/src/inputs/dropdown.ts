import { FormKitTypeDefinition } from '@formkit/core'
import { createRplFormInput, inputLibrary, rplFeatures } from './input-utils'

/**
 * Input definition for a checkbox(ess).
 * @public
 */
export const dropdown: FormKitTypeDefinition = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: createRplFormInput({
    $cmp: 'RplFormDropdown',
    props: {
      multiple: '$node.props.multiple',
      id: `$id`,
      label: '$label',
      labelId: `$id + '__label'`,
      'aria-describedby': '$fns.getAriaDescribedBy()',
      name: '$node.name',
      disabled: '$node.context.disabled',
      placeholder: '$node.props.placeholder',
      value: '$_value',
      onChange: '$node.input',
      options: '$node.props.options',
      validationMeta: '$node.props.validationMeta',
      required: '$fns.isFieldRequired()',
      invalid: '$fns.isFieldInvalid()',
      columnClasses: '$node.props.columnClasses'
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
  props: ['placeholder', 'multiple', 'options', 'columnClasses'],
  /**
   * Additional features that should be added to your input
   */
  features: rplFeatures
}
