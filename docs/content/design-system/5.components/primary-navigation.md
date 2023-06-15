---
title: Primary navigation
description: Help users identify where they are by providing links to key areas of the website. This help users get to where they need to go.
layout: page
label: Core

---

## Usage
The primary navigation helps a user to find the right content for them. Use it to show the level of your site's information architecture (IA). It works with the [Header](/design-system/components/header/) to orientate your users, and helps keep all pages consistent. Use it as the primary way for users to navigate your site.

The primary navigation contains:
- site logo
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
The logo helps users understand which site they are visiting. Clicking it should always take users back to a homepage. It's always centred vertically in the primary navigation bar.

#### Co-Branding Logos
Primary navigation allows for co-branding when required. The maximum size a co-branded logo can appear is 40h x 140w pixels.

See [logo](/design-system/styles/logo/) for guidance and requirements including co-branding.

#### Navigation links 
The primary navigation displays the top level of the site’s IA. When the link has child pages, a chevron displays next to the top page name. When clicked, this opens the mega menu and displays the child pages.

When there are no child pages, there is no chevron and it takes users to the page. 

#### Mega menu
The mega menu gives users access to pages deeper into the site. Use it if your site or service has more than 1 level of navigation. If a mega menu item has a chevron, users can expand it to display its child pages.

#### Search menu
The menu can display a search bar to provide users the option to perform a site search. 

#### Smaller devices
The primary navigation adapts to small devices. The breakpoint for displaying the collapsed menu is 992px.

It displays as a single menu labelled dropdown option. And it displays all levels when opened.

To meet [WCAG2.0 Criterion 1.1.1](https://www.w3.org/TR/UNDERSTANDING-WCAG20/text-equiv.html), and for increased consistency across screens sizes, the primary navigation:
- uses the menu label and a chevron
- doesn't use the 3 bar, or 'hamburger', menu icon.

> 1.1.1 Non-text Content: All non-text content that is presented to the user has a text alternative that serves the equivalent purpose.

#### Responsive behaviour
The main navigation won't support a large number of items. This is because it is a horizontal list.

Take this into account when defining your site's IA.

A maximum number of links can display before the navigation bar will respond to the collapsed menu display.

When used with a single logo:
- 992-1199px breakpoint can display 6 links (including search)
- 1200+ breakpoint can display 7 links (including search)

When used with a co-branded logo:
- 992-1199px breakpoint can display 5 links (including search)
- 1200+ breakpoint can display 6 links (including search)

When using the collapsed menu in the navigation bar, the mega menu will also display the mobile (collapsed) version.

#### Scroll behaviour 
The primary navigation has show and hide behaviour on user scroll.
- Scroll down - the primary navigation hides from view.
- Scroll up - the primary navigation shows at the top of the viewport. 

#### Interaction with other components
When a site has a [quick exit button](/design-system/components/button/#destructive), it sits underneath the primary navigation. If the user opens the mega menu or search menu, the quick exit button moves inside the menu container. So, this action will always be available to users.

---

### When and how to use
- Use across all pages of your site.
- Use descriptive, recognisable link labels.
- Display links in priority order. More in-demand links should start on the left, with other links on the right.
- Structure your navigation according to user need. Your research should point to what tasks and information your users need most.
- Do use with optional user action such as login if required.

### When and how not to use
- Don’t label links with jargon or unfamiliar terms.
- Don't use more than 150 characters per menu item.
- Don't use hover to expand dropdown lists. Some users find it difficult and it doesn't work on touch screen devices.
- Design your IA based on user research, and not your organisational structure.

---

## Theming
Primary navigation uses colour for:
- visual prominence and brand recognition
- interactive states.

Primary navigation also adopts its theming from the [Search bar]() component.

::DocsThemeChooser
  ::DocsExample
  ---
  id: core-navigation-primary-nav--default-story
  ---
  ::
::

---

## Accessibility 
To meet [WCAG2.2 Criterion 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum), the primary navigation bar uses the space either side of menu items. This allows for increased touch targets and the use of the [block focus state](/design-system/styles/focus-state/).

> 2.5.8 Target Size (Minimum) The size of the [target](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum#dfn-target) for [pointer inputs](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum#dfn-pointer-input) is at least 24 by 24 [CSS pixels](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum#dfn-css-pixel),

