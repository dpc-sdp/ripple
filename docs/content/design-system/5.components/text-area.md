---
title: Text area
description: The Text area component lets users select one option from a list.
layout: page
label: Core

---

## Usage

Use text area so users can enter multiple lines of text.

Text area is used when information longer than a single line of text is needed or expected. For example, comments fields.

Text areas can be resized and can be used with a character counter. 

Don’t use text area for succinct responses such as email addresses or names. In this case, you should use the input field component.

::DocsExample
---
id: forms-textarea--default-story
---
::

### How this component works

You must use a form label with a text area component.

You can use text area with:

- requirement label
- hint text
- metadata
- placeholder text.

Guide users about the amount of text wanted. Set the text area to match the amount preferred. It has no maximum height, but has a minimum height of 96px.

#### Resize handle

Users can change the text area height (but not width) with the resize handle. They can also scroll within the container.

#### Avoid placeholder text

Avoid using placeholder text where possible. It disappears when a user starts typing. Not all screen readers will read out placeholder text. Its colour often lacks the contrast needed for accessible content when using some browser default styling.

If placeholder text can’t be avoided, don’t use it to replace a label or hint text. Don’t use it to show an example or to include any critical information.

#### Hint text 

Hint text can be used to tell the user what, or how, to successfully complete a text area.

For example, hint text can include:

- an overall description of the text area
- hints for what kind of information needs to be input
- specific formatting examples or requirements.

Only use hint text where it’s needed. Don’t repeat the label. Don’t use it just to keep the layout consistent with other fields in the form.

#### Character count

A character count can sit below the text area field. It tells users the maximum characters and their input’s current count.

Users can enter more characters than the maximum. The character count then says they’ve entered too many characters before they submit the text area. The user can copy or reduce their full answer.

Even though there is a live character count, normal error responses (below) must appear if a user tries to submit a text area with too many characters.

Only use character count when there is a good reason. For example, legal reasons, technical reasons or evidence users will give more text than needed.

### When and how to use

- Always use a label for text areas.
- Use hint text to specify helpful information such as specific formatting or information requirements.
- Specify character counts when required.

### When and how not to use

- Never use without a label
- Avoid placeholder text because it can cause accessibility issues.
- Don’t disable copy and paste.
- Don’t set a minimum or maximum input limit without explicitly saying this in the character count.
- Do not use hint text if it isn’t relevant or meaningful to the user.
- Don’t use placeholder text to give instructions.
- Don’t write ambiguous error messages only stating what's wrong - explain how the user can fix it.

---

## Variants

The text area has 2 variants:

- default, used on white backgrounds
- reverse, used on neutral backgrounds.

### Default

::DocsExample
---
id: forms-textarea--default-story
---
::

### Reverse

::DocsExample
---
id: forms-textarea--reverse
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

**Error: input is too long or to short**

- Error message: ‘\[The input\] must be between \[number\] and \[number\] characters'.
- Example: 'Justification must be between 3 and 56 characters'.

**Error: input uses known characters that aren’t allowed**

- Error message: ‘\[The input\] must not include \[characters\]'.
- Example: ‘Reasons must not include + & ~'.

**Error: input uses unknown characters that aren’t allowed**

- Error message: ‘\[The input\] must only include \[list of allowed characters\]'.
- Example: ‘Explanations must only include letters, numbers and commas'.

::DocsExample
---
id: forms-textarea--error
---
::

---

## Theming

Text area uses colour to show interactive states. A text area field in an active state will adopt the same colour as the overall site’s focus state colour. This means a user’s experience of a text area remains consistent while it transitions from a focus to an active state.

::DocsThemeChooser
  ::DocsExample
  ---
  id: forms-textarea--default-story
  ---
  ::
::

To create your own theme see [theming guidance for designers](/design-system/design/theming-guidance-for-designers) or [theming guidance for developers](/design-system/develop/theming).

---

## Rationale

The active and focus states both use the site’s focus state colour. This creates a seamless user experience. If we used a different colour, keyboard users would have colour changes between focusing on and interacting with an input field. This could be jarring or confusing to users.

This occurs across all form and input elements, for a consistent experience. 
