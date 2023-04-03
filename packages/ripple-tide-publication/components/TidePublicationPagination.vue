<template>
  <div class="tide-publication-page__links rpl-u-margin-t-9">
    <RplPageLinks>
      <RplPageLinksItem
        v-if="pagination.prev?.url"
        direction="prev"
        :label="pagination.prev.label"
        :url="pagination.prev.url"
      >
        {{ pagination.prev.description }}
      </RplPageLinksItem>
      <RplPageLinksItem
        v-if="pagination.next?.url"
        direction="next"
        :label="pagination.next.label"
        :url="pagination.next.url"
      >
        {{ pagination.next.description }}
      </RplPageLinksItem>
    </RplPageLinks>
  </div>
</template>

<script setup lang="ts">
import { TidePublicationPagination } from '../types'

interface Props {
  pagination: TidePublicationPagination
}

defineProps<Props>()
</script>
