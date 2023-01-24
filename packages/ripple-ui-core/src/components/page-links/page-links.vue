<script lang="ts">
export default { name: 'RplPageLinks' }
</script>

<script setup lang="ts">
import { RplLinkExtended } from '../../lib/constants'

interface Props {
  prev?: RplLinkExtended
  next?: RplLinkExtended
}

withDefaults(defineProps<Props>(), {
  next: undefined,
  prev: undefined
})
</script>

<template>
  <nav class="rpl-page-links">
    <slot />
  </nav>
</template>

<style src="./page-links.css" />
