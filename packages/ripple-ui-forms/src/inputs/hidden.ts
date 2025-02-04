import { FormKitTypeDefinition } from '@formkit/core'
import {
  createRplFormInputOnly,
  inputLibrary,
  rplFeatures
} from './input-utils'

/**
 * Input definition for Ripple hidden input.
 * @public
 */
export const hidden: FormKitTypeDefinition = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: createRplFormInputOnly(() => ({
    $cmp: 'RplFormHidden',
    props: {
      id: '$id',
      value: '$_value',
      name: '$node.name',
      pii: '$node.props.pii',
      type: 'hidden'
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
  family: 'text',
  /**
   * An array of extra props to accept for this input.
   */
  props: ['pii'],
  /**
   * Forces node.props.type to be this explicit value.
   */
  forceTypeProp: 'hidden',
  /**
   * Additional features that should be added to your input
   */
  features: rplFeatures
}
