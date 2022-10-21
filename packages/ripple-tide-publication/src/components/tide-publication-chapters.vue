<script lang="ts">
export default { name: 'TidePublicationChapters' }
</script>

<template>
  <ul class="rpl-grid rpl-u-margin-t-6">
    <TidePublicationChapterCard
      v-for="(chapter, i) in chapters"
      :key="i"
      :chapter="chapter"
      class="rpl-col-12"
    >
    </TidePublicationChapterCard>
  </ul>
</template>

<script setup lang="ts">
import TidePublicationChapterCard from './tide-publication-chapter-card.vue'
import { TidePublicationChapter } from '../../types'

defineProps<{
  chapters: Array<TidePublicationChapter>
}>()
</script>
