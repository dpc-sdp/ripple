<script setup lang="ts">
import { useSearchResult } from '#imports'

interface Props {
  result: any
}

const props = defineProps<Props>()

const { title, summary } = useSearchResult(props.result)
</script>

<template>
  <RplMapSidePanelItem class="tide-search-result" :title="title">
    {{ summary }}
  </RplMapSidePanelItem>
</template>

<style>
.budget-map-sidepanel-icon {
  color: var(--local-pin-colour);
}
</style>
