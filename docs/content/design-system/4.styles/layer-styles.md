---
title: Layer styles
description: 
layout: page
label: Core

---

## Border
Borders create separation between elements and aid hierarchy and navigation. They are a solid border on one or more sides of an object or container.

Depending on where a border is being used, it can appear in 4 different thicknesses, 1px, 2px, 4px or 8px.

You can use a border to:
- separate or segment blocks or sections of content
- highlight important elements such as featured content or a call to action
- aid information hierarchy
- support navigational structure
- highlight an active navigation item.

::DocsLayerStyleTable
---
type: border
---
::

### Usage
Find examples of borders that add visual consistency on the [in-page navigation](/design-system/components/in-page-navigation/), [cards](/design-system/components/card/) and [contact us](/design-system/components/contact-us/) pages. 

Borders can also segment content (like on banners).

::DocsExample
---
id: core-navigation-in-page-navigation--in-page-navigation
hideCode: true
---
::

---

## Border Radius
Border radius allows you to add rounded corners to elements such as a button or container. Border radius can create a more user-friendly and approachable look and feel.

We've defined a set of radius values for use.

::DocsLayerStyleTable
---
type: border.radius
---
::

### Usage
Border radius is on containers such as buttons, cards and form inputs.

::DocsExample
---
id: core-navigation-button--default-filled
hideCode: true
---
::

> When a container has a defined border radius, but is in focus, discard the border radius.
>
> A 0px value is applied for consistency and clarity.

---

## Elevation
Elevation adds depth to components.

Depth is depicted by placing elements at various points along the positive z-axis extending towards the viewer.

::DocsLayerStyleTable
---
type: elevation
---
::

### Usage
Elevation is on components such as cards, button (elevated variant only) and breadcrumbs.

Elevation helps components to stand out. You can use them to flag interactivity, such as when a user hovers over a card or when a modal is open.

::DocsExample
---
id: core-navigation-breadcrumbs--default
hideCode: true
---
::
