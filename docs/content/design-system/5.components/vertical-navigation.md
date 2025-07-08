---
title: Vertical navigation
description: The Vertical navigation component displays a list of links to help users navigate a section of related pages.
layout: page
label: Core
---

## Usage
Use vertical navigation to help users navigate a section of related pages.

Use vertical navigation to:
- let users find and navigate to relevant information
- show the user where, within your site’s content hierarchy, the page they are viewing is located
- show 4 nested content sections (parent sections) and a heading for the names of each section.

Vertical navigation is placed next to your page’s body content. 

A chevron (v-shaped icon) next to each parent section lets users expand that parent section. This reveals the names of content pages falling within the parent section (child pages). Child page links are hidden by default. 

The chevron flips up and parent sections stay expanded until the user interacts with the chevron to hide the child pages. This helps the user find what they need and minimises visual clutter.

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
- Don't add more than 4 child levels. Users will not see the indents, so navigation will become confusing.
- Don't use on a site with fewer than 5 pages.
- Don’t use with icons.
- Never use it to link to other sites.

---

## Theming
Vertical navigation uses colour and active state focus to highlight the current page the user is on. 

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-navigation-vertical-navigation--vertical-navigation
  ---
  ::
::

To create your own theme see [theming guidance for designers](/design-system/design/theming-guidance-for-designers) or [theming guidance for developers](/design-system/develop/theming).

---

## Rationale
To show the user which page in the vertical navigation they are currently on, the active state is used. This displays as an underline in addition to colour, to aim to conform with the [Web Content Accessibility Guidelines 2.0 Success Criterion 1.4.1](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-without-color.html).

> **[1.4.1](https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-without-color) Use of Color:** Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.
