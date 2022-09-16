<script lang="ts">
export default { name: 'RplPrimaryNav' }
</script>

<script setup lang="ts">
import RplPrimaryNavBar from './nav-bar.vue'

import { RplPrimaryNavLogo, RplPrimaryNavItem } from './constants'

interface Props {
  primaryLogo: RplPrimaryNavLogo
  secondaryLogo?: RplPrimaryNavLogo
  items: RplPrimaryNavItem[]
}

const props = withDefaults(defineProps<Props>(), {
  secondaryLogo: undefined
})
</script>

<template>
  <nav class="rpl-primary-nav">
    <RplPrimaryNavBar
      :primary-logo="props.primaryLogo"
      :secondary-logo="props.secondaryLogo"
      :items="props.items"
    />
  </nav>
</template>

<style src="./primary-nav.css" />
