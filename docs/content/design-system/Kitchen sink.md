---
title: Kitchen sink
description: Here's everything
layout: default
---

## Headings

## Heading level 2
### Heading level 3
#### Heading level 4
##### Heading level 5
###### Heading level 6


## Horizontal Rules 

### `___`
___

### `---`
---

### `***`
***

## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes


> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.


## Lists

Unordered

+ Create a list by starting a line with `+`, `-`, or `*`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as `1.`

Start numbering with offset:

57. foo
1. bar


## Code

Inline `code`

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

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine <br> asd | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

| Option | Description |
| ------:| -----------:|
| ![Nils Olav](/assets/img/InlineLink-Focus.png) | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)


## Images

![Nils Olav](/assets/img/Nils_Olav_wide.jpg "Nils")

By Lee Carson on Flickr - Nils Olav on Flickr, CC BY-SA 2.0, https://commons.wikimedia.org/w/index.php?curid=5080064

### Footnotes

Here's a simple footnote,[^1] and here's a longer one.[^bignote]
[^1]: This is the first footnote.
[^bignote]: Here's one with multiple paragraphs and code.
    Indent paragraphs to include them in the footnote.
    `{ my code }`
    Add as many paragraphs as you like.

### Custom containers

::DocsExample
---
id: core-navigation-button--default-filled
---
::

::DocsExample
---
id: core-navigation-breadcrumbs--default-story
hideNewTab: true
---
::

::DocsExample
---
id: core-navigation-in-page-navigation--in-page-navigation
hideCode: true
---
::

::DocsExample
---
id: core-navigation-footer--default-story
hideNewTab: true
hideCode: true
---
::
