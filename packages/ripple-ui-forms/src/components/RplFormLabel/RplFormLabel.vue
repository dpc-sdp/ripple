<script setup lang="ts">
interface Props {
  tag?: 'label' | 'legend'
  isRequired?: boolean
}

withDefaults(defineProps<Props>(), {
  tag: 'label',
  isRequired: false
})
</script>

<template>
  <component :is="tag" class="rpl-form-label">
    <slot />
    <span
      v-if="isRequired"
      class="rpl-form-label__required rpl-type-label-small"
      >(Required)</span
    ></component
  >
</template>

<style src="./RplFormLabel.css"></style>
