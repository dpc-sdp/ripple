---
title: Form alert
description: The Form alert component shows the user the outcome of a form submission or validation.
layout: page
label: Core
---

## Usage
Use a form alert to tell the user if a form has been submitted, or if there were errors in the form that prevented submission. 

The form alert appears at the top of the form and the user is automatically scrolled to it on submission.

There are 2 types of alerts:
- success
- error.

::DocsExample
---
id: forms-form-alert--error
---
::

### When and how to use
- Show the validation outcome of a form submission.
- If successful, use with relevant success message.
- Write error messages for the alert summary exactly the same way they are worded for inline error messages (next to the inputs with the errors).
- Include a custom error summary if required.
- Make your error messages clear and concise.

### When and how not to use
- Do not use the form alert without providing a summary of errors (if a submission is invalid).
- Do not restyle with other colours or icons.

---

## Variants
Form alert has 2 variants:
- success
- error.

### Success
Success alerts tell users their form submissions worked. They are always static and stay until a user moves away from that page or view.

To help screen reader and other users notice it, ensure that on submission the focus is moved to the alert.

::DocsExample
---
id: forms-form-alert--success
---
::

### Error
If one or more form validation errors occur, they must always be presented using:
- the error summary alert
- individual error messages next to each form field with an error (inline).

Make your error messages clear and concise.

Error summary alerts tell the user everything they need to fix before they can submit the form. This goes above the form.

Inline error messages show a user where the errors happened.

On submission of the form, you must:
- move the keyboard focus to the error summary
- include the heading ‘There is a problem’ in the error summary
- link to all answers with validation errors
- write error messages for the summary alert exactly the same way they are worded for inline error messages.

As well as showing an error summary, follow the validation pattern. For example, add, ‘Error: ’ to the start of the page \<title\> so screen readers read it out as soon as possible.

#### Linking from the error summary to each answer
Each error must be linked in the error summary to the form field (answer) causing it.

For questions where the user could choose one or more options as an answer, link to the first radio or checkbox field instead.

::DocsExample
---
id: forms-form-alert--error
---
::

#### Error messages
Specific error messages must be provided for specific error states. Style your error messages as directed by the ‘Error’ section on the pages for the following form components:
- [input field](/design-system/components/input-field)
- [text area](/design-system/components/text-area)
- [date input](/design-system/components/date-input)
- [checkbox](/design-system/components/checkbox)
- [radio button](/design-system/components/radio-button)
- [dropdown](/design-system/components/dropdown).
