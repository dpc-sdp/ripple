import { markRaw } from 'vue'
import { FormKitTypeDefinition } from '@formkit/core'
import { localize, ignores, outer, createSection } from '@formkit/inputs'
import RplFormSubmit from './../components/RplFormSubmit/RplFormSubmit.vue'

/**
 * Input definition for a submit button.
 * @public
 */
export const submit: FormKitTypeDefinition = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(
    createSection('input', () => ({
      $cmp: 'RplFormSubmit',
      props: {
        id: '$id',
        label: '$label',
        variant: '$variant',
        prefixIcon: '$node.props.prefixIcon',
        suffixIcon: '$node.props.suffixIcon'
      }
    }))()
  ),
  library: {
    RplFormSubmit: markRaw(RplFormSubmit)
  },
  /**
   * The type of node, can be a list, group, or input.
   */
  type: 'input',
  /**
   * The family of inputs this one belongs too. For example "text" and "email"
   * are both part of the "text" family. This is primary used for styling.
   */
  family: 'button',
  /**
   * An array of extra props to accept for this input.
   */
  props: ['icon', 'iconPosition'],
  /**
   * Forces node.props.type to be this explicit value.
   */
  forceTypeProp: 'submit',
  /**
   * Additional features that should be added to your input
   */
  features: [localize('submit'), ignores]
}
