---
title: Checkbox
description: The Checkbox component lets users select one or more options from a list.
layout: page
label: Core
---

## Usage
Use checkboxes to allow users to:
- select one or more list options
- toggle one option on or off.

Don't use a checkbox if only one option is available or if you expect the user to only select one option. For this, use the radio button component instead.

::DocsExample
---
id: forms-checkbox-group--default-variant
---
::

### How this component works
Use checkboxes with a:
- form label
- optional requirement label
- optional hint text
- checkbox label.

Checkboxes should always have a form and checkbox label.

#### Single checkbox
A single checkbox confirms a user's selection or preference. Examples include when a user is agreeing to terms and conditions or registering for a the only available option presented.

#### Checkbox group
Checkbox groups provide a list of available items for the user to choose from. Always tell the user how many options they can select. 

Always give checkbox groups a clear and descriptive label. The label should say what the options represent and should help the user to choose one. Doing so ensures good accessibility, as screen readers read each option's label.

Not all users will know the visual difference between a checkbox and a radio button. You can could add extra instructions to guide users, for example, ‘Select up to 3 options’.

### When and how to use
- Use checkboxes for lists with more than one selectable option.
- Use hints to inform users that more than one option can be selected, for example, 'Select all that apply'.
- Always position checkboxes to the left of their labels because this makes them easier to find, especially if using a screen magnifier.
- Ensure you list the options in a logical and unbiased manner. It could be helpful to users if you order them from most common to least common.

### When and how not to use
- Don't use checkboxes for a single selectable list option, use radio buttons for this.
- Don't pre-select checkboxes because users may not realise they submitted the wrong answer or missed a question.

---

## Variants
Checkboxes have 2 variants:
- default, used on white backgrounds
- reverse, used on neutral backgrounds.

### Default
::DocsExample
---
id: forms-checkbox-group--default-variant
---
::

### Reverse
Use the reverse variant when the chip appears on the primary colour.

::DocsExample
---
id: forms-checkbox-group--reverse-variant
---
::

### Error
All form inputs share error state styling. 

Make sure errors follow error message guidance. Always have specific error messages for specific errors. Users need to understand why their input or selection was not valid.

**Error: nothing is selected and the question has options in it**

Structure this message to help the user to choose which options apply to them.
- Error message: ‘Select if \[options\]’. 
- Example: ‘Select if you like summer, winter, autumn, and/or spring'.

**Error: nothing is selected and the question does not have options in it**

Structure this message to help the user to choose which options apply to them.
- Error message: ‘Select \[options\]’.
- Example: 'Select your favourite season'.

::DocsExample
---
id: forms-checkbox-group--invalid
---
::


---

## Theming
A checkbox uses colour for interactive states.  

A checkbox in an active state will adopt the same colour as the overall site’s focus state colour. This means a user’s experience of a checkbox remains consistent while it transitions from a focus to an active state. 

::DocsThemeChooser
  ::DocsExample
  ---
  id: forms-checkbox-group--default-variant
  ---
  ::
::

To create your own theme see [theming guidance for designers](/design-system/design/theming-guidance-for-designers) or [theming guidance for developers](/design-system/develop/theming).

---

## Rationale
The active and focus states both use the site’s focus state colour. This creates a seamless user experience. If we used a different colour, keyboard users would have colour changes between focusing on and interacting with an input field. This could be jarring or confusing to users.

This occurs across all form and input elements, for a consistent experience.
