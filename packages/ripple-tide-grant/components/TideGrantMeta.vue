<template>
  <RplList
    :items="overviewList"
    :item-class="{
      'tide-grant-meta--block': variant === 'block',
      'rpl-type-h4-fixed': variant === 'block'
    }"
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
      text: props.audience,
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

  if (props.funding) {
    list.push({
      text: props.funding,
      icon: 'icon-dollar-circle-filled'
    })
  }

  return list
})
</script>

<style>
.tide-grant-meta--block {
  display: flex;
  gap: var(--rpl-sp-3);
  align-items: center;
  margin-bottom: var(--rpl-sp-4);
}
</style>
