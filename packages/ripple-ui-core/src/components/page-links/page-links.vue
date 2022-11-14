<script lang="ts">
export default { name: 'RplPageLinks' }
</script>

<script setup lang="ts">
import { RplLinkExtended } from '../../lib/constants'
import RplPageLinksItem from './page-links-item.vue'

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
    <RplPageLinksItem
      v-if="prev"
      :link="prev"
      :label="prev.text || 'Previous'"
      icon-name="icon-arrow-left"
    >
      {{ prev.description }}
    </RplPageLinksItem>
    <RplPageLinksItem
      v-if="next"
      :link="next"
      :label="next.text || 'Next'"
      icon-name="icon-arrow-right"
    >
      {{ next.description }}
    </RplPageLinksItem>
  </nav>
</template>

<style src="./page-links.css" />
