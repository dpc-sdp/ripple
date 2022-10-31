<script setup lang="ts">
import { RplHeroHeader } from '@dpc-sdp/ripple-ui-core'
import { computed } from 'vue'
import { ITideHeroHeader } from '../mapping/hero-header/hero-header-mapping'

const props =
  defineProps<{
    header: ITideHeroHeader
  }>()

const cornerTop = computed(() => {
  if (props.header.backgroundImage) {
    return false
  }

  return props.header.cornerTopImage?.src || false
})

const cornerBottom = computed(() => {
  if (props.header.backgroundImage) {
    return false
  }

  return props.header.cornerBottomImage?.src || false
})

const secondaryAction = computed(() => {
  if (!props.header.secondaryAction) {
    return null
  }
  return {
    ...props.header.secondaryAction,
    title: props.header.secondaryActionLabel
  }
})
</script>

<template>
  <RplHeroHeader
    :title="header.title"
    :links="{
      title: header.links.title,
      items: header.links.items,
      more: header.links.more
    }"
    :theme="header.theme"
    :logo="header.logoImage"
    :behindNav="true"
    :breadcrumbs="true"
    :background="header.backgroundImage"
    :cornerTop="cornerTop"
    :cornerBottom="cornerBottom"
    :primaryAction="header.primaryAction"
    :secondaryAction="secondaryAction"
  >
    {{ header.introText }}
  </RplHeroHeader>
</template>
