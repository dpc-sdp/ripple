<script lang="ts">
export default {
  name: 'RplIconSprite'
}
</script>

<script setup lang="ts">
import svgSprite from './../../assets/icons/sprite.svg?component'
defineProps({
  hidden: {
    type: Boolean,
    default: true
  },
  customSprite: {
    type: [Object, Boolean],
    default: false
  }
})
</script>

<template>
  <component
    :is="customSprite"
    v-if="customSprite"
    :class="hidden && 'rpl-svg-sprite--hidden'"
  >
  </component>
  <component
    :is="svgSprite"
    v-else
    :aria-hidden="hidden"
    :class="hidden && 'rpl-svg-sprite--hidden'"
  >
  </component>
</template>

<style>
.rpl-svg-sprite {
  &--hidden {
    display: none;
  }
}
</style>
