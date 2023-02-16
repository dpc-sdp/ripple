<script setup lang="ts">
import svgSprite from './../../assets/icons/sprite.svg?component'

interface Props {
  hidden?: boolean
  customSprite?: any | boolean
}

withDefaults(defineProps<Props>(), {
  hidden: true,
  customSprite: false
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
