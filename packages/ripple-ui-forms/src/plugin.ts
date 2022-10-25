import { markRaw } from 'vue'
import {
  outer,
  inner,
  wrapper,
  label,
  help,
  messages,
  message,
  icon,
  prefix,
  suffix,
  createSection
} from '@formkit/inputs'
import {
  FormKitSchemaComponent,
  FormKitExtendableSchemaRoot
} from '@formkit/core'
import RplFormInput from './components/input/input.vue'
import RplFormSubmit from './components/RplFormSubmit/RplFormSubmit.vue'
import RplFormValidationError from './components/RplFormValidationError/RplFormValidationError.vue'

// Adds required
const rplFormInputs = (node) => {
  node.on('created', () => {
    const schemaFn = node.props.definition.schema
    node.props.definition.schema = (sectionsSchema = { label: {} }) => {
      const isRequired = node.props.parsedRules.some(
        (rule) => rule.name === 'required'
      )

      if (isRequired) {
        sectionsSchema.label = {
          children: [
            '$label',
            {
              $el: 'span',
              attrs: {
                class: 'rpl-form__required rpl-type-label-small'
              },
              children: '(Required)'
            }
          ]
        }
      }
      return schemaFn(sectionsSchema)
    }
  })
}

/*
 * Creates a Formkit schema based on Ripple opinionated defaults for label and help messages, etc
 */
const createRplFormInput = (
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
    ),
    messages(message('$node.props.validationMeta'))
  )
}

const defaultRplFormInputProps = {
  handlers: '$handlers',
  onInput: '$node.context.node.input',
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

const inputLibrary = {
  RplFormInput: markRaw(RplFormInput),
  RplFormValidationError: markRaw(RplFormValidationError)
}

rplFormInputs.library = (node) => {
  switch (node.props.type) {
    case 'RplFormText':
      return node.define({
        type: 'input',
        family: 'text',
        bind: '$attrs',
        library: inputLibrary,
        props: ['maxlength', 'minlength', 'placeholder', 'validationMeta'],
        schema: createRplFormInput({
          $cmp: 'RplFormInput',
          props: {
            ...defaultRplFormInputProps,
            type: 'text',
            maxlength: '$node.props.maxlength',
            minlength: '$node.props.minlength',
            placeholder: '$node.props.placeholder'
          }
        })
      })
    case 'RplFormEmail':
      return node.define({
        type: 'input',
        family: 'text',
        library: inputLibrary,
        schema: createRplFormInput({
          $cmp: 'RplFormInput',
          props: {
            ...defaultRplFormInputProps,
            type: 'email'
          }
        })
      })
    case 'RplFormSubmit':
      return node.define({
        type: 'input',
        family: 'text',
        props: ['variant'],
        schema: createSection('input', () => ({
          $cmp: 'RplFormSubmit',
          props: {
            id: '$id',
            label: '$label',
            variant: '$variant',
            prefixIcon: '$node.props.prefixIcon',
            suffixIcon: '$node.props.suffixIcon'
          }
        }))()
      })
  }
}

export default rplFormInputs
