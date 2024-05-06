<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
interface Props {
  id: string
  name: string
  value?: string
  pii?: boolean
}

withDefaults(defineProps<Props>(), {
  value: undefined,
  invalid: false,
  required: false,
  pii: true
})
</script>

<template>
  <input :id="id" :name="name" :value="value" v-bind="$attrs" />
</template>
