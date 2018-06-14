<template>
  <rpl-base-layout class="demo">

    <template slot="header">
      <rpl-site-header
        :logo="mock.header.logo"
        :links="mock.header.links"
        :breakpoint="mock.header.breakpoint"
        :searchTerms="mock.header.searchTerms"
        sticky
        @open="menuOpenFunc"
        @search="searchFunc"
      />
    </template>

    <rpl-page-layout :sidebar="sidebar" class="main rpl-container">

      <template slot="aboveContent">
        <rpl-hero-banner
          :title="mock.heroBanner.title" :introText="mock.heroBanner.introText"
          :linkHeading="mock.heroBanner.linkHeading" :links="mock.heroBanner.links"
          :moreLink="mock.heroBanner.moreLink"
          class="rpl-site-constrain--on-all"
        />
        <div class="banner-primary rpl-site-constrain--on-all">
          <div class="sub-content">banner primary</div>
        </div>
      </template>

      <rpl-row row-gutter class="demo-main">
        <rpl-col cols="full" :colsBp="defaultCols">
          <rpl-card-navigation-featured :title="mock.cardNavigationFeatured.title" :summary="mock.cardNavigationFeatured.summary" :url="mock.cardNavigationFeatured.url" :image="mock.cardNavigationFeatured.image" />
        </rpl-col>
        <rpl-col cols="full" :colsBp="defaultCols">
          <rpl-card-navigation :title="mock.cardNavigation.title" :summary="mock.cardNavigation.summary" :url="mock.cardNavigation.url" />
        </rpl-col>
        <rpl-col cols="full" :colsBp="sidebar ? cardColsWithSidebar : cardCols">
          <rpl-card-promotion :image="mock.cardPromotion.image" :date="mock.cardPromotion.date" :tags="mock.cardNavigation.tags" :title="mock.cardPromotion.title" :summary="mock.cardPromotion.summary" :link="mock.cardPromotion.link" />
        </rpl-col>
        <rpl-col cols="full" :colsBp="sidebar ? cardColsWithSidebar : cardCols">
          <rpl-card-keydates :title="mock.cardKeydates.title" :keydates="mock.cardKeydates.keydates" :link="mock.cardKeydates.link" />
        </rpl-col>
        <rpl-col cols="full" :colsBp="sidebar ? cardColsWithSidebar : cardCols">
          <rpl-card-event :image="mock.cardEvent.image" :date="mock.cardEvent.date" :location="mock.cardEvent.location" :title="mock.cardEvent.title" :summary="mock.cardEvent.summary" :link="mock.cardEvent.link" />
        </rpl-col>
        <rpl-col cols="full" :colsBp="sidebar ? cardColsWithSidebar : cardCols">
          <rpl-card-promotion :image="mock.cardPromotion.image" :date="mock.cardPromotion.date" :tags="mock.cardNavigation.tags" :title="mock.cardPromotion.title" :summary="mock.cardPromotion.summary" :link="mock.cardPromotion.link" />
        </rpl-col>
        <rpl-col cols="full" :colsBp="sidebar ? cardColsWithSidebar : cardCols">
          <rpl-card-event :image="mock.cardEvent.image" :date="mock.cardEvent.date" :location="mock.cardEvent.location" :title="mock.cardEvent.title" :summary="mock.cardEvent.summary" :link="mock.cardEvent.link" />
        </rpl-col>
        <rpl-col cols="full" :colsBp="sidebar ? cardColsWithSidebar : cardCols">
          <rpl-card-keydates :title="mock.cardKeydates.title" :keydates="mock.cardKeydates.keydates" :link="mock.cardKeydates.link" />
        </rpl-col>
        <rpl-col cols="full" :colsBp="defaultCols">
          <div class="cta" :class="sidebar ? 'rpl-edge--below-l rpl-site-constrain--below-l' : 'rpl-edge--on-all rpl-site-constrain--on-all'">
            <div class="sub-content">
              edge style call to action
            </div>
          </div>
        </rpl-col>
      </rpl-row>

      <template slot="sidebar">
        <rpl-related-links :title="mock.relatedLinks.title" :links="mock.relatedLinks.links" class="rpl-component-gutter"/>
        <rpl-whats-next :title="mock.whatsNext.title" :links="mock.whatsNext.links"  class="rpl-component-gutter" />
      </template>

      <template slot="belowContent">
        <div class="banner-secondary rpl-site-constrain--on-all">
          <div class="sub-content">banner secondary</div>
        </div>
      </template>

    </rpl-page-layout>

    <template slot="footer">
      <rpl-site-footer
        :nav="mock.footer.nav"
        :links="mock.footer.links"
        :copyright="mock.footer.copyright"
        />
    </template>

  </rpl-base-layout>

</template>

<script>
// Import all demo data
import demoData from './../_data/demoData.js'

import { RplBaseLayout, RplPageLayout } from '@dpc-sdp/ripple-layout'
import { RplContainer, RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import RplSiteFooter from '@dpc-sdp/ripple-site-footer'
import RplSiteHeader from '@dpc-sdp/ripple-site-header'

// Banner
import RplHeroBanner from '@dpc-sdp/ripple-hero-banner'

// Card
import { RplCardNavigation, RplCardNavigationFeatured, RplCardPromotion, RplCardKeydates, RplCardEvent } from '@dpc-sdp/ripple-card'

// Sidebar
import RplRelatedLinks from '@dpc-sdp/ripple-related-links'
import RplWhatsNext from '@dpc-sdp/ripple-whats-next'

export default {
  name: 'SPage',
  components: {
    // Layout
    RplBaseLayout,
    RplPageLayout,
    RplContainer,
    RplRow,
    RplCol,
    RplSiteHeader,
    RplSiteFooter,

    // Banner
    RplHeroBanner,

    // Card
    RplCardNavigation,
    RplCardNavigationFeatured,
    RplCardPromotion,
    RplCardKeydates,
    RplCardEvent,

    // Sidebar
    RplRelatedLinks,
    RplWhatsNext
  },
  props: {
    sidebar: Boolean
  },
  data () {
    return {
      cardCols: {
        m: 6,
        l: 4,
        xxxl: 3
      },
      cardColsWithSidebar: {
        m: 6,
        xxxl: 4
      },
      defaultCols: {},
      mock: demoData
    }
  },
  methods: {
    // Methods for site header.
    searchFunc: function (value) {
      alert('Search for: "' + value + '"')
    },

    // Methods for site header.
    menuOpenFunc: function (menuOpenState) {
      document.body.style.overflow = menuOpenState ? 'hidden' : ''
    }
  }
}
</script>
