<script lang="ts">
export default { name: 'TidePublicationPagePagination' }
</script>

<template>
  <div class="tide-publication-page__links rpl-u-margin-t-9">
    <RplPageLinks v-bind="pagination"></RplPageLinks>
  </div>
</template>

<script setup lang="ts">
import { TidePublicationPagePagination } from '../types'

defineProps<{
  pagination: TidePublicationPagePagination
}>()
</script>
