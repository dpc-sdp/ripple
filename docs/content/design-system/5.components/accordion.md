---
title: Accordion
description: The Accordion component is a panel designed to save space by hiding and revealing content as required.
layout: page
label: Core

---

## Usage
Use accordions only if it will benefit the user. You should have evidence of this.

Using accordions will allow users to:
- view related sections of content quickly
- choose which content isn’t relevant to them by showing or hiding sections.

Always test accordions with users first. Depending on what the user needs, hiding content could present problems.

::DocsExample
---
id: core-containers-accordion--accordion
---
::

### When and how to use
- Fill the entire width of the content area.
- Embed into the body content area of any landing page.
- Use the 'numbered' variant when a sequential order is important.
- Include links and format text in accordions, as required.
- Use to conceal content that may only apply to specific users who can choose to show or hide content.
- Make sure accordion headings are descriptive and succinct.

### When and how not to use
- Never use a single accordion.
- Avoid putting all page content into accordions.
- Don't use accordions for important information all users need to read.
- Putting accordions in accordions can confuse the user.
- Don't use an accordion if doing so will slow the page load time.
- Don't disable sections.

### Collapse all/Expand all
Being able to collapse or expand all lets users open or close all accordions with one click. This reduces the amount of clicks required to reach their content.

Don't use this feature to help users find information. Expanding all accordions at once could defeat the purpose of having them. If a user has to do this, consider more descriptive titles.

The other option is to remove the accordions and display the content without them.

---

## Variants
The accordion has 2 variants:
- default
- numbered.

### Default

::DocsExample
---
id: core-containers-accordion--accordion
---
::

### Numbered
Use the numbered variant when it is important the content is read in sequential order.

::DocsExample
---
id: core-containers-accordion--accordion-numbered
---
::

---

## Theming
Accordions use colour to:
- represent interactions such as hover and active states
- give prominence to the active displayed content section.

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-containers-accordion--accordion
  ---
  ::
::

To create your own theme see [theming guidance for designers](/design-system/design/theming-guidance-for-designers) or [theming guidance for developers](/design-system/develop/theming).
