import { camelCase } from 'lodash-es'

export const getAdvancedAddressMapping = (fieldKey, field, formId) => {
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

  const defaultValues = field['#default_value'] || {}

  const getFieldId = (name) => `${formId}_${fieldKey}_${name}`
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
      name: 'organization',
      label: 'Organization',
      validation: isFieldRequired('organisation') ? [['required']] : [],
      value: defaultValues.organization || ''
    },
    given_name: {
      $formkit: 'RplFormText',
      id: getFieldId('given_name'),
      name: 'given_name',
      label: 'Given name',
      validation: isFieldRequired('given_name') ? [['required']] : [],
      value: defaultValues.given_name || ''
    },
    family_name: {
      $formkit: 'RplFormText',
      id: getFieldId('family_name'),
      name: 'family_name',
      label: 'Family name',
      validation: isFieldRequired('family_name') ? [['required']] : [],
      value: defaultValues.family_name || ''
    },
    address_line1: {
      $formkit: 'RplFormText',
      id: getFieldId('address_line1'),
      name: 'address_line1',
      label: 'Street address',
      validation: isFieldRequired('address_line1') ? [['required']] : [],
      value: defaultValues.address_line1 || ''
    },
    address_line2: {
      $formkit: 'RplFormText',
      id: getFieldId('address_line2'),
      name: 'address_line2',
      label: 'Street address line 2',
      validation: isFieldRequired('address_line2') ? [['required']] : [],
      value: defaultValues.address_line2 || ''
    },
    locality: {
      $formkit: 'RplFormText',
      id: getFieldId('locality'),
      name: 'locality',
      label: 'Suburb',
      columnClasses: 'rpl-col-12 rpl-col-5-m',
      validation: isFieldRequired('locality') ? [['required']] : [],
      value: defaultValues.locality || ''
    },
    administrative_area: {
      $formkit: 'RplFormDropdown',
      id: getFieldId('administrative_area'),
      name: 'administrative_area',
      label: 'State',
      columnClasses: 'rpl-col-12 rpl-col-5-m',
      options: [
        { id: 'VIC', value: 'VIC', label: 'Victoria' },
        { id: 'NSW', value: 'NSW', label: 'New South Wales' },
        { id: 'WA', value: 'WA', label: 'Western Australia' },
        { id: 'QLD', value: 'QLD', label: 'Queensland' },
        { id: 'ACT', value: 'ACT', label: 'Australian Capital Territory' },
        { id: 'NT', value: 'NT', label: 'Northern Territory' },
        { id: 'SA', value: 'SA', label: 'South Australia' },
        { id: 'TAS', value: 'TAS', label: 'Tasmania' }
      ],
      validation: isFieldRequired('administrative_area') ? [['required']] : [],
      value: defaultValues.administrative_area || '',
      pii: false
    },
    postal_code: {
      $formkit: 'RplFormText',
      id: getFieldId('postal_code'),
      name: 'postal_code',
      label: 'Postcode',
      columnClasses: 'rpl-col-6 rpl-col-3-m',
      validation: isFieldRequired('postal_code') ? [['required']] : [],
      value: defaultValues.postal_code || ''
    },
    country_code: {
      $formkit: 'hidden',
      id: getFieldId('country_code'),
      name: 'country_code',
      value: defaultValues.country_code || 'AU'
    }
  }

  return {
    $formkit: 'RplFormFieldset',
    legend: field['#title'],
    name: fieldKey,
    children: [
      'organization',
      'given_name',
      'family_name',
      'address_line1',
      'address_line2',
      'locality',
      'administrative_area',
      'postal_code',
      'country_code'
    ]
      .filter(isFieldVisible)
      .map((name) => allFields[name])
  }
}
