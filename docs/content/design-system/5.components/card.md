---
title: Card
description: The Card component shows content about another page, event or topic. They help users find relevant information.
layout: page
label: Core

---

## Usage
Use cards to help users find the right information quickly.

They can combine a variety of content, including text, media and links.

Cards are best used on a landing page to highlight any related pages, events or ongoing campaigns.

Ensure headings are direct and summaries are concise.

::DocsExample
---
id: core-navigation-card--promo
argsString: 'graphicElement:None'
---
::

### How this component works
Cards can be made up of: 
- metadata, to show supplementary data to give the user more information (for example, date, topic, status, etc.) 
- headline, to provide a snapshot of the content
- summary, to provide further details
- visual elements, to provide visual prominence.

You only need a headline and a summary for a card. All other elements are optional and will depend on a user's needs.

#### Metadata
All cards have optional metadata. Use metadata to display a combination of:
- topic/tag - categories for when a user needs to group content (for example, departments, agencies, services, etc.)
- date - how old the content is, for when this information is important to the user
- status - where a component or action is sitting within a process.

#### Visual elements
Visual elements in cards allow for different content to stand out. They can also provide additional context.

Elements that can provide visual prominence include:
- an image
- a highlight border
- a blocked headline type.

Use visual elements carefully. Only use a visual element if it:
- is meaningful to the user journey
- supports what is already in the content
- can help the user differentiate content from other content
- can be easily identified
- is informative and not only decorative.

### When and how to use
- Group together cards with similar content.
- Use only a single style of card within a set of cards.
- Keep the content clear and concise.
- Only use one piece of information per card.

### When and how not to use
- Don't mix different card variants in a group.
- Never use a single card only.
- Never repeat content in a group of cards.
- Don't overload cards with content.
- Don't include other interactive elements, like links, inside the card. 

---

## Variants
A card has 2 main variants and is styled for its purpose.
- Promotion Cards, which is used to highlight important content.
- Navigation Cards, which is used for larger groups of content.

### Promotion cards
Promotion cards provide an eye-catching way to promote links to other pages on your site (or external sites).

Promotion cards stack in a grid when used in a collection.

Promotion cards have 4 variants:
- standard
- highlight
- image full bleed
- avatar.

#### Standard
::DocsExample
---
id: core-navigation-card--promo
argsString: 'graphicElement:None'
---
::

#### Highlight
The highlight variant gives the card more visual prominence. Use this to guide users to the content.

::DocsExample
---
id: core-navigation-card--promo
theme: 'docsTheme2'
argsString: 'graphicElement:Highlight'
---
::

#### Image full bleed
The image full bleed variant gives the option to add a relevant image to grab the user’s attention.

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
Navigation cards are useful for displaying and breaking down large groups of content options.

On landing pages, they are used to highlight all the different sections of that site.

Navigation cards fill the full width of the content area. They will always stack vertically.

There are 3 variants of navigation cards:
- standard
- image inset
- heading highlight.

#### Standard
::DocsExample
---
id: core-navigation-card--nav
argsString: 'graphicElement:None'
---
::

#### Image inset
A related image can increase a card's visual prominence.

::DocsExample
---
id: core-navigation-card--nav
---
::

#### Heading highlight
To draw attention to the heading and highlight the content, use a heading highlight.

::DocsExample
---
id: core-navigation-card--nav
argsString: 'graphicElement:Heading+highlighted'
---
::

---

## Theming
Cards use colour for: 
- interaction states
- adding visual prominence to some elements.

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-navigation-card--promo
  argsString: 'graphicElement:Highlight'
  ---
  ::
  ::DocsExample
  ---
  id: core-navigation-card--nav
  argsString: 'graphicElement:Heading+highlighted'
  ---
  ::
::

To create your own theme, see [theming guidance for designers]() or [theming guidance for developers]().
