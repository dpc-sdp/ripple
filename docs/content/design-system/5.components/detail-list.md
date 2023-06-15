---
title: Detail list
description: Display a list of key information to users.
layout: page
label: Core

---

## Usage

Detail List displays a list with labels. This surfaces and highlights key information to users.

Each row of the Detail List comprises a:

- Label, which is a description or information label, like 'Location'
- Content, which is the piece of information itself, such as 'East Gippsland'.

It's used to display:

- metadata like ‘Published Date', which would display like ‘22 March 2023’
- a status of a program or grant.

Only use the Detail List for simple information. For data or complex information, consider using a [table](design-system/components/table).

::DocsExample
---
id: core-containers-description-list--with-link
---
::

### When and how to use
- Use single words only for the label
- Include a link if you need to
- Keep the labels and summary content clear and concise
- Align all summary content to the longest label

### When and how not to use
- Don't use labels for unrelated summary content
- Don't use to surface information that is not important to users
- Don't use with complex or long form content

---

## Theming

When a link is present, Detail List uses the link colour for interaction states.

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-containers-description-list--with-link
  ---
  ::
::

To create your own theme, see [theming guidance for designers]() or [theming guidance for developers]().
