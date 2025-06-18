---
title: Dropdown
description: The Dropdown component lets users see a list of available options and then select one or more options.
layout: page
label: Core

---

## Usage
Use this component to let users select one or more items from a dropdown list of available items.

It can be helpful when users need to choose from 6 or more options. It can also be used when listing all options in checkboxes or radio buttons is not viable.

Dropdowns should only be used as a last resort. For example, to find a compromise between usability and keeping the layout compact and clear.

Many users find dropdowns hard to use. Dropdowns hide content by default and create user confusion, cross-device issues and limited accessibility. Use radio buttons, checkboxes or input fields for most small lists instead.

A compromise might be needed for a long list of options (for example, all dog breeds). Or, when option description lengths vary or wrap over multiple lines. These situations also confuse users by creating layout issues for checkboxes, input fields or radio buttons.

A dropdown is often called a 'select'.

::DocsExample
---
id: forms-dropdown--single-select-many-items
---
::

### How this component works
You must use a form label with a dropdown.

You can use a dropdown with:
- requirement label
- hint text
- placeholder text.

#### Single select 
A single select dropdown is used when users can select only a single option.

#### Multi select
If using a multi select dropdown, always tell the user how many menu options they can select. Add extra instructions in the hint text to guide them. For example, 'Select up to 3 options'.

Even though users can choose multiple items in a multi select dropdown, they often find this confusing. checkboxes could be better.

#### Hint text
Hint text can be used to tell the user what, or how, to successfully complete a dropdown.

For example, hint text can include:
- an overall description of the dropdown
- hints for what kind of information needs to be input
- specific formatting examples or requirements.

Only use hint text where it’s needed. Don’t repeat the label. Don’t use it just to keep the layout consistent with other fields in the form.

#### Placeholder text
Avoid using placeholder text where possible. It disappears when a user starts typing. Not all screen readers will read out placeholder text. Its colour often lacks the contrast needed for accessible content when using some browser default styling.

If placeholder text can’t be avoided, don’t use it to replace a label or hint text. Don’t use it to show an example or to include any critical information. Placeholder text for the dropdown trigger must clearly tell the user its purpose.

#### Selected value
The selected value shows the option a user has selected.

#### Text overflow
When the field label and menu text are too long for the available horizontal space, they wrap to form another line.

The field text itself truncates at the end, but the text can be shown in full in the menu.

#### Menu height
The dropdown menu has a maximum height of 288px or 6 single text-line options.

We recommend starting a scroll at the sixth option in the menu list. This may vary based on your specific use case.

### When and how to use
- Use as a last resort component.
- A label must be used with a dropdown.
- Ensure dropdown item descriptions are short and concise.
- Use when listing between 6 and (if possible) 15 items, if checkboxes or radio buttons can’t be used.

### When and how not to use
- Never set the form to submit when a dropdown item is selected.
- Don’t write long menu option descriptions.
- Descriptions should not wrap over a single line.
- Icons or decorative images should never be used in dropdowns.
- Do not use a dropdown for listings less than 6 options, consider using radio buttons or checkboxes.
- Do not use a dropdown without a label as it confuses users and is not accessible.

---

## Variants
Dropdown has 2 main variants:
- single select
- multi select.

Both variants have default and reverse sub-variants.

### Single select
A single select dropdown is used when users can select only a single option.

#### Making a selection
- Placeholder text is shown by default in the field when the dropdown is closed.
- Interacting with a closed field opens a menu of options.
- The dropdown closes when an option is chosen.
- The selection option replaces the placeholder text, but also remains in place if the menus is opened.
- The selected option then has a tick to the left of the option in the open menu, to remind the user of the selected value.

#### Default
::DocsExample
---
id: forms-dropdown--single-select-many-items
---
::

#### Reverse
::DocsExample
---
id: forms-dropdown--reverse-variant
---
::

### Multi select
Users can choose multiple items in a list or to filter information.

If using a multi select dropdown, always tell the user how many menu options they can select. 

Add extra instructions in the hint text to guide them. For example, 'Select up to 3 options'.

#### Making a selection
- Placeholder text is shown by default in the field when the dropdown is closed.
- When the menu is opened, each option shows a checkbox input to the left of its text.
- When options are being selected, the menu stays open.
- The selected options replaces the placeholder text. When selected options extend beyond the width of the field, the values truncate. A ‘+#’ appears to the right of the field, to show how many unseen options (#) are selected.
- As multiple selections are possible, the user needs to interact outside the dropdown, or on the field, to close the menu.

#### Default

::DocsExample
---
id: forms-dropdown--multi-select-many-items
---
::

#### Reverse

::DocsExample
---
id: forms-dropdown--reverse-variant
argsString: 'multiple:true'
---
::

### Error
All form inputs share error state styling.

Always have specific error messages for specific errors. Users need to understand why their input or selection was not valid.

When creating an error message for a dropdown, use the wording below.

**If nothing is selected and the question has options in it**

Structure this message to help the user to choose which options apply to them. 
- Error message: ‘Select if \[options\]’.
- Example: ‘Select if you like summer, winter, autumn, and/or spring.'

**If nothing is selected and the question does not have options in it**

Structure this message to help the user to choose which options apply to them. 
- Error message: ‘Select [options]’. 
- Example: 'Select your favourite season'.

::DocsExample
---
id: forms-dropdown--error
---
::

---

## Theming
Dropdown uses colour for:
- interactive states
- icons.

A dropdown in an active state will adopt the same colour as the overall site’s focus state colour. This means a user’s experience of a dropdown remains consistent while it transitions from a focus to an active state.

::DocsThemeChooser
  ::DocsExample
  ---
  id: forms-dropdown--multi-select-many-items
  ---
  ::
::

To create your own theme see [theming guidance for designers](/design-system/design/theming-guidance-for-designers) or [theming guidance for developers](/design-system/develop/theming).

---

## Rationale
The active and focus states both use the site’s focus state colour. This creates a seamless user experience. If we used a different colour, keyboard users would have colour changes between focusing on and interacting with an input field. This could be jarring or confusing to users.

This occurs across all form and input elements, for a consistent experience. 
