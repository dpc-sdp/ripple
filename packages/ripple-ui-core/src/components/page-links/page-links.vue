<script lang="ts">
export default { name: 'RplPageLinks' }
</script>

<script setup lang="ts">
import { RplLink } from '../../lib/constants'
import RplPageLinksItem from './page-links-item.vue'

interface Props {
  prev?: RplLink
  next?: RplLink
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
      label="Previous"
      icon-name="icon-arrow-left"
    >
      {{ prev.text }}
    </RplPageLinksItem>
    <RplPageLinksItem
      v-if="next"
      :link="next"
      label="Next"
      icon-name="icon-arrow-right"
    >
      {{ next.text }}
    </RplPageLinksItem>
  </nav>
</template>

<style src="./page-links.css" />
<style src="./page-links-focus.css" />
