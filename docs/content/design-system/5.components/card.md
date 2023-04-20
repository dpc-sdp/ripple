---
title: Card
description: Cards contain content and actions of related information about a subject. They help users to find the right information.
layout: page
label: Core
links:
- text: Figma
  url: #colour
- text: Storybook
  url: #component
---

## Usage

Cards allow users to scan content to find required information. A group of related content or tasks, they allow users to browse a collection of related content.

Each card in a collection acts as a link to further information. They may combine a variety of content, including text, media and links.

Ensure the headlines are brief and explicit about the content the cards link to.

::DocsExample
---
id: core-navigation-card--promo&args=graphicElement:None
---
::

### When and how to use
- Group together cards with similar content.
- Use a single style of card in a set of cards.
- Keep the content clear and concise.
- Only use one piece of information per card.

### When and how not to use
- Don't mix different card variants in a group.
- Never use a single card only.
- Don't use the same content in a group of cards.
- Don't overload cards with content.
- Do not use other interactive elements, like links.
- Do not use cards instead of a simple call to action.

---

## Anatomy
- **Metadata** shows supplementary data to give more information to the user. This could include a date, topic or status.
- **Headline** provides a snapshot of the content.
- **Summary** provides further details.
- **Visual elements** provide visual prominence

You only need a headline and a summary for a card. All other elements are optional and will depend on a user's needs.

## Metadata
All cards have optional metadata. Use metadata to display a combination of:
- topic / tag, which are the categories of a topic or theme when a user needs to further group content. Like departments, agencies, or services
- date, which is how old the content is when this information is important to the user
- status, which is where something is sitting in a process.

## Visual elements
Visual elements in cards allow for different content to stand out. They can also provide addition context.

Elements that can provide visual prominence include:
- an image
- a highlight border
- a blocked headline type.

Use visual elements carefully. Only use a visual element if it:
- is meaningful to the user journey
- supports what is already in the content
- can help the user differentiate it from other content
- can be easily identified
- is informative and not decorative.

---

## Variants
Cards have two main variants, and are styled for their purpose:
- Promotion cards, which is used to highlight important content.
- Navigation cards, which is used for larger groups of content.

### Promotion cards
Promotion cards highlight important content of a related topic or area. They can draw attention to priority or key content on a page.

Promotion cards stack in a grid when in a collection.

Promotion cards have 4 variants:
- Standard.
- Highlight.
- Image full bleed.
- Avatar.

#### Standard
::DocsExample
---
id: core-navigation-card--promo&args=graphicElement:None
---
::

#### Highlight
::DocsExample
---
id: core-navigation-card--promo&args=graphicElement:Highlight
---
::

#### Image full bleed
For visual prominence, you can add a related image to the card.

::DocsExample
---
id: core-navigation-card--promo
---
::

#### Avatar
::DocsExample
---
id: core-navigation-card--avatar
---
::

### Navigation cards
Navigation cards display larger groups of content options. For example, on landing pages, it shows all content areas within that section of the site.

Navigation cards fill the full width of the content area. They will always stack vertically.

There are 3 variants of navigation cards:

- Standard.
- Image inset.
- Heading highlight.

#### Standard
::DocsExample
---
id: core-navigation-card--nav&args=graphicElement:None
---
::

#### Image inset
A related image can increase a card's visual prominence. 

::DocsExample
---
id: core-navigation-card--nav
---
::

#### Heading highlighted
For added visual performance and to highlight the content, use a heading highlight.
::DocsExample
---
id: core-navigation-card--nav&args=graphicElement:Heading+highlighted
---
::

---

## Theming
Cards use colour for: 
- interaction states
- to add visual prominence to some elements.

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-navigation-card--promo&args=graphicElement:Highlight
  ---
  ::
  ::DocsExample
  ---
  id: core-navigation-card--nav&args=graphicElement:Heading+highlighted
  ---
  ::
::

To create your own theme, see [theming guidance for designers]() or [theming guidance for developers]().
