---
title: Media Embed
description: Images or video with optional text to give context within content.
layout: page
label: Core
links:
- text: Figma
  url: #colour
- text: Storybook
  url: #component
---

## Usage

Media Embed combines visual elements with text to give context within content. It's used for complex media like graphs and charts with supporting data.

Media can be an image or video. Images can display as small, medium or large.

When using the complex media variant, media displays at either a max width or height. This ensures it always displays the full image.

See [media](/design-system/components/media/) for information relating to file type, ratios and focal point.

::DocsExample
---
id: core-containers-media-embed--image-landscape
---
::

### When and how to use

- Use it with videos, images or complex images
- Add data when using the complex image variant
- Ensure the media is the right size so that it displays without error
- Only add it to the content section of a page
- Add optional image caption and metadata
- Always include alt text

### When and how not to use

- Don't include media unrelated to the page
- Avoid adding interactive elements, like links, to the caption or metadata sections
- Never use a video without closed captions and a transcript

---

## Variants

Media embed has 3 variants:

- Image.
- Video.
- Complex Media.

Depending on the variant used, you could display:

- a caption
- metadata
- a transcript link
- accompanying data. 

### Image

The image variant has four display options:

- Landscape / 16:9 ratio.
- Portrait / 3:4 ratio.
- Square / 1:1 ratio.
- Avatar / circle.

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

### Complex Media

Complex media items contain detail. They include:

- infographics
- graphs
- flowchart
- maps.

You can support media by including:

- optional supporting data such as content or tables
- a view fullscreen link
- a download media link.

Optional supporting data displays in a dropdown list. Use the best type of content to represent the data, like plain text or a table.

Complex media will always display the full image. The media item will display at a predefined max height or width.

When the media is fullscreen, it displays in the [media fullscreen](/design-system/components/media-fullscreen/) component.

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

To create your own theme see [theming guidance for designers]() or [theming guidance for developers]().
