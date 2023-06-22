<template>
  <div class="sb-spacer" :style="{ height: height ? `${height}px` : '100%' }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  color: string
  height?: number
}

withDefaults(defineProps<Props>(), {
  height: undefined
})
</script>

<style scoped>
.sb-spacer {
  padding: 1rem;
  width: 100%;
  height: 100%;
  background-color: v-bind(color);
}
</style>
