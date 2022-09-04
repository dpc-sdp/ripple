---
title: Alert
description: 'Used to attract the attention of users with important messages or required actions and typically appear at the top of pages. '
layout: component
links:
  figma: https://www.figma.com/file/nCqetprXV74mdvi4D7e4ew/Ripple-2.0-Documentation-Specs?node-id=2243%3A129461
  storybook: https://uat--624ac117357335003a84dac3.chromatic.com/?path=/docs/core-containers-alert--information
---

## Overview

Used to attract the attention of users with important messages or required actions and typically appear at the top of pages. Users are still able to interact with the page below Alerts.


### Anatomy

::embed-frame{figma="https%3A%2F%2Fwww.figma.com%2Ffile%2FnCqetprXV74mdvi4D7e4ew%2FRipple-2.0-Documentation-Specs%3Fnode-id%3D2255%253A130145" :fullscreen="false" :height="400"}
::

::DocTable{style="labels"}
| Key | Label          |
| --- | ----------     |
| A   | Alert Icon     |
| B   | Message        |
| C   | Call to action |
| D   | Close icon     |
| E   | Container      |
::

## Variants
::component-explorer
---
  component: rpl-alert
  showProps: true
  variants:
    - 
      variantName: 'Information'
      variant: 'information'
      iconName: 'icon-information-circle-filled'
      alertId: 'info-1'
      message: 'Informative information goes here'
      linkText: 'Click here to read more'
      linkUrl: 'www.google.com'
    -
      variantName: 'Warning'
      variant: 'warning'
      iconName: 'icon-information-circle-filled'
      alertId: 'info-2'
      message: 'Warning! Watch your step around here.'
      linkText: 'Click here to read more'
      linkUrl: 'www.google.com'
    - 
      variantName: 'Error'
      variant: 'error'
      iconName: 'icon-information-circle-filled'
      alertId: 'info-3'
      message: 'Danger! There is an important alert!'
      linkText: 'Click here to read more'
      linkUrl: 'www.google.com'
---
::





## Events

| Key       | Type    |
| --------- | ------- |
| `dismiss` | Boolean |



## Usage

### Design usage

::div{.grid.grid-cols-2.gap-8.my-8}
  ::docs-component-usage{:use="true"}
    - When you need to capture user’s attention in a prominent way.
    - To inform user about important changes or conditions in the interface.
    - To highlight error and success messages in an interface.
    - Put alert close to the context it’s referring to e.g. “Apply” or “Save”   functionalities, or alternatively, if the alert is related to contents of an entire page, place it at the top of the page.
  ::
  ::docs-component-usage{:use="false"}
    - For highlighting general content or as a banner. Use Card component instead for such purposes.
    - Instead of generic error pages.
  ::
::



### Component usage

::alert{type=info}
Note: Alert does not handle the dismissed state itself. To dismiss an alert you should pass the `dismissed` prop to the component. Use the `dismiss` event to handle the close button press.
::



```vue
<script lang="ts" setup>
import { ref } from 'vue'
const dismissed = ref(false)
const onDismiss = () => dismissed.value = !dismissed.value
</script>
<template>
  <RplAlert v-bind="args"
    :key="uniqueId"
    :type="warning"
    :alertId="alert"
    :dismissed="dismissed"
    @dismiss="onDismiss"
  >
  </RplAlert>
</template>
```




## Accessibility

This component has been validated to meet the WCAG 2.1 AA accessibility guidelines. You can find additional information regarding accessibility of this component below.

