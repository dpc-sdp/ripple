---
title: Button
description: 'Use buttons to indicate an action to a user.'
layout: page
label: Core
---

## Usage

Buttons help users carry out an action. Button labels say what action will occur when the user interacts with it.

Only use a button when the page has a call to action. Don't use buttons when sending users to other locations on the page or other pages or sites.

::DocsExample
---
id: core-navigation-button--default-filled
---
::

### When and how to use

- Highlight a key call to action
- Link to pages internal and external, as long as it's an action
- Add to any basic content component.
- Use verbs in the button text, for example, 'submit now', 'cancel booking', etc

### When not to use

- Limit primary buttons to one in a paragraph
- Don't use more than 4 words in the button text
- Avoid using inactive buttons

> Limit using buttons to one per page. The more you use them, the less a user will notice them.

---

## Variants

Buttons are styled for their specific purpose. Button variants include:

- filled
- outlined 
- white 
- elevated 
- destructive.

### Filled

- Use the filled variant for primary actions, otherwise known as calls to action
- Use the primary colour
- Don't use more than one filled button per page
    - A page should only have one call to action, otherwise they use their impact
    - Having more than one results in a dilemma of choice for the user

::DocsExample
---
id: core-navigation-button--default-filled
---
::

### Outlined

- The outlined variant is for secondary actions
- Like the filled variant, don't use more than one outlined button
    - If you find you're adding lots of secondary buttons, you may need to simplify your content

::DocsExample
---
id: core-navigation-button--default-outlined
---
::

### White

- The white variant is for tertiary actions when an action is less prominent
    - It should be obvious that it takes less priority to primary or secondary buttons
- It's styled with an underline by default to align with links
    - This helps meet accessibility requirements and is consistent with other link types

::DocsExample
---
id: core-navigation-button--default-white
---
::

### Elevated

- The elevated variant is the 'back to top' button
- We've added elevation to show the z-index of the button when in use

::DocsExample
---
id: core-navigation-button--default-elevated
---
::

### Destructive

- Use the destructive button for destructive actions across the site
- The destructive variant has a semantic meaning and uses semantic colour
- Destructive buttons only work if not used often and it’s uncommon for most sites to need one
- Only use the destructive variant if an action has destructive consequences because they are not easy to undo

> Never rely on colour only to communicate a serious action. For example, don't rely on red only as a warning to the user. Some users cannot see all colours and will miss meaning. What will happen when the user clicks the button must be obvious from context button text.

::DocsExample
---
id: core-navigation-button--default-destructive
---
::

---

### Loading spinner

Spinners are used to indicate to users that their action is being processed. They animate as soon as the user initiates an action and disappear once content shows.

A user may double click a button because:

- their main operating systems uses double click
- they have a slow connection which results in delayed action feedback
- they click the button by accident due to motor impairments, like hand tremors.

Clicking a button twice can mean the information gets sent two times.

Try to show the user that their click has worked. For example, show a loading spinner once they've clicked. 

When a button is in the loading state, the button text is hidden and a spinner is shown in its place. The button will keep the same width it had when the text was visible.

::DocsExample
---
id: core-navigation-button--busy-state
---
::

---

## Theming

Buttons can be themed in two ways. 

- Site colour palette
- Neutral colour palette

### Site Theme

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-navigation-button--default-filled
  ---
  ::
  ::DocsExample
  ---
  id: core-navigation-button--default-outlined
  ---
  ::
  ::DocsExample
  ---
  id: core-navigation-button--default-elevated
  ---
  ::
::

To create your own theme see [theming guidance for designers](https:www.vic.gov.au) or [theming guidance for developers](https:www.vic.gov.au).

### Neutral Theme

Implemented at a site level, the neutral buttons have predefined neutral colour values. You are unable to edit or customise these colours.

There is no filled button if you use the neutral theme. Buttons will automatically display as the next level down of button styling. For example, you'll use the outline button for the neutral theme.

#### Outlined

::DocsExample
---
id: core-navigation-button--neutral-outlined
---
::

#### White

::DocsExample
---
id: core-navigation-button--neutral-white
---
::


#### Elevated

::DocsExample
---
id: core-navigation-button--neutral-elevated
---
::

---

## Rationale

To enhance visual weight and address [WCAG 2.0 Criterion 1.4.1](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-without-color.html), we’ve used underlined text by default on white buttons. 

This shows users that there is an interaction that they can perform.

> 1.4.1 Use of Color: Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element. (Level A)
