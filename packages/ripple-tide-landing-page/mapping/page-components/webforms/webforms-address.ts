import { camelCase } from 'lodash-es'

export const getAdvancedAddressMapping = (fieldKey, field) => {
  const overrides = field['#field_overrides'] || {}

  const isAddressRequired = field['#required']

  const defaultRequired = [
    'given_name',
    'family_name',
    'address_line1',
    'locality',
    'administrative_area',
    'postal_code'
  ]

  const getFieldId = (name) => `${fieldKey}.${name}`
  const isFieldVisible = (name) => overrides[camelCase(name)] !== 'hidden'
  const hasRequiredOverride = (name) =>
    overrides[camelCase(name)] === 'required'
  const hasOptionalOverride = (name) =>
    overrides[camelCase(name)] === 'optional'
  const isFieldRequired = (name) => {
    if (hasOptionalOverride(name)) {
      return false
    }

    if (hasRequiredOverride(name)) {
      return true
    }

    if (isAddressRequired) {
      return defaultRequired.includes(name) || false
    }
  }

  const allFields = {
    organization: {
      $formkit: 'RplFormText',
      id: getFieldId('organization'),
      name: getFieldId('organization'),
      label: 'Organization',
      validation: isFieldRequired('organisation') ? [['required']] : []
    },
    given_name: {
      $formkit: 'RplFormText',
      id: getFieldId('given_name'),
      name: getFieldId('given_name'),
      label: 'Given name',
      validation: isFieldRequired('given_name') ? [['required']] : []
    },
    family_name: {
      $formkit: 'RplFormText',
      id: getFieldId('family_name'),
      name: getFieldId('family_name'),
      label: 'Family name',
      validation: isFieldRequired('family_name') ? [['required']] : []
    },
    address_line1: {
      $formkit: 'RplFormText',
      id: getFieldId('address_line1'),
      name: getFieldId('address_line1'),
      label: 'Street address',
      validation: isFieldRequired('address_line1') ? [['required']] : []
    },
    address_line2: {
      $formkit: 'RplFormText',
      id: getFieldId('address_line2'),
      name: getFieldId('address_line2'),
      label: 'Street address line 2',
      validation: isFieldRequired('address_line2') ? [['required']] : []
    },
    locality: {
      $formkit: 'RplFormText',
      id: getFieldId('locality'),
      name: getFieldId('locality'),
      label: 'Suburb',
      validation: isFieldRequired('locality') ? [['required']] : []
    },
    administrative_area: {
      $formkit: 'RplFormDropdown',
      id: getFieldId('administrative_area'),
      name: getFieldId('administrative_area'),
      label: 'State',
      options: [
        { id: 'VIC', value: 'VIC', label: 'Victoria' },
        { id: 'NSW', value: 'NSW', label: 'New South Wales' },
        { id: 'WA', value: 'WA', label: 'Western Australia' },
        { id: 'QLD', value: 'QLD', label: 'Queensland' },
        { id: 'ACT', value: 'ACT', label: 'Australian Capital Territory' }
      ],
      validation: isFieldRequired('administrative_area') ? [['required']] : []
    },
    postal_code: {
      $formkit: 'RplFormText',
      id: getFieldId('postal_code'),
      name: getFieldId('postal_code'),
      label: 'Postcode',
      validation: isFieldRequired('postal_code') ? [['required']] : []
    }
  }

  return {
    $formkit: 'RplFormFieldset',
    legend: field['#title'],
    children: [
      'organization',
      'given_name',
      'family_name',
      'address_line1',
      'address_line2',
      'locality',
      'administrative_area',
      'postal_code'
    ]
      .filter(isFieldVisible)
      .map((name) => allFields[name])
  }
}
