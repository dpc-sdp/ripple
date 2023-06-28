import { FormKitTypeDefinition } from '@formkit/core'
import {
  createRplFormInput,
  inputLibrary,
  rplFeatures,
  minMaxRplFormProps,
  counterRplFormProps,
  minMaxProps,
  counterProps
} from './input-utils'

/**
 * Input definition for Ripple text input.
 * @public
 */
export const textarea: FormKitTypeDefinition = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: createRplFormInput({
    $cmp: 'RplFormTextarea',
    props: {
      handlers: '$handlers',
      id: `$id`,
      value: '$_value',
      name: '$node.name',
      label: '$label',
      disabled: '$node.context.disabled',
      placeholder: '$node.props.placeholder',
      rows: '$node.props.rows',
      options: '$node.props.options',
      validationMeta: '$node.props.validationMeta',
      'aria-describedby': '$fns.getAriaDescribedBy()',
      required: '$fns.isFieldRequired()',
      invalid: '$fns.isFieldInvalid()',
      ...minMaxRplFormProps,
      ...counterRplFormProps
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
  props: [
    ...minMaxProps,
    ...counterProps,
    'rows',
    'placeholder',
    'validationMeta',
    'columnClasses'
  ],
  /**
   * Forces node.props.type to be this explicit value.
   */
  forceTypeProp: 'textarea',
  /**
   * Additional features that should be added to your input
   */
  features: rplFeatures
}
