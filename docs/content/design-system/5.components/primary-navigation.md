---
title: Primary navigation
description: The Primary navigation component appears as a menu sitting at the top of the page and contains links to site’s content pages. 
layout: page
label: Core
---

## Usage

Use primary navigation to help users get to where they need to go. It shows links to key areas of the website and guides users to the content they are looking for. The main way users journey through your site should be through primary navigation.

Use primary navigation to let users identify where they are. It helps users know their current page location within the overall site. 

The primary navigation contains:
- a site logo
- navigation links
- optional search link.

The navigation and search links expand to either a fullscreen menu or search bar.

The primary navigation always sits at the top of the page. It displays above all page content and components.

::DocsExample
---
id: core-navigation-primary-nav--default-story
---
::

### How this component works
#### Logo
The logo lets users instantly recognise which organisation or entity owns the current page. When users interact with the logo, it should direct them to the site’s homepage. 

Within the primary navigation component, the logo is centred vertically.

#### Co-branding logos
Primary navigation allows for co-branding when required. The maximum size a co-branded logo can appear is 40h x 140w pixels.

See [logo](/design-system/styles/logo) for guidance and requirements including co-branding.

#### Navigation links 
The primary navigation displays the top level of the site’s information architecture (IA). When the link has child pages, a chevron (a v-shaped arrow icon) displays next to the top page name. When clicked, this opens the mega menu and displays the child pages.

When there are no child pages, there is no chevron and it takes users to the page. 

#### Mega menu
The mega menu gives users access to pages deeper in the site. Use it if your site or service has more than one level of navigation. If a mega menu item has a chevron, users can expand it to display its child pages.

#### Search menu
The menu can display a search bar to provide users the option to perform a site search. 

#### Smaller devices
The primary navigation adapts to small devices. The breakpoint for displaying the collapsed menu is 992px.

On smaller devices primary navigation shows as a dropdown showing only one labelled menu item. It contains more levels of navigation options, which remain hidden until the single dropdown is interacted with and opens. 

To aim to conform with [WCAG2.0 Criterion 1.1.1](https://www.w3.org/TR/UNDERSTANDING-WCAG20/text-equiv.html), and for increased consistency across screens sizes, the primary navigation:
- uses the menu label and a chevron
- doesn't use the 3 bar, or 'hamburger', menu icon.

> 1.1.1 Non-text Content: All non-text content that is presented to the user has a text alternative that serves the equivalent purpose.

#### Responsive behaviour
Primary navigation supports only a small number of items. This is because it is a horizontal list.

Take this into account when defining your site's IA.

A maximum number of links can display before the navigation bar will respond to the collapsed menu display.

When used with a single logo:
- 992-1199px breakpoint can display 6 links (including search)
- 1200+ breakpoint can display 7 links (including search).

When used with a co-branded logo:
- 992-1199px breakpoint can display 5 links (including search)
- 1200+ breakpoint can display 6 links (including search).

When using the collapsed menu in the navigation bar, the mega menu will also display the mobile (collapsed) version.

#### Scroll behaviour 
The primary navigation has show and hide behaviour on user scroll.
- Scroll down: the primary navigation hides from view.
- Scroll up: the primary navigation shows at the top of the viewport. 

#### Interaction with other components
When a site has a quick exit button (a button component that uses the destructive variant), it sits underneath the primary navigation. If the user opens the mega menu or search menu, the quick exit button moves inside the menu container. So the quick exit action will always be available to users.

---

### When and how to use
- Use across all pages of your site.
- Use descriptive, recognisable link labels.
- Display links in priority order: move from left (for most-used links) to right (for least-used links).
- Base your navigation's structure on user research.
- Structure navigation to prioritise tasks and information your research says users need the most. 
- Use with optional user action, such as login, if required.

### When and how not to use
- Don’t label links with jargon or unfamiliar terms.
- Don't use more than 150 characters per menu item.
- Hover should never be used to expand dropdown lists as it is not reliably accessible or responsive.
- An organisational structure should not be used as a navigation stucture.
---

## Theming
Primary navigation uses colour for:
- visual prominence and brand recognition
- interactive states.

Primary navigation also adopts its theming from the search bar component.

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-navigation-primary-nav--default-story
  ---
  ::
::

---

## Accessibility 
To aim to conform with [WCAG2.2 Criterion 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum), the primary navigation bar uses the space either side of menu items. This allows for increased touch targets and the use of the block focus state styling.

> 2.5.8 Target Size (Minimum) The size of the [target](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum#dfn-target) for [pointer inputs](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum#dfn-pointer-input) is at least 24 by 24 [CSS pixels](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum#dfn-css-pixel),
