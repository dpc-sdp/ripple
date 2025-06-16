---
title: Tabs
description: The Tab component lets you organise related content so that users can switch between related information on the same page.
layout: page
label: Core

---

## Usage

Use tabs to let users stay on the same page, but access more content. 

Only one tab is active at a time. Tabs help users navigate between, and display and hide, relevant content on your page so long as:
- you can split, categorise and clearly label the content
- there is a section more relevant for most users, which is placed first
- seeing the all sections at the same time is not needed
- you have a minimum of 2 tabs.

Use tabs to organise content so a user doesn't have to navigate away to complete their task. Tabs are useful for maps or dashboards.

Never use tabs if your content is sequential. Use it to present related content together, as a group.

Tabs include:

- labels
- an optional icon.

Icons tell the user the category of content under a tab. Keep icons simple and easily understood, and reinforce the label.

::DocsExample
---
id: core-navigation-tabs--default
---
::

### When and how to use

- Order your tabs according to importance.
- Labels should clearly and succinctly describe the content within the tab.
- Only use tabs to group content that all sits at the same level of hierarchy.
- Limit labels to one word and ensure they are unique.

### When and how not to use

- Never use tabs within tabs.
- Don't display disabled tabs.
- Don't display more than one row of tabs when using the horizontal variant.
- Don't use tabs for important information, since a user will choose which tab to open, so they may not see some content.
- Don't use if your content is short, instead use lists or paragraph text.
- Tabs are not a substitute for primary navigation, so never use tabs as primary navigation.
- Don't use tabs to tell the user about their progress through a page or content.
- Don’t use tabs when the user needs to compare information, since only one tab is visible at a time.

---

## Variants

Tabs have 2 display variants:
- default
- vertical.

### Default

The default variant sets the tab group bottom border to span the full available content width.

::DocsExample
---
id: core-navigation-tabs--default
---
::

### Vertical

The vertical variant sets the tab group left border to span the height of the tab group.

::DocsExample
---
id: core-navigation-tabs--vertical
---
::

---

## Theming

Tabs use colour to represent interaction states.

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-navigation-tabs--default
  ---
  ::
::

To create your own theme see [theming guidance for designers](/design-system/design/theming-guidance-for-designers) or [theming guidance for developers](/design-system/develop/theming).
