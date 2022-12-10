<script lang="ts">
export default { name: 'RplPrimaryNavMegaMenuBackButton' }
</script>

<script setup lang="ts">
import RplIcon from '../../../icon/icon.vue'

interface Props {
  label: string
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <button
    class="
      rpl-primary-nav__mega-menu-back-button
      rpl-col-12 rpl-type-p-small rpl-type-weight-bold
    "
  >
    <RplIcon
      name="icon-chevron-left"
      size="xs"
      class="rpl-u-margin-r-2"
    ></RplIcon>
    <span>{{ label }}</span>
  </button>
</template>
