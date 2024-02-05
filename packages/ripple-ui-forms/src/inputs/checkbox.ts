import { FormKitTypeDefinition } from '@formkit/core'
import { createRplFormGroup, inputLibrary, rplFeatures } from './input-utils'

/**
 * Input definition for a checkbox.
 * @public
 */
export const checkbox: FormKitTypeDefinition = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: createRplFormGroup({
    $cmp: 'RplFormOption',
    props: {
      type: 'checkbox',
      id: `$id + '__checkbox'`,
      name: '$node.name',
      disabled: '$node.context.disabled',
      label: '$node.props.checkboxLabel',
      onValue: '$node.props.onValue',
      offValue: '$node.props.offValue',
      checked: '$_value',
      onChange: '$node.input',
      validationMeta: '$node.props.validationMeta',
      'aria-invalid': '$fns.isFieldInvalid()',
      'aria-required': '$fns.isFieldRequired()',
      'data-rpl-focus-input': '$id',
      required: '$fns.isFieldRequired()',
      showRequiredInLabel: '$fns.hasNoLabel()',
      variant: '$node.props.variant',
      pii: '$node.props.pii'
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
  props: ['checkboxLabel', 'variant', 'onValue', 'offValue', 'pii'],
  /**
   * Forces node.props.type to be this explicit value.
   */
  forceTypeProp: 'checkbox',
  /**
   * Additional features that should be added to your input
   */
  features: rplFeatures
}
