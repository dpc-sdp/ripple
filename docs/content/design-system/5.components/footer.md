---
title: Footer
description: Footers help users find information at the bottom of a page.
layout: page
label: Core
links:
- text: Figma
  url: #colour
- text: Storybook
  url: #component
---

## Usage

Footers help users find what they need after scrolling to the bottom of a page. They provide supplementary information such as:

- copyright
- contact information
- links to other pages within the website
- social media links.

The footer must be used at the bottom of every page. It is separate from the primary navigation but is relevant to the entire site.

::DocsExample
---
id: core-navigation-footer--default-story
---
::

### How this component works

The footer is made up of:

- optional section links
  - Optional Section Links helps you avoid dead-ends by giving a user a way to continue their journey. It provides a user with:
    - additional links, both internal and external
    - a way to bypass a page’s main navigation.
- optional social links
  - Links and social icons can be used to link to social media accounts.
- core site links
  - This must always be used. It includes links such as the privacy statement, contact information and terms of use.
- copyright statement
  - This adds a copyright statement to the footer to clarify who owns the copyright, specific to your agency or department. For [vic.gov.au](https://www.vic.gov.au) services, add the Vic Gov State Logo to keep things consistent with the rest of [vic.gov.au](https://www.vic.gov.au).
- acknowledgement of country (acknowledgment component).

### When and how to use

- Use with an optional supporting logo relevant to the site contents
- Use a consistent themed footer across all pages of your site
- Use the optional neutral theme
- Use with an optional image credit for the header image

### When and how not to use
- Don’t alter the required links in the core section of the footer
- Don’t change the Acknowledgement Text
- Don’t use with links that are not relevant to your agency

---

## Theming

You can theme the footer in three ways:

- Site colour palette.
- Neutral colour palette.
- Custom colour palette - see [theming guidance for designers]().

### Site colour palette

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-navigation-footer--default-story
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

Custom styling includes the following tokens:

- rpl-clr-footer (Background fill)
- rpl-clr-footer-alt (Dividing lines)
- rpl-clr-type-footer-contrast (Content / type + icons)
- rpl-clr-type-footer-accessible (Top border)

Accessibility testing is required on ‘rpl-clr-footer’ paired with both ‘rpl-clr-type-footer-contrast' and 'rpl-clr-type-footer-accessible’.

See [component specific theming guidance for designers]().

::DocsExample
---
id: core-navigation-footer--neutral
---
::

To create your own theme, see [theming guidance for designers]() or [theming guidance for developers]().
