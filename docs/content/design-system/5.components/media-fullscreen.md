---
title: Media fullscreen
description: The Media fullscreen component is an icon, with text instructions, beneath your media items for users to interact with so they can view one or more related media items in fullscreen.
layout: page
label: Core
---

## Usage

Use media fullscreen to give users the option to toggle a fullscreen view of some media items. Media fullscreen can display media and content from your page’s media embed and media gallery components. It always displays the full media item, regardless of its ratio. The item fills the width or height of the available area.

Fullscreen view includes the media item's title and caption.

Media fullscreen takes over the viewport completely. A transparent background helps users to know they are still on the page. When a user closes fullscreen view, they return to that same item in the gallery.

See [media](/design-system/components/media) for information relating to file type, ratios and focal point.

::DocsExample
---
id: core-containers-media-gallery--default-story
---
::

### When and how to use

- Always display the media item max height or width of the content area.
- Always include a title for the media item.
- Always include alt text.
- Display the media title and caption if used in the base component.
- Use when you need to display a media item fullscreen.

### When and how not to use

- Don't use with items that aren't media.
- Don't use with a completely opaque background.
- Don't use pagination for one media item only.
- Don't crop or hide the media item.

---

## Theming

Media fullscreen adopts its theming from the pagination component.

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-containers-media-gallery--default-story
  ---
  ::
::

To create your own theme see [theming guidance for designers](/design-system/design/theming-guidance-for-designers) or [theming guidance for developers](/design-system/develop/theming).
