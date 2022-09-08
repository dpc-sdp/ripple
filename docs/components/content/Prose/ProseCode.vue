<script lang="ts">
import { defineComponent } from '#imports'
export default defineComponent({
  props: {
    code: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: null
    },
    filename: {
      type: String,
      default: null
    },
    highlights: {
      type: Array as () => number[],
      default: () => []
    }
  }
})
</script>

<template>
  <div class="p-8 my-8 bg-slate-800 dark:bg-slate-50 rounded text-base">
    <slot />
  </div>
</template>

<style>
pre code .line {
  display: block;
  min-height: 1rem;
}
</style>
