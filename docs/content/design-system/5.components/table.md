---
title: Table
description: The Table component makes it easier for users to scan and compare data and content.
layout: page
label: Core
---

## Usage
A table is a systematic grid of data or content. They display in rows and columns to let users scan, analyse and compare information.

Users tend to read tables one row or column at a time. So, it's important that content is simple and logical.

A table can include a combination of:
- row and/or column headings that help users know what the rows and columns represent
- body rows that display data or content
- a table caption describing its content and helping users find, navigate and understand its information
- a table footer that provides additional details, if required
- an expandable section with expandable rows, which can show extra related or supplementary information or data.

::DocsExample
---
id: core-containers-data-table--structured-content
---
::

### How this component works
Table content should be left-aligned because we read from left to right.  However, tables with financial figures should have columns that contain numerals set to right-aligned.

Only left-align numbers that are arbitrary identifiers, known as 'nominal numbers'. These are numbers you cannot compare or combine arithmetically. These can include postal codes, IP addresses, or phone numbers. Column headers follow the alignment of the data.

The data table uses a zebra-stripe styling which alternates table row colours. This makes it easier for the user to scan horizontal information.

Don't include too many columns as it's easier for users to scan down a list than to scroll across a page. So, consider more rows before more columns.

Tables can respond differently based on how your website is built. Where tables do not respond, they will display with a horizontal scroll bar to view all the content. Where tables do respond on smaller screens, tables will stack vertically. 

The complex variant has the option of expandable extra information in nested rows. This is shown by a dropdown toggle. 

### When and how to use
- Add a caption or footer, if required.
- Use for complex content and data sets.
- Align numbers to the right (except nominal numbers).
- Align headers according to their column data.

### When and how not to use
- Don't repeat the same content in both the caption and summary.
- Don't use with long form content. Cell content should be brief and scannable.
- Don't use without zebra-stripe styling..
- Don't centre-align content.

---

## Variants
Table has 2 variants:
- simple, best used for simple data.
- complex, best used for complex data.

### Simple

::DocsExample
---
id: core-containers-content--table-scrollable
---
::

### Complex
The complex variant is best used to display complex data sets.

::DocsExample
---
id: core-containers-data-table--structured-content
---
::

---

## Theming
Table data uses colour to indicate an action to the user.

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-containers-data-table--custom-content
  ---
  ::
::

To create your own theme see [theming guidance for designers](/design-system/design/theming-guidance-for-designers) or [theming guidance for developers](/design-system/develop/theming).
