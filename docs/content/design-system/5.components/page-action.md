---
title: Page Action
description: Links that allow users a choice of actions, such as printing or downloading a document.
layout: page
label: Core
links:
- text: Figma
  url: #colour
- text: Storybook
  url: #component
---

## Usage

A collection of links that allow users a choice of actions at a page level. This includes printing or downloading a document.

The Page Action component displays a combination of two page level actions:

- Print page: print the page a user is on.
- Print full document: prints all pages in a publication or document. Printing a full document page action prints all pages in the publication, not only the page the user is on.
- Download document: download a copy of the content that the page editor uploaded. You can add more than one document to the page action component. But, the documents should only be what's already on the page. Don't add new or extra content.

Never use page actions for anything other than what we've stated above. Don't use it for links.

The print action prints the full document (section), not just the page the user is on. The document action, downloads a document that has been uploaded in the content management system. 

::DocsExample
---
id: core-containers-page-action--default-story
---
::

### When and how to use

- Only use in a page's sidebar section
- Use as the first component in the sidebar, above the [vertical navigation](/design-system/components/vertical-navigation/)
- Use with or without one or more documents
- Include metadata with uploaded documents

### When and how not to use

- Don't use:
  - in the content area of a page
  - with a document that has different content to the page
  - for any other user actions.

---

## Theming

Page action uses colour for:

- icons, to indicate a possible action to users
- interactive states.

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-containers-page-action--default-story
  ---
  ::
::

To create your own theme, see [theming guidance for designers](https://www.vic.gov.au) or [theming guidance for developers](https://www.vic.gov.au).
