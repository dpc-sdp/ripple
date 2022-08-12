import { FormKitTypeDefinition } from '@formkit/core'
import { localize, ignores } from '@formkit/inputs'
import RplFormSubmit from './../components/submit/submit.vue'

/**
 * Input definition for a button.
 * @public
 */
export const button: FormKitTypeDefinition = {
  /**
   * The component to render
   */
  component: RplFormSubmit,
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
