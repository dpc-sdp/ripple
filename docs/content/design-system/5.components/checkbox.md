---
title: Checkbox
description: Let users select one or more options from a list.
layout: page
label: Core

---

## Usage
Users can use checkboxes to:
- select one or more list options
- toggle one option on or off.

Don't use a checkbox if only one option is available, or if you expect the user to only select one option. For this, use the [radio button](https://deploy-preview-457--ripple-docs.netlify.app/design-system/components/radio-button/) component instead. 

::DocsExample
---
id: Form label
---
::

### How this component works
Use checkboxes with:
- form label
- optional requirement label
- optional hint text
- checkbox label.

Checkboxes should always have a form and checkbox label.

#### Single checkbox
Single checkboxes confirm a user's selection or preference. For example, if a user is agreeing to terms and conditions or are registering for an option.

#### Checkbox group
Checkbox groups provide a list of available items for the user to choose from. Always tell the user how many options they can select. 

Always give checkbox groups a clear and descriptive label. The label should say what the options represent and should help the user to choose one. Doing so ensures good accessibility, as screen readers read each option's label.

Not all users will know the visual difference between a checkbox and a radio button. You could add extra instructions to guide them, like 'select up to 3 options'.

### When and how to use
- Use checkboxes for more than one selectable list options.
- Use hints to inform users that more than one option can be selected e.g. 'Select all that apply'.
- Always position checkboxes to the left of their labels. This makes them easier to find, especially if using a screen magnifier.
- Ensure you list options in a logical and unbiased manner. It could be helpful to users if you order them from most-to-least common.

### When and how not to use
- Don't use checkboxes for a single selectable list option. Use [radio buttons](https://deploy-preview-457--ripple-docs.netlify.app/design-system/components/radio-button/) for this.
- Don't pre-select checkboxes. Users are more likely to not realise they’ve submitted the wrong answer or missed a question.

---

## Variants
Checkboxes have two variants:
- Default, used on white backgrounds.
- Reverse, used on neutral backgrounds.

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

Make sure errors follow error message guidance. Always have specific error messages for specific errors.

**If nothing is selected and the question has options in it**

Structure this message to help the user to choose which options apply to them. Say ‘Select if \[options\]’. For example, ‘Select if you like summer, winter, autumn, and/or spring.'

**If nothing is selected and the question does not have options in it**

Structure this message to help the user to choose which options apply to them. Say ‘select \[options\]’. For example, 'Select your favourite season.'

::DocsExample
---
id: no story book link yet
---
::


---

## Theming
Checkboxes use colour for interactive states.  It adopts the site focus state colour for a consistent focus to active state experience.

::DocsThemeChooser
  ::DocsExample
  ---
  id: forms-checkbox-group--default-variant
  ---
  ::
::

To create your own theme see [theming guidance for designers]() or [theming guidance for developers]().

---

## Rationale
Both the active and focus state use the site focus colour. This creates a seamless user experience. If we used a different colour, keyboard users would have colour changes between focusing on and interacting with an input field. This could be jarring or confusing to users.

This is across all form and input elements for a consistent experience. 
