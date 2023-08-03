<script setup lang="ts">
import { TideTopicTag } from '../mapping/base/topic-tags/topic-tags-mapping'

interface Props {
  items: TideTopicTag[]
}

defineProps<Props>()
</script>

<template>
  <div data-cy="topic-tags" class="tide-topic-tags">
    <RplChip
      v-for="(tag, index) in items"
      :key="tag.url"
      :label="tag.text"
      :url="tag.url"
      :index="index"
    />
  </div>
</template>

<style>
.tide-topic-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--rpl-sp-3);
  margin-top: var(--rpl-sp-6);

  .rpl-chip + .rpl-chip {
    margin-left: 0;
  }
}
</style>
