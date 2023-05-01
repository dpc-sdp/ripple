---
title: Table content
description: Tables make it easier for users to scan and compare data and content.
layout: page
label: Core
links:
- text: Figma
  url: #colour
- text: Storybook
  url: #component
---

## Usage
A table is a systematic grid of data or content. They display in rows and columns to let users compare information.

Users tend to read tables one row or column at a time. So, it's important that content is simple and logical.

A table can include a combination of:
- row and/or column headings, which helps users know what the rows and columns represent
- body rows, which is for the table's main content
- table caption, which helps users find, navigate and understand tables. This should describe the table's contents
- table footer, which can provide extra details.

For complex data, consider using the [Table data]() component instead.

::DocsExample
---
id: core-containers-content--table-header-caption
---
::

### How this component works
Table content should be left-aligned because we read left-to-right. However, tables with financial figures should have numeral columns set to right-aligned.

Don't allow for too many columns as it's easier for users to scan down a list than to scroll across a page. So, consider more rows before more columns.

Occasionally, you may want to merge some cells in a table heading row. Don't overuse merged cells as they can be difficult for screen readers, especially in complex data tables.

### When and how to use
- Add a caption or footer, if required.
- Use for simple content and data sets.
- Align numbers to the right.

### When and how not to use
- Don't repeat the same content in both the caption and summary.
- Don't use with long form content. Cell content should be brief and scannable.
