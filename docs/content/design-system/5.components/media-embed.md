---
title: Media embed
description: The Media embed component shows an image or video within the page content, with optional text to give context. 
layout: page
label: Core
---

## Usage

Use media embed to add visual elements including images, videos, graphs, infographics, maps and charts to your page content. 

Use the optional text to combine the visual element with text, so that the user understands the visual element’s context. Optional text should always be used for complex media like graphs and charts with supporting data.

Media can be an image or video. Images can display as small, medium or large.

When using the complex media variant, media displays at either a max width or height. This ensures it always displays the full image.

See [media](/design-system/components/media) for information relating to file type, ratios and focal point.

::DocsExample
---
id: core-containers-media-embed--image-landscape
---
::

### When and how to use
- Use it with videos, images or complex images.
- Add data when using the complex image variant.
- Ensure the media is the right size so that it displays without error.
- Only add it to the content section of a page.
- Add an optional image caption and metadata.
- Always include alt text.

### When and how not to use
- Don't include media unrelated to the page.
- Avoid adding interactive elements, like links, to the caption or metadata sections.
- Never use a video without closed captions and a transcript.

---

## Variants

Media embed has 3 variants:
- image
- video
- complex media.

Depending on the variant used, you can display:
- a caption
- metadata
- a transcript link
- accompanying data. 

### Image

The image variant has 4 display options:

- landscape / 16:9 ratio
- portrait / 3:4 ratio
- square / 1:1 ratio
- avatar / circle.

You can display portrait, landscape and square as small, medium or large. Avatar only displays in small or medium.

The media gets cropped to fill the selected ratio. Make sure the media's focal point is best placed to accurately represent the media item. 

#### Landscape

::DocsExample
---
id: core-containers-media-embed--image-landscape
---
::

#### Portrait

::DocsExample
---
id: core-containers-media-embed--image-portrait
---
::

#### Square

::DocsExample
---
id: core-containers-media-embed--image-square
---
::

#### Avatar

::DocsExample
---
id: core-containers-media-embed--image-avatar
---
::

### Video

Videos will always display at a 16:9 ratio.

A 'view transcript' link displays by default. Videos must have both closed captions and a transcript.

Include a supporting caption to give extra context to the user.

::DocsExample
---
id: core-containers-media-embed--video
---
::

### Complex media

Complex media items contain detail. They include:

- infographics
- graphs
- flowchart
- maps.

You can support media by including:

- optional supporting data such as content or tables
- a view fullscreen link
- a download media link.

Optional supporting data displays in a dropdown list. Use the type of content that will best communicate your supporting data to the user. For example, some information is conveyed better by a table, rather than plain text. 

Complex media will always display the full image. The media item will display at a predefined max height or width.

When the media is fullscreen, it displays in the media fullscreen component.

::DocsExample
---
id: core-containers-media-embed--complex-image
---
::

---

## Theming

Media embed uses colour for:

- icons
- interactive states.

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-containers-media-embed--complex-image
  ---
  ::
::

To create your own theme see [theming guidance for designers](/design-system/design/theming-guidance-for-designers) or [theming guidance for developers](/design-system/develop/theming).
