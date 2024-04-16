<script setup lang="ts">
import { defineProps } from 'vue'

interface Props {
  result: any
}

const props = defineProps<Props>()
</script>

<template>
  <RplMapSidePanelItem class="tide-search-result" :title="result.test_title">
    <p class="rpl-type-p-small">{{ result.description }}</p>
  </RplMapSidePanelItem>
</template>
