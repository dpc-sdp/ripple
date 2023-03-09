<template>
  <RplNavCard :title="chapter.title" :url="chapter.url" class="rpl-col-12">
    <p>{{ chapter.summary }}</p>
  </RplNavCard>
</template>

<script setup lang="ts">
import { TidePublicationChapter } from '../types'

defineProps<{
  chapter: TidePublicationChapter
}>()
</script>
