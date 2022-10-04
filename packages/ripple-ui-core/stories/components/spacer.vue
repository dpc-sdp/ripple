<template>
  <div class="sb-spacer">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  color: {
    type: String,
    required: true
  }
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
