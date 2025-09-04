<script setup lang="ts">
import { useTideSite, useTidePage } from '#imports'
import { TideSiteData } from '@dpc-sdp/ripple-tide-api/types'

const site: TideSiteData = await useTideSite()
let page

try {
  page = await useTidePage()
} catch (error) {
  if (error.statusCode !== 404) {
    throw error
  }
}
</script>

<template>
  <TideTideSearchListing v-if="page" :site="site" :page="page" />
  <TideDefaultSiteSearch v-else :site="site" />
</template>
