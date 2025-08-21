---
title: Timeline
description: The Timeline component contains blocks of content displayed in a linear order.
layout: page
label: Core
---

## Usage
A timeline displays a visual journey of short blocks of content in a linear order. Each block can be actionable for users to navigate through to related content.

A timeline can include a combination of:
- heading
- subheading
- summary
- image.

Use timelines to show a clear and sequential order of information. This assists users in linking pieces of information together.

Some examples include:
- dates
- steps
- stages
- events
- actions
- outcomes.

The timeline component is ordered from top to bottom.

Use between 3 to 8 discrete sections of content, so the user is not overwhelmed.


::DocsExample
---
id: core-containers-timeline--default-story
---
::

### When and how to use
- Always include a title for the entire timeline.
- Add a heading, subheading, short summary and optional image for each block.
- Only include 3 to 8 blocks per timeline.
- Add a link if you're providing more details on another page.

### When and how not to use
- Don't add fewer than 3 or more than 8 blocks.
- Don't use without a heading for each block.
- Never include unrelated content.
- Don't use if content doesn't flow in a sequential or linear order. Consider bullets points instead.

---

## Variants
Timeline has 2 variants:
- default
- progressive.

### Default
This is for steps or stages along a process. Use the default timeline when progress is not relevant to the user.

::DocsExample
---
id: core-containers-timeline--default-story
---
::

### Progressive
Use the progressive variant to show the progress or status of the content to the user.

::DocsExample
---
id: core-containers-timeline--progressive-active-2
---
::

---

## Theming
Timeline uses colour to:
- show progress
- highlight interactive states.

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-containers-timeline--progressive-active-2
  ---
  ::
::

To create your own theme see [theming guidance for designers](/design-system/design/theming-guidance-for-designers) or [theming guidance for developers](/design-system/develop/theming).
