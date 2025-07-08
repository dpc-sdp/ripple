---
title: Colour
description: 'Colour plays an important role in creating a consistent and strong visual digital products and services.'
layout: page
label: Core
---

You want users to recognise your brand. A well-designed colour palette can help you create a consistent look and feel.

The default colours, made up of two blues, reflect vic.gov.au branding. This strengthens the association with the Victorian Government.

The design system contains a colour framework. You can change it if your site requires department or entity branding.

We've designed and tested colour pairings that already pass accessibility contrast ratios. However, we recommend you perform your own checks to ensure you're meeting WCAG requirements.

If you change your core brand colours, your styles and components will re-theme automatically using the design system's colour framework. 

For more guidance on theming options, see [theming guidance for designers](/design-system/design/theming-guidance-for-designers) or [theming guidance for developers](/design-system/develop/theming/).

>**You don’t need to use hex colours in code.** 
>
>By using CSS variables, any branding or theming changes will automatically reflect in your product. See CSS variables below, or see the theming documentation.

## Core palette

The core palette includes primary and secondary colours.

- The ‘Primary’ colour is for key visual elements and components. They form the foundation of the colour palette.
- The ‘Accent’ colour is an accent to help highlight key components or pieces of information. It's used in combination with the primary colour to create a more dynamic and engaging visual experience.

### Primary 

::DocsColourTable
---
colours: 
  - clr.primary
---
::

### Accent

::DocsColourTable
---
colours: 
  - clr.accent
---
::

## Neutral palette

The Neutral palette is on a colour scale of white to black.

The 10 steps represent this scale based on our requirements.

Neutral colours are consistent throughout the design system. They are for:
- text colours
- borders
- other elements, like a neutral background.

::DocsColourTable
---
colours: 
  - clr.neutral
---
::

::DocsColourTable
---
colours:
  - clr.light
  - clr.dark
---
::

## Typography colours

Type colours have a ratio of at least 4.5:1 (or 3:1 for text larger than 18 point). This was selected to try and conform to the Web Content Accessibility Guidelines (WCAG 2.1).

Interaction colours are in addition to the core colour palette. This guarantees accessible text.

::DocsColourTable
---
colours:
  - clr.type.default
  - clr.type.light
  - clr.type.primary.contrast
  - clr.type.accent.contrast
---
::

::DocsColourTable
---
colours:
  - clr.link
  - clr.link-visited
  - clr.focus
---
::

## Gradients

Gradients bring attention to components or information. Only use them on occasion.

All gradients should appear from dark to light in their usage.

::DocsGradientTable
::

## Sematics

Semantic colours add meaning to element. They provide contextual or transactional feedback to the user. We have four semantic uses:

- Information
- Success
- Warning
- Error

Avoid using them outside of their semantic meaning.

These colours help signal to users the meaning of some components. For example, for alerts or error messages. 

::DocsColourTable
---
colours:
  - clr.information
  - clr.success
  - clr.warning
  - clr.error
---
::

## Focus

See [focus state](/design-system/styles/focus-state) for guidance. 

::DocsColourTable
---
colours:
  - clr.focus
---
::

## Theming

To create your own theme, see theming guidance for designers or developers.
