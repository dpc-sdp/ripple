---
title: Campaign banner
description: The Campaign banner component draws a user's attention to promoted content.
layout: page
label: Core
---

## Usage
Use campaign banners to promote content. They include a feature image and have an optional call to action.

The banner has a headline and short summary text. These point users to promoted content and guide them to a call to action contained in a button.

Campaign banners can be used at the top or bottom of a page, under the header or above the footer.

::DocsExample
---
id: core-navigation-campaign-banner--primary-image
---
::

### When and how to use
- Promote a campaign or related page content.
- Add an optional image.
- Use with an optional call to action.

### When and how not to use
- Don’t overload with content.
- Don’t use an unrelated image.

---

## Variants
The campaign banner has 2 variants:
- featured, which appears at the top of the page, below the header
- image inset, which appears at the bottom of the page above the footer.

### Featured
A featured campaign banner goes at the top of the page underneath the header. When on larger screens, the image is cropped in a shape and can overlap the component above (the header).

There is an option to include metadata for the image if required.

::DocsExample
---
id: core-navigation-campaign-banner--primary-image
---
::

### Image inset
The image inset variant sits above the footer at the bottom of the page. This should be used for less prominent campaigns. For featured campaigns, we recommend using the featured variant at the top of the page.

::DocsExample
---
id: core-navigation-campaign-banner--secondary-image
---
::

---

## Theming
The campaign banner adopts its theming from the button component.

If you choose the neutral button variant for your site, the campaign banner will display buttons in the neutral theme.

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-navigation-campaign-banner--primary-image
  ---
  ::
::

To create your own theme, see [theming guidance for designers]() or [theming guidance for developers]().
