---
title: Alert
description: 'Used to attract the attention of users with important messages or required actions and typically appear at the top of pages.'
layout: docs
---

# Alert

Used to attract the attention of users with important messages or required actions and typically appear at the top of pages. Users are still able to interact with the page below Alerts.

---

## Example

::component-example{fullWidth="true"}
  ::rpl-alert
  ---
  type: 'error'
  iconName: 'icon-information-circle-filled'
  alertId: 'info-1'
  message: 'This is an error'
  linkText: 'Click here to read more'
  linkUrl: 'www.google.com'
  ---
  ::
::

## Anatomy

::embed-frame{figma="https://www.figma.com/file/jtsOPNk1k4cWnumzkZgclD/Ripple-2.0-PoC?node-id=2951%3A189661" :fullscreen="false" :height="400"}
::

## Events

| Key       | Type    |
| --------- | ------- |
| `dismiss` | Boolean |



## Usage

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
::alert{type=info}
Note: Alert does not handle the dismissed state itself. To dismiss an alert you should pass the `dismissed` prop to the component. Use the `dismiss` event to handle the close button press.
::
