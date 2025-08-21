---
title: Radio button
description: The Radio button component shows a list of options, with a radio (round) button to the left of each option’s description.
layout: page
label: Core
---

## Usage

Use radio buttons to let users select one option from a list.

They help users make a single selection from a list of available items.

Never use radio buttons if a user may select multiple options. Use a checkbox component instead. 

::DocsExample
---
id: forms-radio-group--default-variant
---
::

### How this component works

Use radio buttons with:
- form label
- radio label
- optional requirement label
- optional hint text.

Radio buttons should always have a form and radio label. 

Always use a descriptive label for groups of radio buttons. The label should say what the options represent and should help the user to choose one. Doing so ensures good accessibility, as screen readers read each option's label.

Not all users will know the visual difference between a radio button and a checkbox. You could add extra instructions to guide then, like 'select one option’.

### When and how to use
- Use if only one options needs selecting from a list.
- Use the reverse variant on grey backgrounds.
- Always write clear and concise radio label descriptions.
- Ensure you list options in a logical and unbiased manner. 
- If unsure about the list order, place from most common, to least common.
- Use hints to tell users they can only select one option.
- Always put the radio button on the left side of its label description to allow users, particularly those using screen magnifiers, to find labels.

### When and how not to use
- Don't use for lists with more than one possible option. Use checkboxes for these.
- Don't use a radio group with an horizontal alignment for displaying more than 2 options.
- Don't list all possible options. Add an option for 'other'.

---

## Variants

Radio buttons have 2 variants:
- default, used on white backgrounds
- reverse, used on neutral backgrounds.

### Default

::DocsExample
---
id: forms-radio-group--default-variant
---
::

### Reverse

::DocsExample
---
id: forms-radio-group--reverse-variant
---
::

### Error

All form inputs share error state styling. Always have specific error messages for specific errors. Users need to understand why their input or selection was not valid.

When creating an error message for radio buttons, use the wording below.

**Error: invalid response to a yes/no question**

Structure this message to help the user understand why they would say yes.
- Error message: ‘Select yes if \[the information is true\]’.
- Example: 'Select yes if you drive a car'.

**Error: invalid response to a choice (other than yes/no) from 2 options**

Structure this message to help the user choose the option that applies to them.
- Error message: ‘Select if \[the choice you are asking the user to make\].'
- Example: ‘Select if you drive a car or truck’.

**Error: invalid response to a choice from 3 or more options**

Structure this message to help the user to choose a single option from 3 or more options. 
- Error message: ‘Select the \[singular piece of information you are seeking from the user\].'
- Example: ‘Select the day of the week you drive the most.'

::DocsExample
---
id: forms-radio-group--default-variant
---
::

---

## Theming

Radio buttons use colour for interactive states. 

A radio button component in an active state will adopt the same colour as the overall site’s focus state colour. This means a user’s experience of that radio button remains consistent while it transitions from a focus to an active state.

::DocsThemeChooser
  ::DocsExample
  ---
  id: forms-radio-group--default-variant
  ---
  ::
::

To create your own theme see [theming guidance for designers](/design-system/design/theming-guidance-for-designers) or [theming guidance for developers](/design-system/develop/theming).
