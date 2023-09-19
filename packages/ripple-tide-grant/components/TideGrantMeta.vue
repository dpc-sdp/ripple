<template>
  <RplDescriptionList
    :inline="true"
    :items="overviewList"
    :variant="props.variant === 'inline' ? 'icon' : 'default'"
    :class="`tide-grant-meta tide-grant-meta--${variant}`"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getGrantStatus } from '#imports'

interface Props {
  variant: 'inline' | 'block'
  audience: string
  funding: string | null
  dateFrom: string
  dateTo: string
  ongoing: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'inline'
})

const grantStatus = computed(() => {
  return getGrantStatus(new Date(), props.ongoing, props.dateFrom, props.dateTo)
})

const overviewList = computed(() => {
  let list: any[] = []

  if (props.audience) {
    list.push({
      term: 'Who can apply:',
      description: props.audience,
      iconName: 'icon-user-circle-filled'
    })
  }

  const open =
    grantStatus.value.status === 'open' ||
    grantStatus.value.status === 'opening_soon'

  list.push({
    term: 'Status:',
    description: grantStatus.value.displayLabel,
    iconName: open ? 'icon-check-circle-filled' : 'icon-cancel-circle-filled',
    iconColour: open ? 'success' : 'error'
  })

  if (props.funding) {
    list.push({
      term: 'Funding:',
      description: props.funding,
      iconName: 'icon-dollar-circle-filled'
    })
  }

  return list
})
</script>

<style>
.tide-grant-meta--inline {
  flex-wrap: wrap;
  flex-direction: row;
  column-gap: var(--rpl-sp-4);
  margin-bottom: var(--rpl-sp-4);
}

.tide-grant-meta--block {
  --local-list-spacing: var(--rpl-sp-4);
}
</style>
