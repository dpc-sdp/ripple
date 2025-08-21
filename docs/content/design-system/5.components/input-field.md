---
title: Input field
description: The Input field component lets users input a short amount of text.
layout: page
label: Core
---

## Usage
Use input fields to let users enter, select and search for text. They are normally found in a form but can also be part of a modal or search.

Use an input field for users to enter text shorter than a single line.

Input fields can have multiple input types, depending on the need and use case. They have a text input type by default.

Input fields can be used for entering:
- text: basic text or search terms
- phone: a telephone number
- email: an email address
- passwords: a user's input is obscured with a dot (' • '), asterisk (' * ') or other symbol as they type.

Don’t use an input field if the user’s text needs to be more than one line long: use a text area component instead.

::DocsExample
---
id: forms-input--default-story
---
::

### How this component works
Set the width of the input field to show the amount of information needed from the user. For example, use smaller widths for postcodes than for emails.

You must use a form label with an input field.

You can use an input field with:
- requirement label
- hint text
- placeholder text
- prefix or suffix text
- prefix or suffix icon.

#### Avoid placeholder text
Avoid using placeholder text where possible. It disappears when a user starts typing. Not all screen readers will read out placeholder text. Its colour often lacks the contrast needed for accessible content when using some browser default styling.

If placeholder text can’t be avoided, don’t use it to replace a label or hint text. Don’t use it to show an example or to include any critical information.

#### Hint text
Hint text can be used to tell the user what, or how, to successfully complete an input field.

For example, hint text can include:
- an overall description of the input field
- hints for what kind of information needs to be input
- specific formatting examples or requirements.

Only use hint text where it’s needed. Don’t repeat the label. Don’t use it just to keep the layout consistent with other fields in the form.

#### Prefix and suffixes
Use prefixes and suffixes to help users enter things like currencies and measurements.

Prefixes and suffixes help when there’s a commonly understood symbol or abbreviation for the type of information needed.

Don’t rely on prefixes or suffixes alone. Screen readers will not read them out.

If you need a specific type of information, say so in the input label and hint text. For example, ‘Cost, in dollars’ in the input label and ‘$’ in the prefix.

### When and how to use
- Always use a label for input fields.
- Use hint text to specify helpful information such as:
  - expected number format, for example ‘Must be 6 to 8 digits long’
  - minimum and maximum number values, for example ‘Minimum of # and maximum of #’.
- Use the prefix to indicate measurements and categories like currency, for example, '$'.
- Use the prefix together with hint text to reinforce what the input needs to be, for example 'Cost, in dollars'.

### When and how not to use
- Never use an input field without a label.
- Avoid placeholder text because it can cause accessibility issues.
- Don’t disable copy and paste.
- Don’t set a minimum or maximum input limit without explicitly saying this in the hint text.
- Don’t use placeholder text to give instructions.
- Don’t write ambiguous error messages only stating what's wrong, explain how the user can fix it.

---

## Variants
The input field has 2 variants:
- default, used on white backgrounds
- reverse, used on neutral backgrounds.

### Default

::DocsExample
---
id: forms-input--default-story
---
::

### Reverse

::DocsExample
---
id: forms-input--reverse
---
::

### Error
All form inputs share error state styling.

Always have specific error messages for specific errors. Users need to understand why their input or selection was not valid.

When creating an error message for an input field, use the wording below.

**Error: empty input**
- Error message: ‘Enter \[the missing information\]'.
- Example: 'Enter your name'.

**Error: input is too long**
- Error message: ‘\[The input\] must be \[number\] characters or less'.
- Example: 'Delivery address must be 56 characters or less'.

**Error: input is too short**
- Error message: ‘\[The input\] must be \[number\] characters or more'.
- Example: 'Previous employer must be 3 characters or more'.

**Error: input is too long or too short**
- Error message: ‘\[The input\] must be between \[number\] and \[number\] characters'.
- Example: 'Justification must be between 3 and 56 characters'.

**Error: input uses known characters that aren’t allowed**
- Error message: ‘\[The input\] must not include \[characters\]'.
- Example: ‘Reasons must not include + & ~'.

**Error: input uses unknown characters that aren’t allowed**
- Error message: ‘\[The input\] must only include \[list of allowed characters\]'.
- Example: ‘Explanations must only include letters, numbers and commas'.

---

## Theming
Input field uses colour for:
- interactive states
- icons.

An input field in an active state will adopt the same colour as the overall site’s focus state colour. This means a user’s experience of an input field remains consistent while it transitions from a focus to an active state.

::DocsThemeChooser
  ::DocsExample
  ---
  id: forms-input--default-story
  ---
  ::
::

To create your own theme see [theming guidance for designers](/design-system/design/theming-guidance-for-designers) or [theming guidance for developers](/design-system/develop/theming).

---

## Rationale
The active and focus states both use the site’s focus state colour. This creates a seamless user experience. If we used a different colour, keyboard users would have colour changes between focusing on and interacting with an input field. This could be jarring or confusing to users.

This occurs across all form and input elements, for a consistent experience.
