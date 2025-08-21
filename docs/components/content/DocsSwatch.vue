<script setup lang="ts">
interface Props {
  colour: string
  type?: 'color' | 'image'
}

withDefaults(defineProps<Props>(), {
  type: 'color'
})
</script>

<template>
  <div class="docs-colour-swatch" :style="{ background: colour }" />
</template>

<style scoped>
.docs-colour-swatch {
  display: inline-block;
  width: var(--rpl-sp-6);
  aspect-ratio: 1;
  border-radius: 50%;
  border: var(--rpl-border-1) solid rgb(0 0 0 / 10%);
}
</style>
