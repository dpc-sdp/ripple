---
title: Results listing
description: Display a list of results to users displaying key information related to the search.
layout: page
label: Core
links:
- text: Figma
  url: #colour
- text: Storybook
  url: #component
---

## Usage

Use a results listing to display content results, like search results or news items. It surfaces important information to the user.

This component includes:

- Title, to identify the page or result title
- Summary, to sum up the content for the user
- URL, which tells the user where the content is
- Featured content, which gives key items visual prominence
- Topic/Category, which is a way to give a user greater context over the item
- Date, which can display a published or updated date. Only use if it will improve the user experience and is relevant to the content
- Keyword term bold styling, which gives visual prominence to the search keyword term

When displaying the results listing, consider a user's needs. Only display what will help them to make an informed decision.

::DocsExample
---
id: core-navigation-result-listing--result-listing
---
::

### When and how to use

- Bold the search term
- Test results. They must always be accurate and relevant
- Keep descriptions short, no more than 150 words
- Display up to 10 results

### When and how not to use

- Don't display the result title only
- The title shouldn't be the only interactive element. Ensure the entire item is interactive
- Don't use both updated date and published date. Choose one only
- Don't display more than 10 results

---

## Variants

A result listing's two main variants are:

- default
- simple.

### Default

The default results listing has the option of surfacing key information when required.

Key information can include:

- audience
- status
- grants metadata such as grant value

The default variant users the 'updated date' by default.

::DocsExample
---
id: core-navigation-result-listing--with-details
---
::

### Simple

The simple variant displays the page title with accompanying metadata.

It uses the published date by default, which pulls in from the metadata.

We recommend using this variant when displaying simple results, like news items.

::DocsExample
---
id: core-navigation-result-listing--with-meta
---
::

---

## Theming

Results listing uses colour for:

- icons
- indicating to the user there is an interaction
- interactive states.

When displaying key information such as status, the icon should adopt the relevant semantic colour.

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-navigation-result-listing--with-details
  ---
  ::
::

To create your own theme, see [theming guidance for designers]() or [theming guidance for developers]().
