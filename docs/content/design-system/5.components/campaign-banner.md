---
title: Campaign banner
description: Campaign banners draw user's attention to promoted content.
layout: page
label: Core
links:
- text: Figma
  url: #colour
- text: Storybook
  url: #component
---

## Usage
Campaign banners promote content. They use a feature image and have an optional call to action.

The banner has a headline and short summary text. These point users to promoted content and guide them to the call to action.

They can be used at the top or bottom of pages, under the header, or above the footer.

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
The Campaign Banner has two variants:
- Featured, which appears at the top of the page, below the [header](/design-system/components/header/).
- Image Inset, which appears at the bottom of the page above the [footer](/design-system/components/footer/).

### Featured
A featured campaign banner goes at the top of the page underneath the header. When on larger screens, the image is cropped in a shape and can overlap the above component (header).

There is an option to include metadata for the image if required.

::DocsExample
---
id: core-navigation-campaign-banner--primary-image
---
::

### Image inset
Image inset variant sits above the footer at the bottom of the page. This should be used for less prominent campaigns. For featured campaigns, we recommend using the featured variant at the top of the page.

::DocsExample
---
id: core-navigation-campaign-banner--secondary-image
---
::

---

## Theming
The Campaign Banner adopts its theming from the [button](/design-system/components/button/) component.

If you choose neutral button for your site, the Campaign Banner will display buttons in the neutral theme.

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-navigation-campaign-banner--primary-image
  ---
  ::
::

To create your own theme, see [theming guidance for designers]() or [theming guidance for developers]().
