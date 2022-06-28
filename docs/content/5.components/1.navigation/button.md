---
title: Button
description: 'About the Docus Starter.'
layout: docs
---

# Button

Buttons are used to indicate an action. Button labels express what action will occur when the user interacts with it.
this is a demo

---

## Example

::component-example

  ::rpl-button{type="filled" iconName="icon-arrow-right"}
    ::markdown{unwrap="p"}
      test
    ::
  ::
  ::rpl-button{type="white" theme="accent"}
    ::markdown{unwrap="p"}
      test
    ::
  ::
  ::rpl-button{type="elevated"}
    ::markdown{unwrap="p"}
      test
    ::
  ::
::

## Anatomy

::embed-frame{figma="https://www.figma.com/file/jtsOPNk1k4cWnumzkZgclD/Ripple-2.0-PoC?node-id=2786%3A175184" :fullscreen="false" :height="400"}
::


## Variants

::embed-frame{storyId="components-atoms-button--1-example" storyViewMode="docs" :height="700"}
::

## Usage

```vue
<template>
  <RplButton>
    <!-- slot content -->
  </RplButton>
</template>
```
