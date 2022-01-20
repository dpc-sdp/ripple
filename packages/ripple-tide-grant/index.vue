<template>
  <div :class="page.class">
    <rpl-page-layout
      :sidebar="hasSidebar"
      :backgroundGraphic="heroBgGraphic()"
      class="app-main"
    >
      <template slot="breadcrumbs">
        <rpl-breadcrumbs :crumbs="breadCrumbs" />
      </template>

      <template slot="aboveContent">
        <rpl-hero-banner
          v-if="page.heroBanner"
          v-bind="page.heroBanner"
          class="rpl-site-constrain--on-all"
          :backgroundGraphic="heroBgGraphic('bottom')"
        />
        <rpl-acknowledgement v-if="page.acknowledgement" :text="$store.state.site.acknowledgement" theme="standalone" />
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

        <rpl-updated-date v-if="page.showLastUpdated" :date="page.changed"></rpl-updated-date>
      </div>

      <template slot="sidebar">
        <rpl-share-this :title="shareTitle"></rpl-share-this>
      </template>

    </rpl-page-layout>
  </div>
</template>

<script>
import { RplPageLayout } from '@dpc-sdp/ripple-layout'
import RplBreadcrumbs from '@dpc-sdp/ripple-breadcrumbs'
import RplUpdatedDate from '@dpc-sdp/ripple-updated-date'
import { RplHeroBanner, RplIntroBanner } from '@dpc-sdp/ripple-hero-banner'
import { RplAcknowledgement } from '@dpc-sdp/ripple-site-footer'
import RplShareThis from '@dpc-sdp/ripple-share-this'

import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import RplGrantsOverview from '@dpc-sdp/ripple-grants'
import RplTimeline from '@dpc-sdp/ripple-timeline'
import RplDocumentLink from '@dpc-sdp/ripple-document-link'
import RplAccordion from '@dpc-sdp/ripple-accordion'

export default {
  components: {
    RplPageLayout,
    RplHeroBanner,
    RplIntroBanner,
    RplShareThis,
    RplAcknowledgement,
    RplUpdatedDate,
    RplBreadcrumbs,

    RplRow,
    RplCol,
    RplDocumentLink,
    RplGrantsOverview,
    RplTimeline,
    RplAccordion
  },
  props: {
    page: {
      type: Object
    }
  },
  computed: {
    hasSidebar: () => true,
    shareTitle: () => 'Share this page',
    heroBanner () {
      if (this.page.showHeroBanner) {
        return {
          title: this.page.title,
          links: this.page.heroBannerLinks,
          introText: this.page.summary
        }
      }
    },
    breadCrumbs () {
      return [
        { text: 'Home', url: '/' },
        { text: this.page.title }
      ]
    }
  },
  methods: {
    heroBgGraphic: (pos = 'shape') => `/img/header-pattern-${pos}.png`
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
