<script lang="ts">
export default { name: 'RplVerticalNavToggle' }
</script>

<script setup lang="ts">
import RplIcon from '../icon/icon.vue'

defineProps<{
  text: string
}>()
</script>

<template>
  <button
    class="
      rpl-vertical-nav__item rpl-vertical-nav__toggle
      rpl-u-focusable-block
    "
  >
    <span class="rpl-vertical-nav__toggle-text">{{ text }}</span>
    <span class="rpl-vertical-nav__toggle-icon" aria-hidden="true">
      <RplIcon name="icon-chevron-down" size="xs"></RplIcon>
    </span>
  </button>
</template>
