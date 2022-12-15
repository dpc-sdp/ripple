import { markRaw } from 'vue'
import RplFormInput from './../components/RplFormInput/RplFormInput.vue'
import RplFormTextarea from './../components/RplFormTextarea/RplFormTextarea.vue'
import RplFormOption from '../components/RplFormOptions/RplFormOption.vue'
import RplFormCheckboxGroup from './../components/RplFormOptions/RplFormCheckboxGroup.vue'
import RplFormDropdown from './../components/RplFormDropdown/RplFormDropdown.vue'
import RplFormValidationError from './../components/RplFormValidationError/RplFormValidationError.vue'
import RplFormHelpText from './../components/RplFormHelpText/RplFormHelpText.vue'
import RplFormActions from '../components/RplFormActions/RplFormActions.vue'
import {
  outer,
  inner,
  wrapper,
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
import { rplHelp } from '../sections/rplHelp'
import {
  isFieldRequired,
  isFieldInvalid,
  getAriaDescribedBy
} from '../formkit-features'

export const inputLibrary = {
  RplFormInput: markRaw(RplFormInput),
  RplFormTextarea: markRaw(RplFormTextarea),
  RplFormOption: markRaw(RplFormOption),
  RplFormCheckboxGroup: markRaw(RplFormCheckboxGroup),
  RplFormDropdown: markRaw(RplFormDropdown),
  RplFormValidationError: markRaw(RplFormValidationError),
  RplFormHelpText: markRaw(RplFormHelpText),
  RplFormActions: markRaw(RplFormActions)
}

export const rplFeatures = [isFieldRequired, isFieldInvalid, getAriaDescribedBy]

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
      rplHelp('$help'),
      createSection('error', () => ({
        $cmp: 'RplFormValidationError',
        if: '$fns.length($messages)',
        props: {
          id: `$id + '_error'`,
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
      rplHelp('$help'),
      createSection('error', () => ({
        $cmp: 'RplFormValidationError',
        if: '$fns.length($messages)',
        props: {
          id: `$id + '_error'`,
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
  validationMeta: '$node.props.validationMeta',
  'aria-describedby': '$fns.getAriaDescribedBy()',
  invalid: '$fns.isFieldInvalid()',
  required: '$fns.isFieldRequired()'
}

export const minMaxRplFormProps = {
  minlength: '$node.props.minlength',
  maxlength: '$node.props.maxlength'
}
export const minMaxProps = Object.keys(minMaxRplFormProps)

export const counterRplFormProps = {
  counter: '$node.props.counter',
  counterMin: '$node.props.counterMin',
  counterMax: '$node.props.counterMax'
}
export const counterProps = Object.keys(counterRplFormProps)
