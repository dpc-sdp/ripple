import { FormKitTypeDefinition } from '@formkit/core'
import { createRplFormInput, inputLibrary, rplFeatures } from './input-utils'

/**
 * Input definition for Ripple autocomplete input.
 * @public
 */
export const autocomplete: FormKitTypeDefinition = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: createRplFormInput(() => ({
    $cmp: 'RplFormAutocomplete',
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
      validationMeta: '$node.props.validationMeta',
      columnClasses: '$node.props.columnClasses',
      pii: '$node.props.pii',
      isFreeText: '$node.props.isFreeText',
      iconPosition: '$node.props.iconPosition',
      getSuggestions: '$node.props.getSuggestions',
      getSuggestionValue: '$node.props.getSuggestionValue',
      isOptionSelectable: '$node.props.isOptionSelectable',
      renderSuggestionLabel: '$node.props.renderSuggestionLabel',
      renderValueLabel: '$node.props.renderValueLabel',
      maxItemsDisplayed: '$node.props.maxItemsDisplayed',
      showAction: '$node.props.showAction',
      actionLabel: '$node.props.actionLabel',
      onActionClick: '$node.props.onActionClick'
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
    'columnClasses',
    'pii',
    'isFreeText',
    'iconPosition',
    'getSuggestions',
    'getSuggestionValue',
    'isOptionSelectable',
    'renderSuggestionLabel',
    'renderValueLabel',
    'maxItemsDisplayed',
    'showAction',
    'actionLabel',
    'onActionClick'
  ],
  /**
   * Additional features that should be added to your input
   */
  features: rplFeatures
}
