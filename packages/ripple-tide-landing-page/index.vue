
<template>
  <div :class="page.class">
    <rpl-page-layout
      :sidebar="hasSidebar"
      :backgroundColor="page.backgroundColor"
      :heroBackgroundImage="page.heroBackgroundImage"
      class="app-main"
    >
      <template slot="aboveContent">
        <rpl-hero-banner
          v-if="heroBanner"
          v-bind="heroBanner"
          class="rpl-site-constrain--on-all"
        />
        <rpl-acknowledgement v-if="page.acknowledgement" :text="$store.state.site.acknowledgement" theme="standalone" />
      </template>

      <template slot="aboveContentTwo">
        <page-components v-if="page.headerComponents" :componentMapping="page.headerComponents" />
        <!-- <template v-if="campaignPrimary && campaignPrimary.component">
          <component
            :is="campaignPrimary.component"
            v-bind="campaignPrimary.data"
          ></component>
        </template> -->
      </template>

      <rpl-row row-gutter class="app-content tide-content tide-content--landing-page">
        <template v-if="anchorLinks && anchorLinks.length > 0">
          <rpl-col cols="full">
            <rpl-anchor-links title="On this page:" :links="anchorLinks" />
          </rpl-col>
        </template>
        <page-components :componentMapping="page.bodyComponents" />
        <rpl-col v-if="page.showTags" cols="full">
          <app-topic-tags :topic="this.page.topic" :tags="this.page.tags" />
        </rpl-col>
      </rpl-row>
    </rpl-page-layout>
  </div>
</template>

<script>
// Layout.
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import { RplPageLayout } from '@dpc-sdp/ripple-layout'
import RplBreadcrumbs from '@dpc-sdp/ripple-breadcrumbs'
import RplUpdatedDate from '@dpc-sdp/ripple-updated-date'
import { RplHeroBanner, RplIntroBanner } from '@dpc-sdp/ripple-hero-banner'
import { RplAcknowledgement } from '@dpc-sdp/ripple-site-footer'

import RplAnchorLinks from '@dpc-sdp/ripple-anchor-links'
import PageComponents from './page-components.vue'
import AppTopicTags from './TopicTags'
import { getAnchorLinks } from './utils'

export default {
  components: {
    RplHeroBanner,
    RplAcknowledgement,
    RplIntroBanner,
    RplUpdatedDate,
    RplBreadcrumbs,
    RplPageLayout,
    RplRow,
    RplCol,
    RplAnchorLinks,
    PageComponents,
    AppTopicTags
  },
  props: {
    page: {
      type: Object
    }
  },
  computed: {
    anchorLinks () {
      return getAnchorLinks()
    },
    hasSidebar () {
      return false
    },
    heroBanner () {
      if (this.page.showHeroBanner) {
        return {
          title: this.page.title,
          links: this.page.heroBannerLinks,
          introText: this.page.summary
        }
      }
    }
  }
}
</script>

<style>

</style>
