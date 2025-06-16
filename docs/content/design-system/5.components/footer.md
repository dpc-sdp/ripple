---
title: Footer
description: The Footer component helps help users find information at the bottom of a page.
layout: page
label: Core

---

## Usage

Use footers to help users find what they need after scrolling to the bottom of a page. Footers provide supplementary information such as:

- copyright
- contact information
- links to other pages within the website
- social media links.

The footer must be used at the bottom of every page. It is separate from the primary navigation but is relevant to the entire site.

::DocsExample
---
id: core-navigation-footer--default
---
::

### How this component works

The footer is made up of:
- optional section links, which help avoid dead ends by giving users a way to continue their journey through:
  - additional links (internal and external)
  - bypassing main navigation
- optional social links, which can be used to link to social media accounts
- core site links, which must always be used and include the privacy statement, contact information and terms of use
- a copyright statement, which clarifies who owns the copyright and is specific to your agency or department (add the State Government of Victoria logo to vic.gov.au services, for sitewide consistency)
- an Acknowledgement of Traditional Owners message (an acknowledgement component).

### When and how to use
- Use with an optional supporting logo relevant to the site content.
- Use a consistently-themed footer across all pages of your site.
- Use the optional neutral theme.
- Use with an optional image credit for the header image.

### When and how not to use
- Don’t alter the required links in the core section of the footer.
- Don’t change the text in the acknowledgement component.
- Don’t use with links that are not relevant to your organisation.

---

## Theming

You can theme the footer in 3 ways:
- site colour palette
- neutral colour palette
- custom colour palette (see [theming guidance for designers]()).

### Site colour palette

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-navigation-footer--default
  ---
  ::
::

### Neutral colour palette

Implemented at a site level, the footer has predefined neutral colour values. You are unable to edit or customise these colours.

::DocsExample
---
id: core-navigation-footer--neutral
---
::

### Custom colour palette

The footer has its own colour tokens. Because of this, it's possible to apply a custom theme to your footer.

This is only recommended as a last resort.

See [component specific theming guidance for designers]().

::DocsExample
---
id: core-navigation-footer--default
theme: 'docsTheme3'
---
::

To create your own theme, see [theming guidance for designers]() or [theming guidance for developers]().
