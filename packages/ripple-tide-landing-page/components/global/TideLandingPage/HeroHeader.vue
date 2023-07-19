<script setup lang="ts">
import { computed, inject } from 'vue'
import { ITideHeroHeader } from '../../../mapping/hero-header/hero-header-mapping'
import type { IRplFeatureFlags } from '@dpc-sdp/ripple-tide-api/types'
import { TideImageField } from '@dpc-sdp/nuxt-ripple/types'

const props = defineProps<{
  header: ITideHeroHeader
  hideBottomCornerGraphic: boolean
  hasBreadcrumbs: boolean
  cornerTop?: TideImageField
  cornerBottom?: TideImageField
}>()

const cornerTop = computed(() => {
  if (props.header.backgroundImage) {
    return false
  }

  return props.header.cornerTopImage?.src || props.cornerTop?.src || true
})

const cornerBottom = computed(() => {
  if (props.header.backgroundImage || props.hideBottomCornerGraphic) {
    return false
  }

  return props.header.cornerBottomImage?.src || props.cornerBottom?.src || true
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

const featureFlags: IRplFeatureFlags = inject('featureFlags', {
  headerTheme: 'default'
})

const headerTheme = computed(() => {
  /*
    Theme logic : Reverse and Image variants use the Neutral styling for the blocked title and introduction text.
    The Neutral styling does not affect the ‘Default’ variant of the Header.
  */
  if (props.header.backgroundImage || props.header.theme === 'reverse') {
    if (featureFlags?.headerTheme) {
      return featureFlags.headerTheme
    }
    return props.header.theme
  }
  return props.header.theme
})
</script>

<template>
  <RplHeroHeader
    v-if="header"
    :title="header.title"
    :links="{
      title: header.links?.title,
      items: header.links?.items,
      more: header.links?.more
    }"
    :theme="headerTheme"
    :logo="header.logoImage"
    :behindNav="true"
    :breadcrumbs="hasBreadcrumbs"
    :background="header.backgroundImage"
    :cornerTop="cornerTop"
    :cornerBottom="cornerBottom"
    :primaryAction="header.primaryAction"
    :secondaryAction="secondaryAction"
  >
    {{ header.introText }}
  </RplHeroHeader>
</template>
