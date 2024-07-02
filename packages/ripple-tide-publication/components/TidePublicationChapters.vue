<script lang="ts">
export default { name: 'TidePublicationChapters' }
</script>

<template>
  <ul class="tide-publication__chapters rpl-grid rpl-u-margin-t-6">
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
import { TidePublicationChapter } from '../types'

interface Props {
  chapters: Array<TidePublicationChapter>
}

defineProps<Props>()
</script>
