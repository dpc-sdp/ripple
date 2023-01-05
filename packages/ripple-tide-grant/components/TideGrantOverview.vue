<template>
  <RplLayoutPageComponent>
    <h2 class="tide-grant__title rpl-type-h2-fixed rpl-u-margin-b-6">
      {{ overview.title }}
    </h2>
    <RplList
      :items="overviewList"
      item-class="tide-grant__overview-item rpl-type-h4-fixed"
    />
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
    <RplButton el="a" :href="overview.link.uri">
      {{ overview.link.title }}
    </RplButton>
  </RplLayoutPageComponent>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TideGrantOverview } from '../../types'
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

const overviewList = computed(() => {
  let list: any[] = []

  if (props.overview?.funding) {
    list.push({
      text: props.overview.funding,
      icon: 'icon-dollar-circle-filled'
    })
  }
  if (props.overview?.funding) {
    list.push({
      text: props.overview.audience,
      icon: 'icon-user-circle-filled'
    })
  }

  const open =
    grantStatus.value.status === 'open' ||
    grantStatus.value.status === 'opening_soon'

  list.push({
    text: grantStatus.value.displayLabel,
    icon: open ? 'icon-check-circle-filled' : 'icon-cancel-circle-filled',
    iconColour: open ? 'success' : 'error'
  })

  return list
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
