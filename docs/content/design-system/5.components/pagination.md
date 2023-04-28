---
title: Pagination
description: Pagination helps users navigate forwards and backwards through content.
layout: page
label: Core
links:
- text: Figma
  url: #colour
- text: Storybook
  url: #component
---

## Usage

Pagination breaks down content, making it more concise and less overwhelming. It does this by dividing your content across more than one page and into smaller lists. This makes it easier for users to find what they need.

Examples include:

- search results or guidance divided into multiple website pages
- a collection of cards or media items.

Pagination helps users to identify:

- how many pages or items they can navigate through
- where the page or item they are viewing sits in the order of other pages or items
- how they can immediately navigate to other pages or items

Pagination sits at the bottom of each page. It's a quick and easy way for users to move between each page.

Use pagination if your list has 10 or more results.

Pagination identifies the page each result sits on. This makes it convenient for users to find again.

::DocsExample
---
id: core-navigation-page-links--page-links
---
::

### When and how to use

- Stack Standard pagination variant links vertically
- Only use Standard and Complex variants at the bottom of the body content area
- Use the Simple variant nested in components. For example, the [Media Gallery](/design-system/components/media-gallery/) or [Carousel](/design-system/components/carousel/)
- Use an ellipses to replace any skipped pages
- Use pagination to avoid an infinite scroll of results, which can be a problem for keyboard users

### When and how not to use

- Don't use pagination for one page only
- Only choose one pagination variant, never mix or combine them
- Always put the user first, so don't break up content if it reduces usability or performance
- Don't user pagination if a user journey is linear, like when completing a form

---

## Variants

Pagination has three main variants:

- Simple, for a small number of items or used in other components.
- Standard, to navigate through a sall number of pages.
- Complex, when there are a large number of pages to navigate through.

### Simple

The simple variant is for navigating through a small number of items. Use it to nest pagination in other components, like [Media Gallery](/design-system/components/media-gallery/), [Media Fullscreen](/design-system/components/media-fullscreen/) and [Carousel](/design-system/components/carousel/).

::DocsExample
---
id: core-navigation-pagination--simple-tally
---
::

### Standard

The standard variant is for navigating through a small number of pages. It has two options for label display:

- Page titles.
- Page numbers.

You can use page titles to give more context.

When stacking the links, do it vertically. This helps screen magnifier users when they have zoomed in to better read the content.

Never show the previous page link on the first page because it will confuse the user. The same goes for the next page link on the final page.

#### Page Title

::DocsExample
---
id: core-navigation-page-links--page-links
---
::

#### Page Number

::DocsExample
---
id: core-navigation-page-links--example-count
---
::

### Complex

The complex variant lets users navigate through a large number of pages. It's ideal for a long list of search results.

The user can use the next and back controls to move forward and backward through the pages. The user can navigate straight to a page by selecting its specific page number.

Three pages should always remain highlighted:

- The first page.
- The current page.
- The last page.

Never show the previous page link on the first page because it will confuse the user. The same goes for the next page link on the final page.

Display page numbers for the:

- current page on all screen sizes
- previous and next pages on smaller screens sizes
- page immediately before and after the current page on larger screen sizes
- first and last pages on all screen sizes.

::DocsExample
---
id: core-navigation-pagination--complex
---
::

---

## Theming

Pagination uses colour for:

- icons
- interactive states

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-navigation-page-links--page-links
  ---
  ::
  ::DocsExample
  ---
  id: core-navigation-pagination--complex
  ---
  ::
::

To create your own theme, see [theming guidance for designers]() or [theming guidance for developers]().
