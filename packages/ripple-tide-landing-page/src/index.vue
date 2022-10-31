<template>
  <RplLayout :background="page.background">
    <template #aboveHeader>
      <slot name="aboveHeader"></slot>
    </template>
    <template #primaryNav>
      <slot name="primaryNav"></slot>
    </template>
    <template #breadcrumbs>
      <slot name="breadcrumbs"></slot>
    </template>
    <template #aboveBody>
      <TideLandingPageHeroHeader :header="page.heroHeader" />
      <TideDynamicComponents
        v-if="page.headerComponents?.length > 0"
        :components="page.headerComponents"
        class="rpl-col-12"
      />
      <TideLandingPagePrimaryCampaignBanner
        v-if="page.primaryCampaign"
        :campaign="page.primaryCampaign"
      />
    </template>
    <template #body>
      <TideDynamicComponents
        v-if="page.bodyComponents?.length > 0"
        :components="page.bodyComponents"
      />
    </template>
    <template #belowBody>
      <TideLandingPageSecondaryCampaignBanner
        v-if="page.secondaryCampaign"
        :campaign="page.secondaryCampaign"
      />
    </template>
    <template #aboveSidebar>
      <slot name="aboveSidebar"></slot>
    </template>
    <template #sidebar>
      <slot name="sidebar"></slot>
    </template>
    <template #belowSidebar>
      <slot name="aboveSidebar"></slot>
    </template>
    <template #footer>
      <slot name="footer"> </slot>
    </template>
  </RplLayout>
</template>

<script setup lang="ts">
import type TideLandingPagePage from './../types'

defineProps<{
  page: TideLandingPagePage
}>()
</script>
