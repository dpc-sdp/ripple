---
title: Vertical navigation
description: A vertical list of links to help users navigate a section of related pages.
layout: page
label: Core

---

## Usage
The vertical navigation component:
- displays the user's current position in your site's content hierarchy
- helps users to move between different sections and other related content
- supports four levels of hierarchy nesting 
-   supports a heading. 

Place the vertical navigation next to a page's body content. This helps users navigate a section of related pages.

We've hidden child page navigation by default, and the user can reveal them via a chevron. When they select a parent section, it expands and displays the children pages. 

The chevron remains upturned until a user closes it. This tells the user which sections they are in, reducing visual complexity.

::DocsExample
---
id: core-navigation-vertical-navigation--vertical-navigation
---
::

### When and how to use
- Use in a page's sidebar.
- Always keep the navigation links short. You can use a shorter version of the page title.
- Display up to 4 levels of navigation.
- Add a link for the section's 'home' page.
- Use with at least 4 links.

### When and how not to use
- Don't embed on a page that doesn't have a sidebar.
- Don't add more than four child levels. The indentation will become indiscernible, which affects usability.
- Don't use on a site with less than 5 pages.
- Don’t use with icons.
- Never use it to link to other sites.

---

## Theming
Vertical navigation uses colour to highlight the current page the user is on. 

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-navigation-vertical-navigation--vertical-navigation
  ---
  ::
::

To create your own theme see [theming guidance for designers]() or [theming guidance for developers]().

---

## Rationale
The current page active state shows which page a user is currently on. It uses an underline (that is, something other than colour) to meet [Web Content Accessibility Guidelines 2.0 Success Criterion 1.4.1](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-without-color.html).

> **[1.4.1](https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-without-color) Use of Color:** Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.

