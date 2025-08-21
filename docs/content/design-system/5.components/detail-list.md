---
title: Detail list
description: The Detail list component shows a list of key information to users.
layout: page
label: Core
---

## Usage

Use the detail list to display a list with labels. This surfaces (retrieves and displays) and highlights key information to users.

Each row of the detail list comprises a:
- label, a descriptive or informative label for your content, for example, 'Location'
- content, the piece of information itself, for example, 'East Gippsland'.

The detail list is used to display:
- metadata, for example, ‘Published date' (which shows as '22 March 2023’)
- status, for example of a program or grant.

Only use the detail list for simple information. For data or complex information, consider using a table.

::DocsExample
---
id: core-containers-description-list--with-link
---
::

### When and how to use
- Use single words only for the label.
- Include a link if you need to.
- Keep the summary content and labels clear and concise.
- Align all summary content to the longest label.

### When and how not to use
- Don't use labels for unrelated summary content.
- Don't use it to surface information that is not important to users.
- Don't use with complex or long form content.

---

## Theming

When a link is present, the detail list uses the link colour for interaction states.

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-containers-description-list--with-link
  ---
  ::
::

To create your own theme, see [theming guidance for designers]() or [theming guidance for developers]().
