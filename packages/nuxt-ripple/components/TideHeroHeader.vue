<script setup lang="ts">
import { computed, inject } from 'vue'
import { TideHeroHeader } from '../types'
import type { IRplFeatureFlags } from '@dpc-sdp/ripple-tide-api/types'
import { TideImageField } from '@dpc-sdp/ripple-tide-api/types'

interface Props {
  header: TideHeroHeader
  hasBreadcrumbs: boolean
  hideBottomCornerGraphic?: boolean
  behindNav?: boolean
  cornerTop?: TideImageField
  cornerBottom?: TideImageField
}

const props = withDefaults(defineProps<Props>(), {
  behindNav: true,
  hideBottomCornerGraphic: false,
  cornerTop: null,
  cornerBottom: null
})

const cornerTop = computed(() => {
  if (props.header?.backgroundImage) {
    return false
  }

  return props.header?.cornerTop?.src || props.cornerTop?.src || true
})

const cornerBottom = computed(() => {
  if (props.header?.backgroundImage || props.hideBottomCornerGraphic) {
    return false
  }

  return props.header?.cornerBottom?.src || props.cornerBottom?.src || true
})

const secondaryAction = computed(() => {
  if (!props.header?.secondaryAction) {
    return null
  }

  return {
    ...props.header.secondaryAction,
    title: props.header?.secondaryActionLabel
  }
})

const headerLinks = computed(() => {
  if (!props.header?.links) {
    return null
  }

  return {
    title: props.header.links?.title,
    items: props.header.links?.items,
    more: props.header.links?.more
  }
})

const featureFlags: IRplFeatureFlags = inject('featureFlags', {
  headerTheme: 'default'
})

const headerTheme = computed(() => {
  /*
    Theme logic : Reverse and Image variants use the Neutral styling for the blocked title and introduction text.
    The Neutral styling does not affect the ‘Default’ variant of the Header.
  */
  if (props.header?.backgroundImage || props.header?.theme === 'reverse') {
    if (featureFlags?.headerTheme) {
      return featureFlags.headerTheme
    }
    return props.header?.theme || 'default'
  }
  return props.header?.theme || 'default'
})
</script>

<template>
  <RplHeroHeader
    :title="header.title"
    :links="headerLinks"
    :theme="headerTheme"
    :logo="header?.logoImage"
    :behindNav="behindNav"
    :breadcrumbs="hasBreadcrumbs"
    :cornerTop="cornerTop"
    :cornerBottom="cornerBottom"
    :background="header?.backgroundImage"
    :primaryAction="header?.primaryAction"
    :secondaryAction="secondaryAction"
  >
    {{ header.summary }}
  </RplHeroHeader>
</template>
