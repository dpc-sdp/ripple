export const schema = [
  {
    $formkit: 'RplFormText',
    name: 'name',
    label: 'Name',
    id: 'name',
    validation: [['required']]
  },
  {
    $formkit: 'RplFormTextarea',
    name: 'message',
    label: 'Message',
    id: 'message',
    validation: [['required']]
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
    ],
    validation: [['required']]
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
    ],
    validation: [['required']]
  },
  {
    $formkit: 'RplFormCheckbox',
    id: 'terms',
    name: 'terms',
    label: 'Terms',
    checkboxLabel: 'I accept the terms',
    validation: [['required']]
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

export const multiStepSchema: any[] = [
  {
    $step: true,
    id: 'step-one',
    key: 'step-one',
    name: 'step-one',
    title: 'Step one',
    nextButton: 'Next',
    schema: [
      {
        $formkit: 'RplFormText',
        id: 'first_name',
        name: 'first_name',
        label: 'First name',
        validation: [['required']],
        value: ''
      }
    ]
  },
  {
    $step: true,
    id: 'step-two',
    key: 'step-two',
    name: 'step-two',
    title: 'Step two',
    nextButton: 'Review',
    prevButton: 'Back',
    schema: [
      {
        $formkit: 'RplFormText',
        id: 'email',
        name: 'email',
        label: 'Email',
        validation: [['required']],
        value: ''
      }
    ]
  },
  {
    $step: true,
    id: 'review',
    key: 'review',
    name: 'review',
    title: 'Review',
    nextButton: 'Submit',
    prevButton: 'Back',
    schema: [
      {
        $formkit: 'RplFormReview',
        key: 'review_component'
      },
      {
        $formkit: 'RplFormCheckbox',
        id: 'terms',
        name: 'terms',
        label: 'Terms',
        checkboxLabel: 'I accept the terms',
        validation: [['required']]
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
  }
]

export const multiStepSchemaSubSteps: any[] = [
  {
    $step: true,
    id: 'step-one',
    key: 'step-one',
    name: 'step-one',
    title: 'Step one',
    nextButton: 'Next',
    schema: [
      {
        $formkit: 'RplFormText',
        id: 'first_name',
        name: 'first_name',
        label: 'First name',
        validation: [['required']],
        value: ''
      }
    ]
  },
  {
    $step: true,
    parentStep: 'step-one',
    inReview: false,
    id: 'step-one-point-one',
    key: 'step-one-point-one',
    name: 'step-one-point-one',
    title: 'Step one point one',
    nextButton: 'Next',
    schema: [
      {
        $formkit: 'RplFormText',
        id: 'last_name',
        name: 'last_name',
        label: 'Last name',
        validation: [['required']],
        value: ''
      }
    ]
  },
  {
    $step: true,
    parentStep: 'step-one',
    inReview: false,
    id: 'step-one-point-two',
    key: 'step-one-point-two',
    name: 'step-one-point-two',
    title: 'Step one point two',
    nextButton: 'Next',
    schema: [
      {
        $formkit: 'RplFormEmail',
        id: 'email',
        name: 'email',
        label: 'Email',
        validation: [['required']],
        value: ''
      }
    ]
  },
  {
    $step: true,
    id: 'step-two',
    key: 'step-two',
    name: 'step-two',
    title: 'Step two',
    nextButton: 'Next',
    beforeStepChange: async ({ currentStep, targetStep }) => {
      if (targetStep.id === 'step-one-point-two') {
        currentStep.node.parent?.goTo('step-one')
      }
      return true
    },
    schema: [
      {
        $formkit: 'RplFormCheckbox',
        id: 'terms',
        name: 'terms',
        label: 'Terms',
        checkboxLabel: 'I accept the terms',
        validation: [['required']]
      }
    ]
  },
  {
    $step: true,
    id: 'review',
    key: 'review',
    name: 'review',
    title: 'Review',
    nextButton: 'Submit',
    prevButton: 'Back',
    schema: [
      {
        $formkit: 'RplFormReview',
        key: 'review_component'
      }
    ]
  }
]

export const multiStepSchemaNoPrevButton: any[] = [
  {
    $step: true,
    id: 'step-one',
    key: 'step-one',
    name: 'step-one',
    title: 'Step one',
    nextButton: 'Next',
    schema: [
      {
        $formkit: 'RplFormText',
        id: 'first_name',
        name: 'first_name',
        label: 'First name',
        value: ''
      }
    ]
  },
  {
    $step: true,
    id: 'step-two',
    key: 'step-two',
    name: 'step-two',
    title: 'Step two',
    nextButton: 'Continue',
    prevButton: false,
    schema: [
      {
        $formkit: 'RplFormText',
        id: 'email',
        name: 'email',
        label: 'Email',
        value: ''
      }
    ]
  },
  {
    $step: true,
    id: 'review',
    key: 'review',
    name: 'review',
    title: 'Review',
    nextButton: 'Submit',
    prevButton: 'Back',
    schema: [
      {
        $formkit: 'RplFormReview',
        key: 'review_component'
      }
    ]
  }
]

export const multiStepSchemaNoNextButton: any[] = [
  {
    $step: true,
    id: 'step-one',
    key: 'step-one',
    name: 'step-one',
    title: 'Step one',
    nextButton: 'Next',
    schema: [
      {
        $formkit: 'RplFormText',
        id: 'first_name_no_next',
        name: 'first_name_no_next',
        label: 'First name',
        value: ''
      }
    ]
  },
  {
    $step: true,
    id: 'step-two',
    key: 'step-two',
    name: 'step-two',
    title: 'Step two',
    nextButton: false,
    prevButton: 'Back',
    schema: [
      {
        $formkit: 'RplFormText',
        id: 'email_no_next',
        name: 'email_no_next',
        label: 'Email',
        value: ''
      }
    ]
  },
  {
    $step: true,
    id: 'review',
    key: 'review',
    name: 'review',
    title: 'Review',
    nextButton: 'Submit',
    prevButton: 'Back',
    schema: [
      {
        $formkit: 'RplFormReview',
        key: 'review_component'
      }
    ]
  }
]
