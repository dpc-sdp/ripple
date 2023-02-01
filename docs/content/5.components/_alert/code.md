### Variants

::component-explorer
---
  component: RplAlert
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
