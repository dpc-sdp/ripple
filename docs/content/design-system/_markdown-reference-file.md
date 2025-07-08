---
title: Markdown Kitchen Sink (DEV ONLY)
description: This is an example page to demonstrate and document the markdown features available in the docs site
published: false
layout: page
links:
  - text: Vic gov
    url: https://www.vic.gov.au/
  - text: Single Digital Presence
    url: https://www.vic.gov.au/single-digital-presence
---

> For a more detailed markdown editing guide, see here https://www.markdownguide.org/basic-syntax/

## Front matter

Front matter sits at the very top of a markdown file and contains metadata about a page. In our case, it contains things like the page title and description.

Here is the frontmatter for the page you are currently reading.

```md
---
title: Kitchen sink
description: Here's everything
layout: page
links:
  - text: Vic gov
    url: https://www.vic.gov.au/
  - text: Single Digital Presence
    url: https://www.vic.gov.au/single-digital-presence
---
```

---

## Headings

Headings are added using hash marks before text. The number of hash marks specifies the heading level (e.g. '##' = H2). Please don't use H1s in markdown, these are reserved for the page title, which is set in the front matter.

### Example

```md
## Heading level 2

### Heading level 3

#### Heading level 4

##### Heading level 5

###### Heading level 6
```

## Heading level 2

### Heading level 3

#### Heading level 4

##### Heading level 5

###### Heading level 6

---

## Paragraph text

Paragraphs are simply text seperated by an empty line.

```md
This is a paragraph

This is another paragraph
```

This is a paragraph

This is another paragraph

---

## Emphasis

### Italics

```md
Here is *italic text*

Here is also _italic text_
```

Here is *italic text*

Here is also _italic text_

### Bold

```md
Here is **bold text**

Here is also __bold text__
```

Here is **bold text**

Here is also __bold text__

### Strikethrough

```md
Here is ~~strikethrough text~~
```

Here is ~~strikethrough text~~

---

## Horizontal Rules

You can add a horizontal rule by using at least three of either `_`, `-` or `*`.

```md
These are all equivalent:
---
___
***

So are these:
------
______
******

But these won't work:
--
__
**
```

---

## Blockquotes

Blockquotes are added with a `>` before the text.

```md
> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
```

> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

---

## Lists

### Unordered

Unordered lists are created by starting a line with `+`, `-`, or `*`. Nested lists can be achieved through indentation, with **2 spaces** for each additional level.

```md
* Fruit
  * Berries
    - Strawberry
    - Blueberry
  * Classics
    - Apple
    - Banana
* Vegetables
  + Broccoli
```

* Fruit
  * Berries
    - Strawberry
    - Blueberry
  * Classics
    - Apple
    - Banana
* Vegetables
  + Broccoli

### Ordered

Ordered lists are created by starting a line with a number and period (e.g. `1.`). Nested lists can be achieved through indentation, with **4 spaces** (different to the unordered list) for each additional level.

You can use any numbers, but it's more convenient to just use `1.` for each item, the numbering will work automatically.

```md
This works:

1. Lorem ipsum dolor sit amet
    1. Lorem at massa
    2. Adipiscing
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

But just do this, it's the same thing:

1. Lorem ipsum dolor sit amet
    1. Lorem at massa
    1. Adipiscing
1. Consectetur adipiscing elit
1. Integer molestie lorem at massa
```

1. Lorem ipsum dolor sit amet
    1. Lorem at massa
    2. Adipiscing
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

#### Starting point

You can start the list at any number like this:

```md
64. foo
1. bar
1. blah
```

64. foo
1. bar
1. blah

---

## Links

Hyperlinks can be added with the following syntax, the link text goes in the square brackets, followed by the url in round brackets.

```md
Visit the [Victorian government website](https://www.vic.gov.au/)
```

Visit the [Victorian government website](https://www.vic.gov.au/)

Alternatively, if you don't need different link text you can just write the url directly

```md
Here is the link to vic gov https://www.vic.gov.au/.
```

Here is the link to vic gov https://www.vic.gov.au/.

---

## Code

Here's some `code inline` in context.

Here's some `const codeInline: string = 'highlighted code inline'`{lang="ts"} in context.

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

```
Sample text here...
```

Syntax highlighting

``` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

---

## Tables

Tables can be added using a special format. More info here:

- [Github markdown tables guide](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables)

An example of a simple table

```md
| Name   | Description                  |
| ------ | ---------------------------- |
| Banana | Yellow, elongated, edible.   |
| Apple  | 84% water, 15% carbohydrates |
```

| Name   | Description                  |
| ------ | ---------------------------- |
| Banana | Yellow, elongated, edible.   |
| Apple  | 84% water, 15% carbohydrates |

---

## Images

Images can be added like this:

```md
![Nils Olav  - This is the alt text](/assets/img/temp/Nils_Olav_wide.jpg)
```

![Nils Olav  - This is the alt text](/assets/img/temp/Nils_Olav_wide.jpg)

By Lee Carson on Flickr - Nils Olav on Flickr, CC BY-SA 2.0, https://commons.wikimedia.org/w/index.php?curid=5080064

---

## Custom components

### DocsExample

The `DocsExample` will display an component example from storybook, you will need to give it the id of the story you want to display.

```md
::DocsExample
---
id: core-navigation-button--default-filled
---
::
```

::DocsExample
---
id: core-navigation-button--default-filled
---
::

There are additional options you can use for this component:

```md
::DocsExample
---
id: core-navigation-button--default-filled
withPadding: false
hideNewTab: false
hideCode: true
---
::
```

::DocsExample
---
id: core-navigation-button--default-filled
withPadding: true
hideNewTab: false
hideCode: true
---
::

You can add toggle values in storybook and copy the the value of the args parameter in the URL to the `argsString` option in the `DocsExample`

![Storybook controls](/assets/img/temp/storybook-toggles.png)

![Browser url bar](/assets/img/temp/url-args.png)

```md
::DocsExample
---
id: core-navigation-pagination--complex
argsString: 'totalPages:50;currentPage:30;showTally:true'
---
::
```

::DocsExample
---
id: core-navigation-pagination--complex
argsString: 'totalPages:50;currentPage:30;showTally:true'
---
::

You can also the theme and whether or not neutral buttons should be used.

```md
::DocsExample
---
id: core-navigation-button--default-filled
theme: 'light'
---
::

::DocsExample
---
id: core-navigation-card--call-to-action
useNeutralButtons: true
---
::
```

::DocsExample
---
id: core-navigation-button--default-filled
theme: 'docsTheme3'
---
::

::DocsExample
---
id: core-navigation-card--call-to-action
useNeutralButtons: true
---
::

### DocsThemeChooser

You can wrap `DocsExample` components with a `DocsThemeChooser` component. This will allow the user to choose which theme the examples inside the theme chooser will display with.

```md
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
::
```

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
::

### DocsImageExample

The `DocsImageExample` will display an image in a way this is visually similar to the component examples, you will need to give it the url (src) of the image, the alt text (alt) and an optional caption.

```md
::DocsImageExample
---
src: /assets/img/InlineLink-Focus.png
alt: An example of focus state colour contrast
---
Here's the **rich** text `caption`
::
```

::DocsImageExample
---
src: /assets/img/InlineLink-Focus.png
alt: An example of focus state colour contrast
---
Here's the **rich** text `caption`
::

Example without caption:

```md
::DocsImageExample
---
src: /assets/img/InlineLink-Focus.png
alt: An example of focus state colour contrast
---
::
```

::DocsImageExample
---
src: /assets/img/InlineLink-Focus.png
alt: An example of focus state colour contrast
---
::

### DocsCard && DocsCardGrid

Cards can also be added. Ensure that you wrap them with DocsCardGrid so that they are layout out correctly. DocsCard use the 'promo' type card under the hood.

```md
::DocsCardGrid
  ::DocsCard
  ---
  title: Button
  url: /design-system/components/button
  ---
  Here's the summary text
  ::

  ::DocsCard
  ---
  title: Vic gov
  url: https://www.vic.gov.au/
  ---
  Here's the summary text
  ::

  ::DocsCard
  ---
  title: Framework
  url: /framework
  ---
  Here's the summary text
  ::
::
```

::DocsCardGrid
  ::DocsCard
  ---
  title: Button
  url: /design-system/components/button
  ---
  Here's the summary text
  ::

  ::DocsCard
  ---
  title: Vic gov
  url: https://www.vic.gov.au/
  ---
  Here's the summary text
  ::

  ::DocsCard
  ---
  title: Framework
  url: /framework
  ---
  Here's the summary text
  ::
::

### DocsColourTable

The `DocsColourTable` will display a table of themed colours, you just need to specify which colours to show. 
This can be either direct colours like `clr.type.primary.contrast`, colour groups like `clr.type.primary` or a mix of both.

```md

::DocsColourTable
---
colours:
  - clr.primary
  - clr.link
---
::
```

::DocsColourTable
---
colours:
  - clr.primary 
  - clr.link
---
::

### DocsGradientTable

The `DocsGradientTable` will display the themed horizontal and vertical gradients.

```md
::DocsGradientTable
:::
```

::DocsGradientTable
::


### DocsIconTable

The `DocsIconsTable` will display a table of icons, you just need to specify which icon group to show, this will be either `alert`, `social` or `standard`.

```md
::DocsIconTable
---
group: alert
---
::
```

::DocsIconTable
---
group: alert
---
::

### DocsIconSizingTable

The `DocsIconSizingTable` will display a table of icons with a preview of the icon at the specified size.

```md
::DocsIconSizingTable
---
sizes:
- s : 16px
- m : 24px
- l : 32px
---
::
```

::DocsIconSizingTable
---
sizes:
- s : 16px
- m : 24px
- l : 32px
---
::

### DocsLayerStyleTable

The `DocsLayerStyleTable` will display a table of layer styles with a preview of that style in action, you just need to specify the type of style to show, this will be either `border`, `border.radius` or `elevation`.

```md
::DocsLayerStyleTable
---
type: border.radius
---
::
```

::DocsLayerStyleTable
---
type: border.radius
---
::

### DocsTypeTable

The `DocsTypeTable` will display a table of type styles, you just need to specify the type of type style to show. This will be either `weight`, `size`, `lh` or `ls`.

```md
::DocsTypeTable
---
type: size
---
::
```

::DocsTypeTable
---
type: size
---
::

### DocsTypeClassTable

The `DocsTypeClassTable` will display a table of type styles, with a preview of that style in action.

```md
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
```

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
