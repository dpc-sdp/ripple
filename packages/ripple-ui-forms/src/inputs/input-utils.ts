import { markRaw } from 'vue'
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
// @ts-expect-error vue SFC
import RplFormInput from './../components/RplFormInput/RplFormInput.vue'
// @ts-expect-error vue SFC
import RplFormTextarea from './../components/RplFormTextarea/RplFormTextarea.vue'
// @ts-expect-error vue SFC
import RplFormOption from '../components/RplFormOptions/RplFormOption.vue'
// @ts-expect-error vue SFC
import RplFormCheckboxGroup from './../components/RplFormOptions/RplFormCheckboxGroup.vue'
// @ts-expect-error vue SFC
import RplFormRadioGroup from './../components/RplFormOptions/RplFormRadioGroup.vue'
// @ts-expect-error vue SFC
import RplFormOptionButtons from './../components/RplFormOptionButtons/RplFormOptionButtons.vue'
// @ts-expect-error vue SFC
import RplFormDropdown from './../components/RplFormDropdown/RplFormDropdown.vue'
// @ts-expect-error vue SFC
import RplFormDate from './../components/RplFormDate/RplFormDate.vue'
// @ts-expect-error vue SFC
import RplFormValidationError from './../components/RplFormValidationError/RplFormValidationError.vue'
// @ts-expect-error vue SFC
import RplFormHelpText from './../components/RplFormHelpText/RplFormHelpText.vue'
// @ts-expect-error vue SFC
import RplFormLabel from './../components/RplFormLabel/RplFormLabel.vue'
// @ts-expect-error vue SFC
import RplFormInputGrid from './../components/RplFormInputGrid/RplFormInputGrid.vue'
// @ts-expect-error vue SFC
import RplFormContent from '../components/RplFormContent/RplFormContent.vue'
// @ts-expect-error vue SFC
import RplFormFieldset from '../components/RplFormFieldset/RplFormFieldset.vue'
// @ts-expect-error vue SFC
import RplFormDivider from '../components/RplFormDivider/RplFormDivider.vue'
// @ts-expect-error vue SFC
import RplFormActions from '../components/RplFormActions/RplFormActions.vue'
// @ts-expect-error vue SFC
import FormkitInputError from '../components/RplForm/FormkitInputError.vue'
// @ts-expect-error vue SFC
import FormkitOuter from '../components/RplForm/FormkitOuter.vue'
// @ts-expect-error vue SFC
import RplFormNumber from '../components/RplFormNumber/RplFormNumber.vue'
// @ts-expect-error vue SFC
import RplFormHidden from '../components/RplFormHidden/RplFormHidden.vue'

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
  FormkitOuter: markRaw(FormkitOuter),
  RplFormNumber: markRaw(RplFormNumber),
  RplFormHidden: markRaw(RplFormHidden)
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
  ) as unknown as FormKitExtendableSchemaRoot
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
  ) as unknown as FormKitExtendableSchemaRoot
}

/*
 * Creates a Formkit schema for UI-less fields
 * this is useful for when you don't need the wrapping elements
 * and just want the input itself, for example, when using a hidden input
 */
export const createRplFormInputOnly = (
  cmp: FormKitSchemaComponent
): FormKitExtendableSchemaRoot => {
  return createSection(
    'input',
    () => cmp
  )() as unknown as FormKitExtendableSchemaRoot
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
  columnClasses: '$node.props.columnClasses',
  pii: '$node.props.pii'
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
