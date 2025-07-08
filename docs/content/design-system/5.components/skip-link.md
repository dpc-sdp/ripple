---
title: Skip link
description: The Skip link component makes your page more accessible and easier to navigate, by helping keyboard users skip to the main content on a page.
layout: page
label: Core
---

## Usage

Use skip links to let users:
- navigate quickly through links and form elements 
- navigate your page when interacting only through the keyboard
- let users navigate directly to the main page content. 

Skip links bypass the primary navigation links (the top horizontal menu items appearing on every page).

Until the user activates it through a keyboard press, a skip link won’t display.

When visible, it's always the first item on a page and pushes down all page content.

::DocsExample
---
id: core-layout-skip-links--stand-alone
---
::

### When and how to use
- It must be on every page.
- When visible, it must be the first element on the page.

### When and how not to use
- Only use at the top of the page.
- Don't edit the styling.
- Don't overlay page content. It must push down the page content.

---

## Theming

The skip link uses the site’s focus state colour. This creates a seamless user experience. If we used a different colour, keyboard users would have colour changes between focusing on and interacting with a skip link. This could be jarring or confusing to users.

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-layout-skip-links--stand-alone
  ---
  ::
::

To create your own theme, see [theming guidance for designers]() or [theming guidance for developers]().
