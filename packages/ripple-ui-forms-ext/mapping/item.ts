import type { TideWebformElement } from '@dpc-sdp/ripple-tide-webform/types'
import {
  getValidationAndConditionals,
  getInputIcons
} from '@dpc-sdp/ripple-tide-webform/mapping/utils'

// Tide API mapping function
export default (
  fieldID: string,
  field: TideWebformElement,
  fieldKey: string
) => ({
  $formkit: 'RplFormItem',
  key: fieldKey,
  name: fieldKey,
  label: field['#title'],
  disabled: field['#disabled'],
  placeholder: field['#placeholder'],
  id: fieldID,
  help: field['#description'] || field['#help_title'],
  value: field['#default_value'],
  ...getValidationAndConditionals(field),
  ...getInputIcons(field)
})
