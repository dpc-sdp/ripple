<template>
  <RplDescriptionList
    :inline="true"
    :items="overviewList"
    :variant="variant === 'inline' ? 'icon' : 'default'"
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

  const icons = {
    open: {
      name: 'icon-check-circle-filled',
      color: 'success'
    },
    closed: {
      name: 'icon-cancel-circle-filled',
      color: 'error'
    },
    opening_soon: {
      name: 'icon-clock-circle-filled',
      color: 'warning'
    }
  }

  list.push({
    term: 'Status:',
    description: grantStatus.value.displayLabel,
    iconName:
      icons[grantStatus.value.status]?.name || 'icon-info-circle-filled',
    iconColour: icons[grantStatus.value.status]?.color || 'default'
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
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';

.tide-grant-meta--inline {
  flex-wrap: wrap;
  flex-direction: column;
  column-gap: var(--rpl-sp-4);
  margin-bottom: var(--rpl-sp-4);

  @media (--rpl-bp-m) {
    flex-direction: row;
  }
}

.tide-grant-meta--block {
  --local-list-spacing: var(--rpl-sp-4);
}
</style>
