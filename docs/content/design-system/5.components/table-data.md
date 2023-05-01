---
title: Table data
description: Display complex data in a table with optional expandable rows.
layout: page
label: Core
links:
- text: Figma
  url: #colour
- text: Storybook
  url: #component
---

## Usage
Table data is a systematic grid of data or content, displayed in rows and columns. It can help users scan, analyse and compare data and content. It is best used to display complex data sets.

The table responds on smaller screens. It has the option of expandable extra information in nested rows.

A table can include a combination of:
- row and/or column headings that help users know what the rows and columns represent
- body rows that display data or content
- a table caption that helps users find, navigate and understand tables. This should describe the tables contents
- a table footer that provides additional details, if required
- an expandable section with expandable rows. These can show extra related or supplementary information or data.

For simple data or content, consider using the [Table content](https://deploy-preview-457--ripple-docs.netlify.app/design-system/components/table-content/) component instead.

::DocsExample
---
id: core-containers-data-table--structured-content
---
::

## How this component works
Table content should be left-aligned because we read left-to-right. However, tables with financial figures should have numeral columns set to right-aligned.

Only left-align numbers that are arbitrary identifiers, known as 'nominal numbers'. These are numbers you cannot compare or combine arithmetically. These can include postal codes, IP addresses, or phone numbers. Column headers follow the alignment of the data.

The data table use a zebra stripe styling which, alternates table row colours. This makes it easier for the user to scan horizontal information.

Don't allow for too many columns as it's easier for users to scan down a list than to scroll across a page. So, consider more rows before more columns.

If you're using a mobile stacked variant, never use row sorting. Sorting won’t work because the column headers are hidden at narrow widths. Instead, they feature in each row's cell content.

### When and how to use
- Add a caption or footer, if required.
- Use for complex content and data sets.
- Align numbers to the right.
- Align headers according to their column data.

### When and how not to use
- Don't repeat the same content in both the caption and summary.
- Don't use with long form content. Cell content should be brief and scannable.
- Don't use without zebra striping.
- Don't centre align content.

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

To create your own theme see [theming guidance for designers]() or [theming guidance for developers]().

