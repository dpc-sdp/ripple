---
title: Breadcrumb
description: The Breadcrumb component shows a user their location on a website. This allows quick navigation between page levels.
layout: page
label: Core

---

## Usage

Use breadcrumbs to help users understand where they are within a website’s structure. A breadcrumb shows as a series of links and icons in a line. 

A breadcrumb displays the parent page, icons and the current page.

- Parent page: this links to the page above the current page in the information architecture.
- Icons: chevrons (v-shaped icons) sitting between the parent and current pages are designed to visualise site hierarchy.
- Current page: this is the page the user is currently on.

::DocsExample
---
id: core-navigation-breadcrumbs--default
---
::

### When and how to use
- Display the breadcrumb at the top left of a page, below the main navigation but above the page title.
- Always start the breadcrumb with the parent page.
- Always end the breadcrumb with the current page.
- Truncate longer names if you've reached the maximum amount of links.

### When and how not to use
- The breadcrumb does not replace primary navigation.
- Do not use the breadcrumb to show progress through a linear journey.

---

## How the Breadcrumb works

On devices with a page resolution under 768px, the breadcrumb displays the parent link only.

---

## Theming

The Breadcrumb uses colour to: 

- represent possible interactions 
- interactive states.

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-navigation-breadcrumbs--default
  ---
  ::
::

To create your own theme, see [theming guidance for designers](https://www.vic.gov.au) or [theming guidance for developers](https://www.vic.gov.au).
