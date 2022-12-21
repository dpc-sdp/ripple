<script lang="ts">
export default { name: 'TidePublicationPagination' }
</script>

<template>
  <div class="tide-publication-page__links rpl-u-margin-t-9">
    <RplPageLinks v-bind="pagination"></RplPageLinks>
  </div>
</template>

<script setup lang="ts">
import { TidePublicationPagination } from '../types'

interface Props {
  pagination: TidePublicationPagination
}

defineProps<Props>()
</script>
