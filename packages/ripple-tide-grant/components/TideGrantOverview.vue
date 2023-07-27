<template>
  <RplPageComponent>
    <h2 class="tide-grant__title rpl-type-h2-fixed rpl-u-margin-b-6">
      {{ overview.title }}
    </h2>
    <TideGrantMeta
      variant="block"
      :audience="overview.audience"
      :funding="overview.funding"
      :dateFrom="overview.date.from"
      :dateTo="overview.date.to"
      :ongoing="overview.ongoing"
    />
  </RplPageComponent>

  <RplPageComponent
    v-if="overview.description"
    class="tide-grant__overview-item rpl-type-p"
  >
    <RplContent :html="overview.description"></RplContent>
  </RplPageComponent>

  <RplPageComponent v-if="overview.link" class="tide-grant__overview-item">
    <RplButton el="a" :href="overview.link.uri">
      {{ overview.link.title }}
    </RplButton>
  </RplPageComponent>
</template>

<script setup lang="ts">
import type { TideGrantOverview } from '../types'

interface Props {
  overview: TideGrantOverview
}

const props = defineProps<Props>()
</script>

<style>
.tide-grant__overview-item {
  display: flex;
  gap: var(--rpl-sp-3);
  align-items: center;
  margin-bottom: var(--rpl-sp-4);
}
</style>
