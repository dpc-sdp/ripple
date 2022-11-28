import {
  text,
  email,
  tel,
  submit,
  checkbox,
  checkboxGroup
} from './inputs/index'

const rplFormInputs = (node) => {
  // Adds required value
  node.on('created', () => {
    const schemaFn = node.props?.definition?.schema
    if (schemaFn) {
      node.props.definition.schema = (
        sectionsSchema = { label: {}, legend: {} }
      ) => {
        const isRequired = node.props.parsedRules.some(
          (rule) => rule.name === 'required' || rule.name === 'accepted'
        )

        const requiredSchema = {
          $el: 'span',
          attrs: {
            class: 'rpl-form__required rpl-type-label-small'
          },
          children: '(Required)'
        }

        if (isRequired) {
          // For single fields (e.g. text input)
          sectionsSchema.label = {
            children: ['$label', requiredSchema]
          }

          // For grouped fields (e.g. radio)
          sectionsSchema.legend = {
            children: ['$label', requiredSchema]
          }
        }
        return schemaFn(sectionsSchema)
      }
    }
  })
}

rplFormInputs.library = (node) => {
  switch (node.props.type) {
    case 'RplFormText':
      return node.define(text)
    case 'RplFormEmail':
      return node.define(email)
    case 'RplFormTel':
      return node.define(tel)
    case 'RplFormCheckbox':
      return node.define(checkbox)
    case 'RplFormCheckboxGroup':
      return node.define(checkboxGroup)
    case 'RplFormSubmit':
      return node.define(submit)
  }
}

export default rplFormInputs
