---
title: Option button
description: The Option button component is a set of buttons to help users filter content.
layout: page
label: Core
---

## Usage

Use option buttons to show a set of options a user can choose from to filter content or results.

The option button component contains labels showing a user how the filter will work.

::DocsExample
---
id: forms-option-buttons--squares
---
::

### How this component works

You must use a form label with option buttons. The form label explains what happens when a user chooses an option. For example, ‘Filter by starting letter’.

Always use descriptive labels for individual option buttons. Labels should help users choose, and say the category of content or results each option will show. This makes the content accessible, as screen readers will read out each label.

Never preselect an option button on default. Users might miss that a filter has been automatically applied.

### When and how to use

- Help users filter content or results.
- Use short labels only.
- Order labels in alphabetical order to help users scan quickly.
- Add an ‘apply filter’ button if the option button will be used together with other form elements.

### When and how not to use

- Don’t use for a call to action.
- Don’t use with long content.
- Never use without a form label.
- Never preselect an individual option button.

---

## Variants

Option buttons have 2 variants:

- default
- custom.

### Default

Default uses the alphabet as a filter in the option buttons.

::DocsExample
---
id: forms-option-buttons--squares
---
::

### Custom

The custom variant lets you create your own button labels as a filter.

These labels must clearly tell the user what filter will be applied.

::DocsExample
---
id: forms-option-buttons--fluid-widths
---
::

---

## Theming

Option buttons use colour to show interactive states. An option button in an active state will adopt the same colour as the overall site’s focus state colour. This means a user’s experience of that option button remains consistent while it transitions from a focus to an active state. 

::DocsThemeChooser
  ::DocsExample
  ---
  id: forms-option-buttons--squares
  ---
  ::
::

To create your own theme see [theming guidance for designers](/design-system/design/theming-guidance-for-designers) or [theming guidance for developers](/design-system/develop/theming).

---

## Rationale

The active and focus states both use the site’s focus state colour. This creates a seamless user experience. If we used a different colour, keyboard users would have colour changes between focusing on and interacting with an input field. This could be jarring or confusing to users.

This occurs across all form and input elements, for a consistent experience. 
