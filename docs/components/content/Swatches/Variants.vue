<script setup lang="ts">
import { useSlots } from '#imports'
const slots = useSlots()
</script>

<template>
  <div>
    <ComponentExample>
      <slot name="component"> </slot>
    </ComponentExample>
  </div>
</template>
