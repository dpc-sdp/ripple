import {
  text,
  textarea,
  email,
  tel,
  actions,
  checkbox,
  checkboxGroup,
  dropdown,
  number,
  url,
  radioGroup,
  content,
  label,
  divider,
  date,
  datePicker,
  optionButtons,
  fieldset,
  hidden
} from './inputs/index'

const rplFormInputs = () => {
  // Adds plugins here
}

rplFormInputs.library = (node) => {
  switch (node.props.type) {
    case 'RplFormText':
      return node.define(text)
    case 'RplFormTextarea':
      return node.define(textarea)
    case 'RplFormEmail':
      return node.define(email)
    case 'RplFormTel':
      return node.define(tel)
    case 'RplFormUrl':
      return node.define(url)
    case 'RplFormNumber':
      return node.define(number)
    case 'RplFormCheckbox':
      return node.define(checkbox)
    case 'RplFormCheckboxGroup':
      return node.define(checkboxGroup)
    case 'RplFormRadioGroup':
      return node.define(radioGroup)
    case 'RplFormOptionButtons':
      return node.define(optionButtons)
    case 'RplFormDropdown':
      return node.define(dropdown)
    case 'RplFormDate':
      return node.define(date)
    case 'RplFormDatePicker':
      return node.define(datePicker)
    case 'RplFormContent':
      return node.define(content)
    case 'RplFormLabel':
      return node.define(label)
    case 'RplFormFieldset':
      return node.define(fieldset)
    case 'RplFormDivider':
      return node.define(divider)
    case 'RplFormActions':
      return node.define(actions)
    case 'RplFormHidden':
      return node.define(hidden)
  }
}

export default rplFormInputs
