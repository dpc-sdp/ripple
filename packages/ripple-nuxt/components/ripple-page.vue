<template>
  <div class="rpl-page" v-if="page && !page.error" :class="page.class">
    <rpl-page-layout
      :sidebar="hasSidebar || Boolean($slots.sidebar)"
      :backgroundColor="page.backgroundColor"
      :backgroundGraphic="heroBgGraphic"
      class="app-main"
    >
      <slot name="banner">
        <template slot="breadcrumbs">
          <rpl-breadcrumbs v-if="!page.appIsHome" :crumbs="page.breadcrumbs" />
        </template>

        <template slot="aboveContent">
          <rpl-hero-banner
            v-if="page.heroBanner && page.heroBanner.visible"
            v-bind="page.heroBanner"
            :summary="page.summary"
            class="rpl-site-constrain--on-all"
            :backgroundGraphic="page.heroBanner.imageEnd"
          />
          <rpl-acknowledgement
            v-if="page.acknowledgement"
            :text="$store.state.site.acknowledgement"
            theme="standalone"
          />
        </template>

        <template slot="aboveContentTwo">
          <page-components
            v-if="page.headerComponents"
            :componentMapping="page.headerComponents"
            :gutter="false"
          />
        </template>
      </slot>
      <slot name="aboveBody">
        <rpl-row row-gutter>
          <rpl-col v-if="anchorLinks && anchorLinks.length > 0" cols="full">
            <rpl-anchor-links title="On this page:" :links="anchorLinks" />
          </rpl-col>
        </rpl-row>
      </slot>
      <slot name="body">
        <!-- Content Type page -->
        <component :is="pageComponent" :page="page"></component>
      </slot>
      <slot name="belowBody">
        <rpl-updated-date
          v-if="page.showLastUpdated"
          :date="page.changed"
        ></rpl-updated-date>

        <rpl-col v-if="page.showTags" cols="full">
          <app-topic-tags :topic="page.topic" :tags="page.tags" />
        </rpl-col>
      </slot>
      <template slot="sidebar">
        <slot name="sidebar">
          <page-components
            v-if="page.sidebarComponents"
            :componentMapping="page.sidebarComponents"
            :gutter="false"
          />
        </slot>
      </template>
    </rpl-page-layout>
  </div>
  <error-page v-else-if="error" :type="error"></error-page>
</template>

<script>
import errorPage from '@dpc-sdp/ripple-nuxt/components/error'

import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import { RplPageLayout } from '@dpc-sdp/ripple-layout'
import RplBreadcrumbs from '@dpc-sdp/ripple-breadcrumbs'
import RplUpdatedDate from '@dpc-sdp/ripple-updated-date'
import { RplHeroBanner, RplIntroBanner } from '@dpc-sdp/ripple-hero-banner'
import { RplAcknowledgement } from '@dpc-sdp/ripple-site-footer'

import RplAnchorLinks from '@dpc-sdp/ripple-anchor-links'
import PageComponents from './page-components.vue'
import AppTopicTags from './TopicTags'
import { getAnchorLinks } from './../lib/utils'

export default {
  name: 'rpl-page',
  components: {
    errorPage,
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
    page: Object
  },
  computed: {
    pageComponent () {
      if (this.page && this.page.type) {
        try {
          return this.$tideApi.getModuleComponent(this.page.type)
        } catch (error) {
          return null
        }
      }
    },
    anchorLinks () {
      return getAnchorLinks()
    },
    hasSidebar () {
      return this.page.sidebarComponents?.length > 0
    },
    heroBgGraphic () {
      if (this.page.heroBanner?.image) {
        return this.page.heroBanner.image
      } else {
        return '/img/header-pattern-shape.png'
      }
    }
  }
}
</script>

<style>
.rpl-page {
}
</style>
