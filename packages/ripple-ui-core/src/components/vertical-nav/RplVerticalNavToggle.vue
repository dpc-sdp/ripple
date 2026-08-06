<script setup lang="ts">
import RplIcon from '../icon/RplIcon.vue'

interface Props {
  text: string
  showText?: boolean
}

withDefaults(defineProps<Props>(), {
  showText: false
})
</script>

<template>
  <button
    type="button"
    :aria-label="`Toggle ${text} menu`"
    :class="{
      'rpl-vertical-nav__toggle': true,
      'rpl-u-focusable-block': true,
      'rpl-vertical-nav__item': showText
    }"
  >
    <span v-if="showText" class="rpl-vertical-nav__toggle-text">
      {{ text }}
    </span>
    <span class="rpl-vertical-nav__toggle-icon" aria-hidden="true">
      <RplIcon name="icon-chevron-down" size="xs"></RplIcon>
    </span>
  </button>
</template>
