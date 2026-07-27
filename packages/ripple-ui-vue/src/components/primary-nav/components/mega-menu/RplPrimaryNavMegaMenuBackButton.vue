<script setup lang="ts">
import RplIcon from '../../../icon/RplIcon.vue'

interface Props {
  label: string
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <button
    class="rpl-primary-nav__mega-menu-back-button rpl-u-focusable-inline rpl-col-12 rpl-type-p-small rpl-type-weight-bold"
  >
    <RplIcon
      name="icon-chevron-left"
      size="xs"
      class="rpl-u-margin-r-2"
    ></RplIcon>
    <span>{{ label }}</span>
  </button>
</template>
