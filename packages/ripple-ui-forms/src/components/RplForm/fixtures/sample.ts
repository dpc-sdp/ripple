export const schema = [
  {
    $formkit: 'RplFormText',
    name: 'name',
    label: 'Name',
    id: 'name'
  },
  {
    $formkit: 'RplFormTextarea',
    name: 'message',
    label: 'Message',
    id: 'message'
  },
  {
    $formkit: 'RplFormDropdown',
    id: 'colour',
    name: 'colour',
    label: 'Colour',
    options: [
      {
        id: 'Green',
        value: 'Green',
        label: 'Green'
      },
      {
        id: 'Blue',
        value: 'Blue',
        label: 'Blue'
      }
    ]
  },
  {
    $formkit: 'RplFormRadioGroup',
    id: 'pet',
    name: 'pet',
    label: 'Pet',
    options: [
      {
        id: 'dog',
        value: 'dog',
        label: 'Dog'
      },
      {
        id: 'cat',
        value: 'cat',
        label: 'Cat'
      }
    ]
  },
  {
    $formkit: 'RplFormCheckbox',
    id: 'terms',
    name: 'terms',
    label: 'Terms',
    checkboxLabel: 'I accept the terms'
  },
  {
    $formkit: 'RplFormActions',
    name: 'submit',
    variant: 'filled',
    label: 'Submit',
    id: 'actions',
    displayResetButton: true
  }
]
