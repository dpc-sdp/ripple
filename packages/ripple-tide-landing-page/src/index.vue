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
      <TideLandingPageHeroAcknowledgement v-if="page.showHeroAcknowledgement" />
      <TideDynamicComponents
        v-if="page.headerComponents?.length > 0"
        :components="page.headerComponents"
        class="rpl-col-12"
        :fullWidth="true"
      />
      <TideLandingPagePrimaryCampaignBanner
        v-if="page.primaryCampaign"
        :campaign="page.primaryCampaign"
      />
    </template>
    <template #body="{ hasSidebar }">
      <TideLandingPageInPageNavigation
        v-if="page.showInPageNav"
        :headingLevel="page.inPageNavHeadingLevel"
        :components="page.bodyComponents"
      />
      <TideDynamicComponents
        v-if="page.bodyComponents?.length > 0"
        :components="page.bodyComponents"
        :hasSidebar="hasSidebar"
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
import type { TideLandingPagePage } from './types'

defineProps<{
  page: TideLandingPagePage
}>()
</script>
