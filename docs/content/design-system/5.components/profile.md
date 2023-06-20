---
title: Profile
description: The Profile component shows an avatar (image) on your page, with supporting text to display key information.
layout: page
label: Core

---

## Usage

Use profile to highlight key information to users by showing an avatar image with summary content. This highlights key information to users.

Each row of content includes a:

- label
- summary.

It's used to display key information, including:

- name
- date
- category.

Only use the profile component for displaying simple information. For data or complex information, consider using a table.

::DocsExample
---
id: core-containers-profile--default-story
---
::

### When and how to use

- Keep label as short as possible (under 2 words, like a name).
- Keep all content clear and concise.
- Display at the top of profile pages.
- Always add alt text to the image.
- Only use an image that's relevant to the summary.

### When and how not to use

- Never use a label that doesn't match the summary.
- Don't use unimportant, complex or longform content.
- Don't include punctuation.
- Never use full URLs in the label or summary.
