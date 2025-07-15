---
title: Callout
description: The Callout component is a text excerpt that draws attention to specific or important content.
layout: page
label: Core
---

## Usage
Use callouts to:
- draw a user's attention
- add emphasis to the content
- provide a user with more information.

A callout repeats and highlights content already on the page. Use callouts sparingly. To maintain effectiveness, consider weaving this information into the page's main content.

::DocsExample
---
id: core-containers-content--callout
---
::

### When and how to use
- Highlight important information vital to the user.
- Place a callout in a prominent position on the page.
- Use with text only.

### When and how not to use
- Only feature one callout per page.
- Use no more than 2 paragraphs per callout.
- Don't put the callout at the bottom of the page.

---

## Variants
To allow for different levels of emphasis, a callout has 2 styles:
- accent
- neutral.

### Accent
Use the accent variant to add a high level of emphasis to the selected content. The callout accent can adopt any WYSIWYG type styles you choose.

::DocsExample
---
id: core-containers-content--callout
---
::

### Neutral
Use the neutral variant to give content a medium level of emphasis. The neutral callout uses a predefined type style that you cannot change.

::DocsExample
---
id: core-containers-content--callout-neutral
---
::

---

## Theming
The accent variant uses the site accent colour to:
- add visual prominence to the content
- aid hierarchy in the content area.

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-containers-content--callout
  ---
  ::
::

To create your own theme, see [theming guidance for designers]() or [theming guidance for developers]().

---

## Rationale
To enhance visual weight and aim to conform with [WCAG2.0 Criterion 1.4.1](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-without-color.html), Ripple callouts use:
- a thick left-hand border
- background colours
- padding.

> 1.4.1 Use of Color: Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element. (Level A)
