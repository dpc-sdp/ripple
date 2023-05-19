---
title: Skip link
description: The skip link helps keyboard users skip to the main content on a page.
layout: page
label: Core
links:
- text: Figma
  url: #colour
- text: Storybook
  url: #component
---

## Usage

Users can use their keyboard to navigate through links and form elements. Including this component allows them to bypass the top-level navigation links and send them directly to the main page content.

The skip link component will not display until a keyboard press activates it. When visible, it's always the first item on a page and pushes down all page content.

**I don't think this is the correct example**

::DocsExample
---
id: core-layout--back-to-top-and-skip-links
---
::

### When and how to use

- It must be on every page
- When visible, it must be the first element on the page

### When and how not to use

- Only use at the top of the page
- Don't edit the styling
- Don't overlay page content. It must push down the page content

---

## Theming

The skip link adopts the site focus state colour for a consistent focus state experience.

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-layout--back-to-top-and-skip-links
  ---
  ::
::

To create your own theme, see [theming guidance for designers]() or [theming guidance for developers]().
