<script setup lang="ts">
import { TideUrlField } from '@dpc-sdp/ripple-tide-api/types'
import { RplContent, RplIntroHeader } from '@dpc-sdp/ripple-ui-core'

defineProps<{
  title: string
  withIcon: boolean
  links: {
    title: string
    items: TideUrlField[]
    more: TideUrlField
  }
  html: string | null
}>()
</script>

<template>
  <RplIntroHeader
    :title="title"
    :links="links"
    :iconName="withIcon ? 'icon-exclamation-circle-filled' : null"
  >
    <RplContent :html="html" />
  </RplIntroHeader>
</template>
