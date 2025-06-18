---
title: Date input
description: The Date input component helps users enter a date.
layout: page
label: Core

---

## Usage
Use date input to let users to enter a date they already know, or a date they can enter without needing a calendar.

Date input has 3 fields: day, month and year.

Don’t set this component to automatically tab between these fields. This can be confusing and jarring for the user.

::DocsExample
---
id: forms-date-input--default-story
---
::

### How to use this component
You must use a form label with a date input.

You can use an date input with:
- requirement label
- hint text
- placeholder text.

#### Avoid placeholder text
Avoid using placeholder text where possible. It disappears when a user starts typing. Not all screen readers will read out placeholder text. Its colour often lacks the contrast needed for accessible content when using some browser default styling.

If placeholder text can’t be avoided, don’t use it to replace a label or hint text. Don’t use it to show an example or to include any critical information.

#### Hint text
Hint text can be used to tell the user what, or how, to successfully complete a date input.

For example, hint text can include specific formatting examples or requirements.

Only use hint text where it’s needed. Don’t use it just to keep the layout consistent with other fields in the form.

### When and how to use
- Always use date inputs with a label.
- Write short and concise labels.
- Use hint text to show the expected date format, for example, ‘07 11 2022’.

### When and how not to use
- If it’s not likely users will know the exact date, don’t use date input.
- Don’t use without a form label or hint text specifying the expected date format.
- Avoid placeholder text because it can cause accessibility issues.
- Don’t disable copy and paste.
- Don’t use placeholder text to give instructions or important examples.
- Don’t write ambiguous error messages only stating what's wrong - explain how the user can fix it.

---

## Variants
The date input has 2 variants:
- default, used on white backgrounds
- reverse, used on neutral backgrounds.

### Default
::DocsExample
---
id: forms-date-input--default-story
---
::

### Reverse

::DocsExample
---
id: forms-date-input--reverse
---
::

### Error
All form inputs share error state styling.

Always have specific error messages for specific errors. Users need to understand why their input or selection was not valid.

When creating an error message for a date input, use the wording below.

**Error: whole date field is empty**
- Highlight area: entire date input.
- Error message: ‘Enter \[the missing information\]'.
- Example: ‘Enter your dog’s birthday'.

**Error: some of date field is empty or incomplete**
- Highlight area: relevant day, month and/or year fields.
- Error message: ‘\[Information requested\] must include a \[name of empty or incomplete field\]’.
- Example: ‘Your dog’s birthday must include a month'.

**Error: impossible date entered**
- Highlight area: relevant day, month and/or year fields.
- Error message: ‘\[Information requested\] must be a real date’.
- Example: ‘Your dog’s birthday must be a real date'.

**Error: future date given when past date needed**
- Highlight area: entire date input.
- Error message: ‘\[Information requested\] must be in the past’.
- Example: ‘Your dog’s first playdate must be in the past'.

**Error: future date given when today or past date needed**
- Highlight area: entire date input.
- Error message: ‘\[Information requested\] must be today or in the past’.
- Example: ‘Your dog’s first beach visit must be today or in the past'.

**Error: past date given when future date needed**
- Highlight area: entire date input.
- Error message: ‘\[Information requested\] must be in the future’.
- Example: ‘Your dog’s next raincoat purchase must be in the future'.

**Error: past date given when today or future date needed**
- Highlight area: entire date input.
- Error message: ‘\[Information requested\] must be today or in the future’.
- Example: ‘Your dog’s next zoomies must be today or in the future'.

**Error: date is not on or after another particular date**
- Highlight area: entire date input.
- Error message: ‘\[Information requested\] must be the same as or after \[particular date and optional description\]’.
- Example: ‘Your dog’s next holiday must be on or after 2 April 2027 when you go on a roadtrip'.

**Error: date is not after another particular date**
- Highlight area: entire date input.
- Error message: ‘\[Information requested\] must be after \[particular date and optional description\]’.
- Example: ‘Your dog’s next blow-dry must be after 2 April 2026 when the groomer returns'.

**Error: date is not the same as or before another particular date**
- Highlight area: entire date input.
- Error message: ‘\[Information requested\] must be on or before \[particular date and optional description\]’.
- Example: ‘Your dog’s next hike must be on or before 2 January 2025'.

**Error: date is not before another particular date**
- Highlight area: entire date input.
- Error message: ‘\[Information requested\] must be before \[particular date and optional description\]’.
- Example: ‘Your dog’s next movie and pizza night must before 2 August 2027'.

**Error: date is not between 2 other dates**
- Highlight area: entire date input.
- Error message: ‘\[Information requested\] must be between \[earliest date\] and \[latest date and optional description\]’.
- Example: ‘Your dog’s next cuddles must be between 2 September 2026 and 3 September 2026'.

**Error: date uses known characters that aren’t allowed**
- Highlight area: relevant day, month and/or year fields.
- Error message: ‘The date must not include \[characters\]'.
- Example: ‘The date must not include + & ~'.

**Error: date uses unknown characters that aren’t allowed**
- Highlight area: relevant day, month and/or year fields.
- Error message: ‘The date must only include numbers'.

::DocsExample
---
id: forms-date-input--invalid
---
::

---

## Theming
Date input uses colour to show interactive states. A date input field in an active state will adopt the same colour as the overall site’s focus state colour. This means a user’s experience of a date input field remains consistent while it transitions from a focus to an active state.

::DocsThemeChooser
  ::DocsExample
  ---
  id: forms-date-input--default-story
  ---
  ::
::

To create your own theme see [theming guidance for designers](/design-system/design/theming-guidance-for-designers) or [theming guidance for developers](/design-system/develop/theming).

---

## Rationale
The active and focus states both use the site’s focus state colour. This creates a seamless user experience. If we used a different colour, keyboard users would have colour changes between focusing on and interacting with an input field. This could be jarring or confusing to users.

This occurs across all form and input elements, for a consistent experience.  
