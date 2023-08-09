import { markRaw } from 'vue'
import RplFormInput from './../components/RplFormInput/RplFormInput.vue'
import RplFormTextarea from './../components/RplFormTextarea/RplFormTextarea.vue'
import RplFormOption from '../components/RplFormOptions/RplFormOption.vue'
import RplFormCheckboxGroup from './../components/RplFormOptions/RplFormCheckboxGroup.vue'
import RplFormRadioGroup from './../components/RplFormOptions/RplFormRadioGroup.vue'
import RplFormOptionButtons from './../components/RplFormOptionButtons/RplFormOptionButtons.vue'
import RplFormDropdown from './../components/RplFormDropdown/RplFormDropdown.vue'
import RplFormDate from './../components/RplFormDate/RplFormDate.vue'
import RplFormValidationError from './../components/RplFormValidationError/RplFormValidationError.vue'
import RplFormHelpText from './../components/RplFormHelpText/RplFormHelpText.vue'
import RplFormLabel from './../components/RplFormLabel/RplFormLabel.vue'
import RplFormInputGrid from './../components/RplFormInputGrid/RplFormInputGrid.vue'
import RplFormContent from '../components/RplFormContent/RplFormContent.vue'
import RplFormFieldset from '../components/RplFormFieldset/RplFormFieldset.vue'
import RplFormDivider from '../components/RplFormDivider/RplFormDivider.vue'
import RplFormActions from '../components/RplFormActions/RplFormActions.vue'
import {
  inner,
  wrapper,
  icon,
  prefix,
  suffix,
  fieldset,
  createSection
} from '@formkit/inputs'
import {
  FormKitSchemaComponent,
  FormKitExtendableSchemaRoot
} from '@formkit/core'
import { rplOuter } from '../sections/rplOuter'
import { rplLabel } from '../sections/rplLabel'
import { rplLegend } from '../sections/rplLegend'
import { rplHelp } from '../sections/rplHelp'
import {
  isFieldRequired,
  isFieldInvalid,
  getAriaDescribedBy,
  hasNoLabel
} from '../formkit-features'
import { rplInputGrid } from '../sections/rplInputGrid'
import FormkitInputError from '../components/RplForm/FormkitInputError.vue'
import FormkitOuter from '../components/RplForm/FormkitOuter.vue'

export const inputLibrary = {
  RplFormInput: markRaw(RplFormInput),
  RplFormTextarea: markRaw(RplFormTextarea),
  RplFormOption: markRaw(RplFormOption),
  RplFormCheckboxGroup: markRaw(RplFormCheckboxGroup),
  RplFormRadioGroup: markRaw(RplFormRadioGroup),
  RplFormOptionButtons: markRaw(RplFormOptionButtons),
  RplFormDropdown: markRaw(RplFormDropdown),
  RplFormDate: markRaw(RplFormDate),
  RplFormValidationError: markRaw(RplFormValidationError),
  RplFormHelpText: markRaw(RplFormHelpText),
  RplFormLabel: markRaw(RplFormLabel),
  RplFormInputGrid: markRaw(RplFormInputGrid),
  RplFormFieldset: markRaw(RplFormFieldset),
  RplFormContent: markRaw(RplFormContent),
  RplFormDivider: markRaw(RplFormDivider),
  RplFormActions: markRaw(RplFormActions),
  FormkitInputError: markRaw(FormkitInputError),
  FormkitOuter: markRaw(FormkitOuter)
}

export const rplFeatures = [
  isFieldRequired,
  isFieldInvalid,
  getAriaDescribedBy,
  hasNoLabel
]

/*
 * Creates a Formkit schema based on Ripple opinionated defaults for label and help messages, use
 * this to wrap fields like text inputs
 */
export const createRplFormInput = (
  cmp: FormKitSchemaComponent
): FormKitExtendableSchemaRoot => {
  return rplOuter(
    wrapper(
      rplLabel('$label'),
      rplHelp('$help'),
      createSection('error', () => ({
        $cmp: 'FormkitInputError',
        props: {
          id: `$id + '__error'`,
          fieldName: `$node.name`
        }
      }))(),
      rplInputGrid(
        inner(
          icon('prefix', 'label'),
          prefix(),
          createSection('input', () => cmp)(),
          suffix(),
          icon('suffix')
        )
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
  return rplOuter(
    fieldset(
      rplLegend('$label'),
      rplHelp('$help'),
      createSection('error', () => ({
        $cmp: 'FormkitInputError',
        props: {
          id: `$id + '__error'`,
          fieldName: `$node.name`
        }
      }))(),
      rplInputGrid(createSection('input', () => cmp)())
    )
  )
}

export const defaultRplFormInputProps = {
  onInput: '$handlers.DOMInput',
  onBlur: '$handlers.blur',
  id: '$id',
  label: '$label',
  prefixIcon: '$node.props.prefixIcon',
  suffixIcon: '$node.props.suffixIcon',
  value: '$_value',
  disabled: '$node.context.disabled',
  placeholder: '$node.context.placeholder',
  options: '$node.context.options',
  name: '$node.name',
  className: '$node.context.classes.input',
  validationMeta: '$node.props.validationMeta',
  'aria-describedby': '$fns.getAriaDescribedBy()',
  invalid: '$fns.isFieldInvalid()',
  required: '$fns.isFieldRequired()',
  columnClasses: '$node.props.columnClasses'
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
