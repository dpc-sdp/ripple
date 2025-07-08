---
title: Typography
description: 'Type styles are used to present content clearly.'
layout: page
label: Core
---

## Font

'VIC' is the brand font to be used across all Victorian Government communications. This creates a distinct but consistent look and feel.

It is free to download from [vic.gov.au](https://www.vic.gov.au/brand-victoria-fonts).

Only use VIC font. The Ripple Design System only uses ‘Regular’ and ‘Bold’ weights of VIC font.

As VIC is a custom font, it's recommended to use Web Safe Font as a fallback when declaring your font stack. The preferred fallback font for the Ripple Design System is Arial.

| Font Family | Value                             | CSS Variable         |
|-------------|-----------------------------------|----------------------|
| VIC         | VIC, Arial, Helvetica, sans-serif | rpl-type-font-family |


## Type Styles

In the Ripple Design System there are two type sets, one for fixed use and one for fluid (responsive) use:

- The fixed type set uses fixed sizes. This means they use the <991 fluid styles, but do not respond.
- The fluid type set has two fixed sizes. These both respond at certain breakpoints for larger or smaller styles.

### Headings

Headings have both fluid and fixed sets. Headings are bold by default for emphasis and to create contrast.

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
  - style :
    - Heading 2
    - values :
      - Font size: 24px / 32px
      - Line height: 32px / 40px
      - Letter spacing: 1.6% / 1.4%
      - Font weight: Bold (700)
    - rpl-type-h2
  - style :
    - Heading 3
    - values :
      - Font size: 20px / 24px
      - Line height: 28px / 32px
      - Letter spacing: 1.8% / 1.6%
      - Font weight: Bold (700)
    - rpl-type-h3
  - style :
    - Heading 3 Highlight
    - values :
      - Font size: 20px / 24px
      - Line height: 28px / 32px
      - Letter spacing: 1.8% / 1.6%
      - Font weight: Bold (700)
    - rpl-type-h3-highlight
  - style :
    - Heading 4
    - values :
      - Font size: 16px / 20px
      - Line height: 24px / 28px
      - Letter spacing: 1.92% / 1.8%
      - Font weight: Bold (700)
    - rpl-type-h4
---
::


#### Fixed

::DocsTypeClassTable
---
type:
  - style :
    - Heading 1 Fixed
    - values :
      - Font size: 32px
      - Line height: 36px
      - Letter spacing: 1.4%
      - Font weight: Bold (700)
    - rpl-type-h1-fixed
  - style :
    - Heading 1 Highlight Fixed
    - values :
      - Font size: 32px
      - Line height: 44px
      - Letter spacing: 1.4%
      - Font weight: Bold (700)
    - rpl-type-h1-highlight-fixed
  - style :
    - Heading 2 Fixed
    - values :
      - Font size: 24px
      - Line height: 32px
      - Letter spacing: 1.6%
      - Font weight: Bold (700)
    - rpl-type-h2-fixed
  - style :
    - Heading 3 Fixed
    - values :
      - Font size: 20px
      - Line height: 28px
      - Letter spacing: 1.8%
      - Font weight: Bold (700)
    - rpl-type-h3-fixed
  - style :
    - Heading 3 Highlight Fixed
    - values :
      - Font size: 20px
      - Line height: 28px
      - Letter spacing: 1.8%
      - Font weight: Bold (700)
    - rpl-type-h3-highlight-fixed
  - style :
    - Heading 4 Fixed
    - values :
      - Font size: 16px
      - Line height: 24px
      - Letter spacing: 1.92%
      - Font weight: Bold (700)
    - rpl-type-h4-fixed
---
::

### Paragraph

The default paragraph font size is 16px on all screens.

The majority of your body copy should use the standard 16px paragraph size.

::DocsTypeClassTable
---
type:
  - style :
    - Paragraph Large
    - values :
      - Font size: 20px / 24px
      - Line height: 28px / 32px
      - Letter Spacing: 1.8% / 1.6%
    - rpl-type-p-large
  - style :
    - Paragraph Large Fixed
    - values :
      - Font size: 20px
      - Line height: 28px
      - Letter Spacing: 1.8%
    - rpl-type-p-large-fixed
  - style :
    - Paragraph Large Highlight
    - values :
      - Font size: 20px / 24px
      - Line height: 28px / 32px
      - Letter Spacing: 1.8% / 1.6%
    - rpl-type-p-large-highlight
  - style :
    - Paragraph
    - values :
      - Font size: 16px
      - Line height: 24px
      - Letter spacing: 1.92%
    - rpl-type-p
  - style :
    - Paragraph Small
    - values :
      - Font size: 14px
      - Line height: 20px
      - Letter spacing: 1.92%
    - rpl-type-p-small
---
::

### Lists

Use lists to make blocks of text easier to read, and to break information into manageable chunks.

List styles are based on rpl-type-p with extra spacing.

| Margin Top | Paragraph Spacing                  | Item Spacing        | Indent Amount       |
|-------------|-----------------------------------|----------------------|----------------------|
| rpl-sp-4       | rpl-sp-2      | rpl-sp-2         | rpl-sp-9       |

#### Unordered Lists

Introduce bulleted lists with a lead-in line ending in a colon. Start each item with a lowercase letter, and do not use a full stop at the end.

Unordered lists allow for two nested levels which are styled as:

- level 1 - bullet
- level 2 - dash

::DocsImageExample
---
src: /assets/img/unordered-list.png
alt: An example of an unordered list
---
::

#### Ordered Lists

Use numbered lists instead of bulleted lists when the order of the items is relevant.

You do not need to use a lead-in line for numbered lists. Items in a numbered list should end in a full stop because each should be a complete sentence.

Ordered lists allow for three nested levels which are styled as

- level 1 - numbers
- level 2 - alphabet
- level 3 - roman numerals.

::DocsImageExample
---
src: /assets/img/ordered-list.png
alt: An example of an ordered list
---
::

### Text Alignment
You should usually left-align body copy that’s read left to right. Right-aligned body copy can be hard for users to find and read when they magnify their screen.

Do not ‘justify’ blocks of body copy so that they’re aligned to both the left and right margins. Doing this creates wider spaces between words, which can make the text hard to read.

### Font weight
You can use bold to emphasise particular words in a transaction. Use it to highlight critical information that users need to refer to or you’ve seen them miss.

Try to avoid bold. Overuse will make it difficult for users to know which parts of your content they need to pay the most attention to.

::DocsImageExample
---
src: /assets/img/font-weight.png
alt: Acomparison between regular text and bold text
---
::

### Links

Links are blue and underlined by default. If your link is at the end of a sentence or paragraph, make sure that the linked text does not include the full stop.

::DocsImageExample
---
src: /assets/img/link.png
alt: A visual example of a link within regular text
---
::

---

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

### Font Weights

::DocsTypeTable
---
type: weight
---
::

### List Styling

| Style | Level 1                  | Level 2        | Level 3       |
|-------------|-----------------------------------|----------------------|----------------------|
| Unordered list      | • (filled circle) | - (dash)         |         |
| Ordered List     | 1. (numbers)     | a. (letters)         | i. (roman numerals)       |
