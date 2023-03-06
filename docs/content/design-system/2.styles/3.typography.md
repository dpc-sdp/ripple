---
title: Typography
description: 'Type styles are used to present content clearly.'
layout: default
label: Core
links:
- text: Figma
  url: #colour
- text: Storybook
  url: #component
---

## Font

VIC is the brand font to be used across all Victorian Government communications to create a distinct but consistent look and feel.

| Font Family | Value                             | CSS Variable         |
|-------------|-----------------------------------|----------------------|
| VIC         | VIC, Arial, Helvetica, sans-serif | rpl-type-font-family |

### Font Weights

::DocsTypeTable
---
type: weight
---
::

## Type Styles

In the Ripple Design System there are two type sets, one for fixed use and one for fluid (responsive) use.

### Headings

In the Ripple Design system, Headings have both Fluid and Fixed sets.

#### Fluid

::DocsTypeClassTable
---
type:
  - style :
    - Heading 1
    - values :
      - Font size: 32px / 56px 
      - Line height: 36px / 60px 
      - Letter spacing: 1.4% / 0.8% 
      - Font weight: Bold (700)
    - rpl-type-h1
  - style :
    - Heading 1 Highlight
    - values :
      - Font size: 32px / 56px
      - Line height: 36px / 60px
      - Letter spacing: 1.4% / 0.8%
      - Font weight: Bold (700)
    - rpl-type-h1-highlight
---
::

#### Fixed

::DocsTypeClassTable
---
type:
- style :
  - Heading 1
  - values :
    - Font size: 32px / 56px
    - Line height: 36px / 60px
    - Letter spacing: 1.4% / 0.8%
    - Font weight: Bold (700)
  - rpl-type-h1-fixed
---
::

## List of variables

All values are stored as variables nested in the type variable. 

### Type size

::DocsTypeTable
---
type: size
---
::

### Line Height

::DocsTypeTable
---
type: lh
---
::

### Letter Spacing

::DocsTypeTable
---
type: ls
---
::

