import { FormKitTypeDefinition } from '@formkit/core'
import { createRplFormInput, inputLibrary, rplFeatures } from './input-utils'

/**
 * Input definition for a checkbox(ess).
 * @public
 */
export const file: FormKitTypeDefinition = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: createRplFormInput(() => ({
    $cmp: 'RplFormFile',
    props: {
      id: `$id`,
      label: '$label',
      'aria-describedby': '$fns.getAriaDescribedBy()',
      name: '$node.name',
      value: '$_value',
      placeholder: '$node.props.placeholder',
      onChange: '$node.input',
      disabled: '$node.context.disabled',
      required: '$fns.isFieldRequired()',
      invalid: '$fns.isFieldInvalid()',
      multiple: '$node.props.multiple',
      maxFiles: '$node.props.maxFiles',
      maxSize: '$node.props.maxSize',
      allowedTypes: '$node.props.allowedTypes',
      handleUpload: '$node.props.handleUpload',
      validationMeta: '$node.props.validationMeta',
      columnClasses: '$node.props.columnClasses',
      pii: '$node.props.pii'
    }
  })),
  library: inputLibrary,
  /**
   * The type of node can be a list, group, or input.
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
    'placeholder',
    'multiple',
    'maxFiles',
    'maxSize',
    'allowedTypes',
    'handleUpload',
    'columnClasses',
    'pii'
  ],
  /**
   * Additional features that should be added to your input
   */
  features: rplFeatures
}
