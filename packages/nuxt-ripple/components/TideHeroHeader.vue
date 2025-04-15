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
  cornerTop: undefined,
  cornerBottom: undefined
})

const { direction, language } = inject('language')

const cornerTop = computed(() => {
  if (props.header?.backgroundImage) {
    return false
  }

  // `header.cornerTop` is the correct graphic that is calculated based on
  // the site, site section and node level graphics for the current page.
  if (props.header?.cornerTop?.src) {
    return props.header?.cornerTop?.src
  }

  // Only if there's no top or bottom corner graphic from the header mapping
  // should we fallback to the site corner graphics. This is here for backwards
  // compatibility.
  if (!props.header?.cornerBottom?.src && !props.header?.cornerTop?.src) {
    return props.cornerTop?.src || true
  }

  return false
})

const cornerBottom = computed(() => {
  if (props.header?.backgroundImage || props.hideBottomCornerGraphic) {
    return false
  }

  // `header.cornerBottom` is the correct graphic that is calculated based on
  // the site, site section and node level graphics for the current page.
  if (props.header?.cornerBottom?.src) {
    return props.header?.cornerBottom?.src
  }

  // Only if there's no top or bottom corner graphic from the header mapping
  // should we fallback to the site corner graphics. This is here for backwards
  // compatibility.
  if (!props.header?.cornerBottom?.src && !props.header?.cornerTop?.src) {
    return props.cornerBottom?.src || true
  }

  return false
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
    :class="{ [`${language}`]: language }"
    :dir="direction"
  >
    {{ header.summary }}
  </RplHeroHeader>
</template>
