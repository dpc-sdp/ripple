---
title: Search bar
description: The Search bar shows a text input field with a search button to let users enter keywords and search content on the website.
layout: page
label: Core

---

## Usage

Use the search bar to help users find what they are looking for.

Users often rely on search to find the information they need. You can use it as an alternative to on-page navigation.

Users will use keywords in the search bar, often using different words or phrases. Search is especially helpful for users when navigating site that have many pages. 

The search bar includes:

- text - placeholder and input text
- search button label
- search button icon
- optional predictive list - present suggested keywords to the user
- optional refine search link - expand to present advanced filters to the user.

::DocsExample
---
id: core-navigation-search-bar--default
---
::

### How this component works 

#### Input text
Include short, descriptive placeholder text. This tells the user what they can search for.

The text the user inputs replaces the placeholder text.

#### Search button
The search button contains a button label and search icon.

Smaller devices show a responsive variant with:
- only a search icon
- no button label. 

This gives the user more space to write search text. Users know that a magnifying glass represents a search function. 

The word ‘Search’ must appear in the alt text for screen readers.

The button type should be a submit button. This lets a user conduct a search:
- using the enter/return key
- using fewer keystrokes
- by choosing a suggestion (if applicable)
- that afterwards, still displays the search keyword. 

####  Predictive keyword list

Useful suggestions let users find what they need with less effort. They also reduce spelling errors and typing.

Use a short, ordered list of no more than 10 keyword suggestions.

They should appear after only a few keystrokes.

Let the user scroll through keyword suggestions using keyboard navigation, with the Esc key to exit. 

Scrolling ‘down’ past the last suggestion should loop the user back to the first one. Scrolling ‘up’ before the first suggestion should loop the user to the last (bottom) one.

### When and how to use

- Use the search bar to let users search your site (site search).
- Use default search field on white page background.
- Use reverse search field on grey background.
- Use menu variant in the mega menu only.
- Use only default and reverse variants with predictive list suggestions.
- Even if it's hidden from view, always use a form label for screen readers.
- Keep placeholder text concise and descriptive.

### When and how not to use

- Don't use default or reverse variants in the mega menu.
- Don't use filters or refine search with the menu variant.
- Don't use multiline search inputs.
- Revised search shouldn't be by default.
- Don't use with the refine search link if no filters are available.

---

## Variants

The 3 search variants include:

- default
- reverse
- menu.

### Default

This is standard search. The button initiates search based on the text input.

::DocsExample
---
id: core-navigation-search-bar--default
---
::

### Reverse

Use the reverse variant when on a neutral background and you can't use the default variant.

::DocsExample
---
id: core-navigation-search-bar--reverse
---
::

### Menu

Use this in the mega menu. See [Primary Navigation](/design-system/components/primary-navigation/) for more information.

::DocsExample
---
id: core-navigation-search-bar--menu
---
::

---

## Theming

The search bar uses colour for:

- indicating an action to users
- interaction states.

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-navigation-search-bar--default
  ---
  ::
  ::DocsExample
  ---
  id: core-navigation-search-bar--menu
  ---
  ::
::

To create your own theme, see [theming guidance for designers]() or [theming guidance for developers]().
