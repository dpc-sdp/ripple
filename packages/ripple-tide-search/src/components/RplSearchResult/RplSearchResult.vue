<script setup lang="ts">
import { RplTextLink } from '@dpc-sdp/ripple-ui-core'
interface Props {
  title: string,
  url: string,
  summary?: string | null,
  updated?: string | null
}

withDefaults(defineProps<Props>(), {
  summary: null,
  updated: null
})
</script>

<template>
  <div :class="`rpl-search-result`">
    <RplTextLink class="rpl-type-h3" :url="url">{{ title }}</RplTextLink>
    <p v-if="url" class="rpl-search-result__meta rpl-type-p-small">{{ url }}</p>
    <p v-if="summary" class="rpl-search-result__body rpl-type-p"> {{ summary }}</p>
    <p v-if="updated" class="rpl-search-result__body rpl-type-p"> Updated {{ updated }}</p>
  </div>
</template>

<style src="./RplSearchResult.css" >

</style>
