---
title: Results listing
description: The Results listing component shows a list of search result items, with each item displaying key information relevant to that search.
layout: page
label: Core

---

## Usage

Use a results listing to display content results, like search results or news items. It surfaces (retrieves and shows) important information to the user.

A results listing shows multiple results items, each with their own:
- title, telling the user the name of the result
- summary, summing up the result’s content for the user
- URL, telling the user the website address for the result
- featured content, visually highlighting key content from the result
- topic/category, putting the result into its context within a broader page or site
- date, showing a result’s published (simple variant) or updated (default variant) date
- keyword term bold styling, showing the search term(s) in bold in the result displayed.

When displaying the results listing, consider a user's needs. Only display what will help them to make an informed decision.

::DocsExample
---
id: core-navigation-result-listing--default-story
---
::

### When and how to use
- Put the search term in bold.
- Test results so they are correct and relevant to the search term.
- Keep descriptions under 150 words. 
- Display up to 10 results.

### When and how not to use
- Don't display the result title only.
- Don’t make only the title interactive, ensure the entire result is interactive.
- Don't use both updated date and published date, choose one only.
- Don't display more than 10 results.

---

## Variants

A result listing's 2 main variants are:
- default
- simple.

### Default

The default results listing has the option of surfacing key information when required.

Key information can include:

- audience
- status
- grants metadata such as grant value.

The default variant users the updated date by default.

::DocsExample
---
id: core-navigation-result-listing--with-details
---
::

### Simple

The simple variant displays the page title with accompanying metadata.

It uses the published date by default, which is automatically pulled in from the metadata.

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
- indicating to the user there is an interaction possible
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
