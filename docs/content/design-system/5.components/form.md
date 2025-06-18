---
title: Form
description: The Form component guides users to give information and consists of a group of related inputs or controls.
layout: page
label: Core

---

## Usage
Use a form and its form input components to capture data from users. A form consists of a group of related inputs or controls. 

Common form components include the:
- [input field component](/design-system/components/input-field/)
- [text area component](/design-system/components/text-area/)
- [date input component](/design-system/components/date-input/)
- [radio button component](/design-system/components/radio-button/)
- [checkbox component](/design-system/components/checkbox/)
- [dropdown component](/design-system/components/dropdown/).

An input field) is for short (single-line) text entry. A text area is for longer text.

Other input types let a user select from predefined options. Use a radio button when a user needs to make only one selection. Use a checkbox for multiple selections.

Group related form components in logical chunks (fieldsets). A single form can have multiple fieldsets. For example, a fieldset with several input fields for an address, plus a fieldset with a date input and radio button for delivery preferences.

The user can submit a form when all fields are valid (see [form alert](/design-system/components/form-alert/)).

::DocsExample
---
id: forms-form--default-story
---
::

### How this component works
#### Layout
Use one form column to enable fast field comprehension. Users cannot scan easily if more columns are used.

Group related form components into logical chunks (fieldsets). This helps users understand the information they need to give.

#### Labels
Each input must have a label.

Use short, descriptive labels. This helps users quickly understand the information needed. It makes the content accessible, as a screen reader will read out these labels.

Put a label above its component (top-aligned). Labels will then be consistently aligned left, with small spaces between inputs. This helps users scan and fill the form. 

Placeholder text should not be used as a label.

#### Requirement - optional vs. mandatory

Mark an input as ‘required’ if you do not want the form submission to work unless the user gives that information.

Most fields on a simple form will be required.

Where possible, don’t include a large number of optional fields.

#### Hint text
Hint text can be used to tell the user what, or how, to successfully complete an input or text field.

For example, hint text can include:
- an overall description of the input field
- hints for what kind of information needs to be input
- specific formatting examples or requirements.

Only use hint text where it’s needed. Don’t repeat the label. Don’t use it just to keep the layout consistent with other fields in the form.

#### Placeholder text
[See accessibility](/design-system/components/form/#accessibility) (below).

#### Error messages
All form inputs share error state styling. When creating an error message, it must follow the guidance from the individual form component’s page.

Always have specific error messages for specific errors. Users need to understand why their input or selection was not valid. See the individual form component pages for suggested error messages.

#### Buttons
Button labels should say what the button will do when a user interacts with it.

Ensure the main action button tells the user when the form is being submitted (see [button loading spinner](/design-system/components/button/#loading-spinner)).

To avoid confusing users about how to submit the form, use only one main action button. Do not use a reset button.

#### Validation
Form alert is used to tell the user the outcome of the form validation.

If the form has been submitted successfully, the success alert will replace the form.

If the form has errors, the error alert will be placed at the top of the form, with an error summary and anchor links to all inputs that returned errors and require user actions.

#### Accessibility
All fields need a visible, accessible label. (Search fields are sometimes an exception to this.) 

On devices such as mobiles, display the keyboard required for the input. For example, a number keyboard for a date input. 

Never disable a submit button. Allow the user to submit the form and then display the error message. Use form alert to display the validation outcome.

Avoid using placeholder text where possible. It disappears when a user starts typing. Not all screen readers will read out placeholder text. Its colour often lacks the contrast needed for accessible content when using some browser default styling.

If placeholder text can’t be avoided, don’t use it to replace a label or hint text. Don’t use it to show an example or to include any critical information.

Use autocomplete to reduce typing for users. 

### When and how to use
- Keep to one column.
- Use top-align labels.
- Always mark form fields as ‘required’ or ‘optional’.
- Make calls to action descriptive - state the intent of the action.
- Write short, clear headings and form input labels.
- Use hint text (instead of labels) to explain any specifications.
- Use field length input constraints - for fields with a defined character count like phone numbers and postcodes.
- Write clear error messages inline, in error summaries and in form alerts by specifying what went wrong, where and how to fix them.

### When and how not to use
- Don’t create a form without a submit button.
- Don't use an input or control without a form label.
- Avoid using all caps.

---

## Theming
Forms use colour for:
- interactive states
- icons.

A form component in an active state will adopt the same colour as the overall site’s focus state colour. This means a user’s experience of that form and its components remains consistent while it transitions from a focus to an active state.

::DocsThemeChooser
  ::DocsExample
  ---
  id: forms-form--default-story
  ---
  ::
::

To create your own theme see [theming guidance for designers](/design-system/design/theming-guidance-for-designers) or [theming guidance for developers](/design-system/develop/theming).

---

## Rationale
The active and focus states both use the site’s focus state colour. This creates a seamless user experience. If we used a different colour, keyboard users would have colour changes between focusing on and interacting with an input field. This could be jarring or confusing to users.

This occurs across all form and input elements, for a consistent experience.
