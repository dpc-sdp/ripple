<template>
  <div :class="page.class">
    <rpl-page-layout
      :sidebar="hasSidebar"
      :backgroundColor="page.backgroundColor"
      :backgroundGraphic="heroBgGraphic"
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
        <page-components v-if="page.headerComponents" :componentMapping="page.headerComponents" :gutter="false" />
      </template>

      <rpl-row row-gutter class="app-content tide-content tide-content--landing-page">
        <template v-if="anchorLinks && anchorLinks.length > 0">
          <rpl-col cols="full">
            <rpl-anchor-links title="On this page:" :links="anchorLinks" />
          </rpl-col>
        </template>

        <div class="tide-content tide-content--grant">
          <rpl-row row-gutter v-if="page.overview">
            <rpl-col cols="full">
              <rpl-grants-overview v-bind="page.overview" />
            </rpl-col>
          </rpl-row>
          <rpl-row row-gutter v-if="page.timeline">
            <rpl-col cols="full">
              <rpl-timeline v-bind="page.timeline" ></rpl-timeline>
            </rpl-col>
          </rpl-row>
          <rpl-row row-gutter v-if="page.guidelines">
            <rpl-col cols="full">
              <div class="tide-guidelines">
                <h2 class="tide-guidelines__title" v-if="page.guidelines.title">{{page.guidelines.title}}</h2>
                <rpl-accordion v-if="page.guidelines.accordions && page.guidelines.accordions.length > 0" :accordions="page.guidelines.accordions"></rpl-accordion>
              </div>
            </rpl-col>
          </rpl-row>
          <rpl-row row-gutter v-if="page.supportingDocuments && page.supportingDocuments.length > 0">
            <rpl-col cols="full" v-for="file in page.supportingDocuments" :key="file.id">
              <rpl-document-link v-bind="file" />
            </rpl-col>
          </rpl-row>
        </div>

        <rpl-updated-date v-if="page.showLastUpdated" :date="page.changed"></rpl-updated-date>

        <rpl-col v-if="page.showTags" cols="full">
          <app-topic-tags :topic="this.page.topic" :tags="this.page.tags" />
        </rpl-col>
      </rpl-row>

      <template slot="sidebar">
        <page-components :componentMapping="page.sidebarComponents" />
      </template>
    </rpl-page-layout>
  </div>
</template>

<script>
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import { RplPageLayout } from '@dpc-sdp/ripple-layout'
import RplBreadcrumbs from '@dpc-sdp/ripple-breadcrumbs'
import RplUpdatedDate from '@dpc-sdp/ripple-updated-date'
import { RplHeroBanner, RplIntroBanner } from '@dpc-sdp/ripple-hero-banner'
import { RplAcknowledgement } from '@dpc-sdp/ripple-site-footer'

import RplGrantsOverview from '@dpc-sdp/ripple-grants'
import RplTimeline from '@dpc-sdp/ripple-timeline'
import RplDocumentLink from '@dpc-sdp/ripple-document-link'
import RplAccordion from '@dpc-sdp/ripple-accordion'

import RplAnchorLinks from '@dpc-sdp/ripple-anchor-links'
import PageComponents from '@dpc-sdp/ripple-tide-landing-page/page-components.vue'
import AppTopicTags from '@dpc-sdp/ripple-tide-landing-page/TopicTags.vue'

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
    RplDocumentLink,
    RplGrantsOverview,
    RplTimeline,
    RplAccordion,
    AppTopicTags
  },
  props: {
    page: {
      type: Object
    }
  },
  computed: {
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
    },
    heroBgGraphic () {
      if (this.page.heroBackgroundImage) {
        return this.page.heroBackgroundImage
      } else {
        return '/img/header-pattern-shape.png'
      }
    },
    anchorLinks: () => { return false }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

.tide-guidelines {
  &__title {
    @include rpl_mobile_padding();
    @include rpl_breakpoint('m') {
      padding-left: 0;
      padding-right: 0;
    }
  }
}

</style>
