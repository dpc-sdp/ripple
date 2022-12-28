import { FormKitTypeDefinition } from '@formkit/core'
import { outer, createSection } from '@formkit/inputs'
import { inputLibrary } from './input-utils'

/**
 * Input definition for a submit button.
 * @public
 */
export const divider: FormKitTypeDefinition = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(
    createSection('input', () => ({
      $cmp: 'RplFormDivider'
    }))()
  ),
  library: inputLibrary,
  /**
   * The type of node, can be a list, group, or input.
   */
  type: 'group',
  /**
   * An array of extra props to accept for this input.
   */
  props: [],
  /**
   * Additional features that should be added to your input
   */
  features: []
}
