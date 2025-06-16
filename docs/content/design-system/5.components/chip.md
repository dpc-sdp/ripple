---
title: Chip
description: The Chip component is an interactive element to draw a user’s user attention to a category.
layout: page
label: Core

---

## Usage
Use chips to represent options in a specific context. They are unlike buttons, which are persistent across contexts.

A chip labels or draws attention to categorised content. Chips can be interactive and help users navigate to relevant content easily.

When displaying multiple chips together, place them in a row.

::DocsExample
---
id: core-navigation-chip--default
---
::

### When and how to use
- Include keywords.
- Use on any content page.
- Link through to the topic page.

### When and how not to use
- Don’t include punctuation.
- Don’t use as a heading.
- Don’t include more than 4 words.
- Don’t use without an interaction or link.

---

## Chips or buttons? 
While chips and buttons both prompt calls to action, they are different.

Multiple chips should all sit together. Buttons should sit separately from each other. 

Chips react to their context, but buttons are fixed and remain static.

Chips convey forking paths in a user experience, while buttons show a linear step.

---

## Variants
The chip has a default and reverse variant, allowing flexible use across a range of backgrounds.

### Default
::DocsExample
---
id: core-navigation-chip--default
---
::

### Reverse
Use the reverse variant when the chip appears on the primary colour.

::DocsExample
---
id: core-navigation-chip--reversed
---
::

---

## Theming
The chip uses the primary and primary-accessible colour tokens. This is to meet colour contrast requirements when theming.

If the site primary colour is ‘light’, the chip content will display in the type-default colour. The border will always take on the site primary colour. 

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-navigation-chip--default
  ---
  ::
::

To create your own theme see [theming guidance for designers](/design-system/design/theming-guidance-for-designers) or [theming guidance for developers](/design-system/develop/theming).
