---
title: Search bar
description: Allow users to enter keywords and search content on the website.
layout: page
label: Core

---

## Usage

Users often rely on search to find the information they need. You can use it as an alternative to on-page navigation.

Users will use keywords in the search bar, often using different words or phrases. Search is useful for sites with a lot of pages.

The search bar includes:

- text - placeholder and input text
- search button label
- search button icon
- optional predictive list - present suggested keywords to the user
- optional refine search link - expand to present advanced filters to the user.

::DocsExample
---
id: core-navigation-search-bar--default-story
---
::

### How this component works 

#### Input Text
Include short, descriptive placeholder text. This tells the user what they can search for.

The text the user inputs replaces the placeholder text.

#### Search button
The search button contains a button label and search icon.

To allow more space for text in the search bar, the responsive variation:

- hides the button label
- displays a search icon on smaller devices only.

Users know that magnifying glass indicates a search function. Because of this, on small screen we don't pair it with the word 'search' due to space limitations. However, it is kept in the code for screen readers.

The search button must submit an action, which reduces the time it takes to use the search bar. A user can enter their own search word or select a suggestion if that option is available. The search submits once a user selects 'enter' or 'return',

The search keyword remains once the search results display.

####  Predictive keyword list

Making suggestions can improve the user experience. This can lead to less spelling errors and less effort for the user to reach their result.

Useful suggestions can help guide users to their destination.

Keyword suggestions should be in a compact and organised list.

Provide suggestions after the user enters the third character. This reduces user effort. But don’t overwhelm users with a lot of suggestions. Keep the amount of suggestions under 10.

Allow for keyboard navigation through the suggestions:

- The user should be able to scroll through the items.
- Once the user goes past the last item, they should return to the top. This should be the same going in reverse, but appear at the bottom.
- The Esc key should allow users to exit the list.

### When and how to use

- Use the search bar for site search.
- Use default search field on white page background
- Use reverse search field on grey background
- Use menu variant in the mega menu only
- Use only default and reverse variants with predictive list suggestions
- Even if it's hidden, still use a label. This is for screen readers
- Keep placeholder text concise and descriptive

### When and how not to use

- Don't use default or reverse variants in the mega menu
- Don't use filters or refine search with the menu variant
- Don't use multiline search inputs
- Revised search shouldn't be by default
- Don't use with the refine search link if no filters are available 

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
id: core-navigation-search-bar--default-story
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
  id: core-navigation-search-bar--default-story
  ---
  ::
  ::DocsExample
  ---
  id: core-navigation-search-bar--menu
  ---
  ::
::

To create your own theme, see [theming guidance for designers]() or [theming guidance for developers]().
