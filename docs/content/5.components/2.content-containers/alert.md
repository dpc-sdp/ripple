---
title: Alert
description: 'Used to attract the attention of users with important messages or required actions and typically appear at the top of pages. '
---
## Overview

Informs user about important changes or conditions in the interface. Use this component if you need to capture user’s attention in a prominent way.

::component-example{fullWidth="true"}
  ::rpl-alert
  ---
  variant: 'error'
  iconName: 'icon-information-circle-filled'
  message: 'This is an error'
  linkText: 'Click here to read more'
  linkUrl: 'www.google.com'
  ---
  ::
::


### Anatomy

::embed-frame{figma="https://www.figma.com/file/jtsOPNk1k4cWnumzkZgclD/Ripple-2.0-PoC?node-id=2394%3A121801" :fullscreen="false" :height="400"}
::

| Key | Label      |
| --- | ---------- |
| A   | Alert Icon |
| B   | Message    |
| C   | Call to action |
| D   | Close icon |
| E   | Container  |



## Variants

### Information

::component-example{fullWidth="true"}
  ::rpl-alert
  ---
  variant: 'information'
  iconName: 'icon-information-circle-filled'
  alertId: 'info-1'
  message: 'Informative information goes here'
  linkText: 'Click here to read more'
  linkUrl: 'www.google.com'
  ---
  ::
::
### Warning

::component-example{fullWidth="true"}
  ::rpl-alert
  ---
  variant: 'warning'
  iconName: 'icon-information-circle-filled'
  alertId: 'info-1'
  message: 'Warning! Watch your step around here.'
  linkText: 'Click here to read more'
  linkUrl: 'www.google.com'
  ---
  ::
::

### Error

::component-example{fullWidth="true"}
  ::rpl-alert
  ---
  variant: 'error'
  iconName: 'icon-information-circle-filled'
  message: 'Danger! There is an important alert!'
  linkText: 'Click here to read more'
  linkUrl: 'www.google.com'
  ---
  ::
::

## Events

| Key       | Type    |
| --------- | ------- |
| `dismiss` | Boolean |



## Usage

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


