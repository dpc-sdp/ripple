import { text, email, tel, submit } from './inputs/index.js'

const rplFormInputs = (node) => {
  // Adds required value
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

rplFormInputs.library = (node) => {
  switch (node.props.type) {
    case 'RplFormText':
      return node.define(text)
    case 'RplFormEmail':
      return node.define(email)
    case 'RplFormTel':
      return node.define(tel)
    case 'RplFormSubmit':
      return node.define(submit)
  }
}

export default rplFormInputs
