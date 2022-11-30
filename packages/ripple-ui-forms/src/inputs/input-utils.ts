import { markRaw } from 'vue'
import RplFormInput from './../components/RplFormInput/RplFormInput.vue'
import RplFormCheckbox from './../components/RplFormCheckbox/RplFormCheckbox.vue'
import RplFormCheckboxGroup from './../components/RplFormCheckbox/RplFormCheckboxGroup.vue'
import RplFormDropdown from './../components/RplFormDropdown/RplFormDropdown.vue'
import RplFormValidationError from './../components/RplFormValidationError/RplFormValidationError.vue'
import {
  outer,
  inner,
  wrapper,
  help,
  icon,
  prefix,
  suffix,
  fieldset,
  legend,
  createSection
} from '@formkit/inputs'
import {
  FormKitSchemaComponent,
  FormKitExtendableSchemaRoot
} from '@formkit/core'
import { rplLabel } from '../sections/rplLabel'

export const inputLibrary = {
  RplFormInput: markRaw(RplFormInput),
  RplFormCheckbox: markRaw(RplFormCheckbox),
  RplFormCheckboxGroup: markRaw(RplFormCheckboxGroup),
  RplFormDropdown: markRaw(RplFormDropdown),
  RplFormValidationError: markRaw(RplFormValidationError)
}

/*
 * Creates a Formkit schema based on Ripple opinionated defaults for label and help messages, use
 * this to wrap fields like text inputs
 */
export const createRplFormInput = (
  cmp: FormKitSchemaComponent
): FormKitExtendableSchemaRoot => {
  return outer(
    wrapper(
      rplLabel('$label'),
      help('$help'),
      createSection('error', () => ({
        $cmp: 'RplFormValidationError',
        if: '$fns.length($messages)',
        props: {
          id: '$id',
          messages: '$messages'
        }
      }))(),
      inner(
        icon('prefix', 'label'),
        prefix(),
        createSection('input', () => cmp)(),
        suffix(),
        icon('suffix')
      )
    )
  )
}

/*
 * Creates a Formkit schema based on Ripple opinionated defaults for a field that requires a
 * fieldset and legend instead of plain label (e.g. radios, checkboxes, date field)
 */
export const createRplFormGroup = (
  cmp: FormKitSchemaComponent
): FormKitExtendableSchemaRoot => {
  return outer(
    fieldset(
      legend('$label'),
      help('$help'),
      createSection('error', () => ({
        $cmp: 'RplFormValidationError',
        if: '$fns.length($messages)',
        props: {
          id: '$id',
          messages: '$messages'
        }
      }))(),
      createSection('input', () => cmp)()
    )
  )
}

export const defaultRplFormInputProps = {
  handlers: '$handlers',
  id: '$id',
  prefixIcon: '$node.props.prefixIcon',
  suffixIcon: '$node.props.suffixIcon',
  value: '$_value',
  disabled: '$node.context.disabled',
  placeholder: '$node.context.placeholder',
  options: '$node.context.options',
  name: '$node.context.name',
  className: '$node.context.classes.input',
  validationMeta: '$node.props.validationMeta'
}
