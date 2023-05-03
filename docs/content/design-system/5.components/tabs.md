---
title: Tabs
description: Tabs help users navigate between related sections of content. 
layout: page
label: Core
links:
- text: Figma
  url: #colour
- text: Storybook
  url: #component
---

## Usage

Tabs let users quickly switch between related information if:

- you can separate your content into clearly labelled sections
- the first section is more relevant (for most users) than the other sections
- users won't need to view all the sections at once.

Tabs allow users to navigate different sections without having to leave the page. They will always feature at least two options, and one tab is active at a time

Use tabs to organise content so a user doesn't have to navigate away to complete their task. Tabs are useful for maps or dashboards.

Don't use tabs if your content is sequential. Use it for related content, only.

Tabs include:

- labels
- an optional icon.

Icons tell the user what type of content is under a tab. Keep icons simple and recognisable, and reinforce the label.

::DocsExample
---
id: core-navigation-tabs--default-story
---
::

### When and how to use

- Order your tabs according to importance
- Labels should clearly and succinctly describe the content within the tab
- Only use tabs to organise related content that sit on the same level of hierarchy
- Limit labels to one word and ensure they are unique

### When and how not to use

- Never use tabs within tabs
- Don't display disabled tabs
- Don't display more than one row of tabs when using the horizontal variant
- Don't use tabs for important information. A user will choose which tab to open, so they may not see some content
- Don't use if your content is short. Instead use lists or paragraph text
- Never use tabs for your primary navigation
- Don't use tabs to indicate progress
- Don't use tabs if the user is comparing information in two groups. This will result in the user clicking back and forth to complete a task

---

## Variants

Tabs have two display variants:

- Default.
- Vertical.

### Default

The tab group bottom border will span the full available content width.

::DocsExample
---
id: core-navigation-tabs--default-story
---
::

### Vertical

The tab group left border will span the height of the tab group.

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
  id: core-navigation-tabs--default-story
  ---
  ::
::

To create your own theme see [theming guidance for designers]() or [theming guidance for developers]().
