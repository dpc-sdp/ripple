<script lang="ts">
export default { name: 'TideGrantOverview' }
</script>

<template>
  <RplLayoutPageComponent>
    <h2 class="tide-grant__title rpl-type-h2-fixed rpl-u-margin-b-6">
      {{ overview.title }}
    </h2>
    <ol class="tide-grant__overview-items">
      <li
        v-if="overview.funding"
        data-cy="funding"
        class="tide-grant__overview-item rpl-type-label"
      >
        <RplIcon colour="default" name="icon-dollar-circle-filled"></RplIcon
        ><span class="rpl-type-h4-fixed">
          {{ overview.funding }}
        </span>
      </li>
      <li
        v-if="overview.audience"
        class="tide-grant__overview-item rpl-type-label"
      >
        <RplIcon colour="default" name="icon-user-circle-filled"></RplIcon
        ><span class="rpl-type-h4-fixed"> {{ overview.audience }}</span>
      </li>
      <li class="tide-grant__overview-item rpl-type-label">
        <RplIcon
          v-if="
            grantStatus.status === 'open' ||
            grantStatus.status === 'opening_soon'
          "
          name="icon-check-circle-filled"
          colour="success"
          data-cy="statusIcon"
        ></RplIcon
        ><RplIcon
          v-else
          name="icon-cancel-circle-filled"
          colour="error"
          data-cy="statusIcon"
        ></RplIcon
        ><span class="rpl-type-h4-fixed" data-cy="statusText">
          {{ grantStatus.displayLabel }}
        </span>
      </li>
    </ol>
  </RplLayoutPageComponent>

  <RplLayoutPageComponent
    v-if="overview.description"
    class="tide-grant__overview-item rpl-type-p"
  >
    <RplContent :html="overview.description"></RplContent>
  </RplLayoutPageComponent>

  <RplLayoutPageComponent
    v-if="overview.link"
    class="tide-grant__overview-item"
  >
    <RplButton el="a" :href="overview.link.uri">{{
      overview.link.title
    }}</RplButton>
  </RplLayoutPageComponent>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TideGrantOverview } from '../types'
import { getGrantStatus } from '@dpc-sdp/ripple-ui-core'

interface Props {
  overview: TideGrantOverview
}

const props = defineProps<Props>()

const grantStatus = computed(() => {
  return getGrantStatus(
    new Date(),
    props.overview.ongoing,
    props.overview.date.from,
    props.overview.date.to
  )
})
</script>

<style>
.tide-grant__overview-item {
  display: flex;
  gap: var(--rpl-sp-3);
  align-items: center;
  margin-bottom: var(--rpl-sp-4);
}
</style>
