---
title: Radio Button
description: Let users select one option from a list.
layout: page
label: Core
links:
- text: Figma
  url: #colour
- text: Storybook
  url: #component
---

## Usage

Radio buttons help users make a single selection from a list of available items.

Never use radio buttons if a user may select multiple options. When they need more than one option, use the [checkbox](/design-system/components/checkbox/) component.

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
- optional hint text

Radio buttons should always have a form and radio label. 

Always use a descriptive label for groups of radio buttons. The label should say what the options represent and should help the user to choose one. Doing so ensures good accessibility, as screen readers read each option's label.

Not all users will know the visual difference between a radio button and a checkbox. You could add extra instructions to guide then, like 'select one option’.

### When and how to use

- Use if only one options needs selecting from a list
- Use reverse variant on grey backgrounds
- Always write clear and concise radio label descriptions
- Ensure you list options in a logical and unbiased manner. It could be helpful to users if you order them from most-to-least common
- Use hints to tell users they can only select one option
- Always position radios to the left of their labels. This makes them easier to find, especially if using a screen magnifier

### When and how not to use

- Don't use for lists with more than one possible option. Use [checkboxes](/design-system/components/checkbox/) for these
- Don't use a radio group with an horizontal alignment for displaying more than 2 options
- Don't list all possible options. Add an option for 'other'

---

## Variants

Radio buttons have two variants:

- Default, used on white backgrounds.
- Reverse, used on neutral backgrounds.

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

All form inputs share error state styling.

Make sure errors follow error message guidance. Always have specific error messages for specific errors.

**If it’s a ‘yes’ or ‘no’ question**

Structure this message to help the user understand why they would say yes. For example, say ‘Select yes if [true value]’. Like, ‘Select yes if you drive a car’.

**If there are two options which are not ‘yes’ and ‘no’**

Structure this message to help the user to choose one of two options. For example, say 'Select if [true value]’. Like, 'Select if you drive a car or a truck'.

**If there are more than two options**

Structure this message to help the user to choose one from more than two options. For example, ‘Select the day of the week you drive the most.'

**Need an example for error message, this is a placeholder**

::DocsExample
---
id: forms-radio-group--default-variant
---
::

---

## Theming

Radio buttons use colour for interactive states. It adopts the site focus state colour for a consistent focus to active state experience.

::DocsThemeChooser
  ::DocsExample
  ---
  id: forms-radio-group--default-variant
  ---
  ::
::

To create your own theme see [theming guidance for designers]() or [theming guidance for developers]().
