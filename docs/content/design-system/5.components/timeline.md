---
title: Chip
description: An interactive element to draw user attention to a category.
layout: page
label: Core
links:
- text: Figma
  url: #colour
- text: Storybook
  url: #component
---

## Usage
Chips represent options in a specific context. They are unlike buttons, which are persistent.

A chip labels or draws attention to categorised content. They can be interactive and help users navigate to content easily.

When displaying multiple chips together, place them in a row.

::DocsExample
---
id: core-navigation-chip--default-story
---
::

### When and how to use
- Include keywords.
- Use on any content page.
- Link through to the topic page.

### When and how not to use
- Don’t include punctuation.
- Don’t use them as a heading.
- Don’t include more than 4 words.
- Don’t use without an interaction or link.

---

## Chips or Buttons? 
While chips and buttons both prompt calls to action, they are different.

Chips should sit together, and buttons separate.

Chips have context and react, where buttons remain static.

Chips represent forking paths in a user experience, while buttons represent a linear step.

---

## Variants
The chip has a default and reverse variant, allowing for flexibility of use on a range of backgrounds.

### Default
::DocsExample
---
id: core-navigation-chip--default-story
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
  id: core-navigation-chip--default-story
  ---
  ::
::

To create your own theme see [theming guidance for designers]() or [theming guidance for developers]().

