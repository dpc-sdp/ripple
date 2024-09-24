<script setup lang="ts">
import RplIcon from '../icon/RplIcon.vue'

interface Props {
  text: string
}
defineProps<Props>()
</script>

<template>
  <button
    type="button"
    :aria-label="`Toggle ${text} menu`"
    class="rpl-vertical-nav__item rpl-vertical-nav__toggle rpl-u-focusable-block"
  >
    <span class="rpl-vertical-nav__toggle-text">{{ text }}</span>
    <span class="rpl-vertical-nav__toggle-icon" aria-hidden="true">
      <RplIcon name="icon-chevron-down" size="xs"></RplIcon>
    </span>
  </button>
</template>
