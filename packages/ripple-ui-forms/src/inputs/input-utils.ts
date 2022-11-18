import { markRaw } from 'vue'
import RplFormInput from './../components/RplFormInput/RplFormInput.vue'
import RplFormValidationError from './../components/RplFormValidationError/RplFormValidationError.vue'
import {
  outer,
  inner,
  wrapper,
  label,
  help,
  icon,
  prefix,
  suffix,
  createSection
} from '@formkit/inputs'
import {
  FormKitSchemaComponent,
  FormKitExtendableSchemaRoot
} from '@formkit/core'

export const inputLibrary = {
  RplFormInput: markRaw(RplFormInput),
  RplFormValidationError: markRaw(RplFormValidationError)
}

/*
 * Creates a Formkit schema based on Ripple opinionated defaults for label and help messages, etc
 */
export const createRplFormInput = (
  cmp: FormKitSchemaComponent
): FormKitExtendableSchemaRoot => {
  return outer(
    wrapper(
      label('$label'),
      help('$help'),
      createSection('error', () => ({
        $cmp: 'RplFormValidationError',
        if: '$fns.length($messages)',
        props: {
          id: '$id',
          msg: 'Error',
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

export const defaultRplFormInputProps = {
  handlers: '$handlers',
  id: '$id',
  prefixIcon: '$node.props.prefixIcon',
  suffixIcon: '$node.props.suffixIcon',
  value: '$_value',
  disabled: '$node.context.disabled',
  options: '$node.context.options',
  name: '$node.context.name',
  className: '$node.context.classes.input',
  validationMeta: '$node.props.validationMeta'
}
