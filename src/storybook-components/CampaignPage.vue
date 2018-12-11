<template>
  <rpl-base-layout class="campaign-page-demo">

    <template slot="header">
      <rpl-site-header
        :logo="mock.header.logo"
        :links="mock.header.links"
        :breakpoint="mock.header.breakpoint"
        :searchTerms="mock.header.searchTerms"
        showSearch
        sticky
        @open="menuOpenFunc"
        @search="searchFunc"
      />
    </template>

    <rpl-page-layout
      :sidebar="sidebar"
      class="main rpl-container"
      :heroBackgroundImage="mock.campaign.heroBackgroundImage"
    >
      <template slot="breadcrumbs">
        <rpl-breadcrumbs :crumbs="mock.breadcrumbs.crumbs" />
      </template>

      <template slot="aboveContent">
        <rpl-hero-banner-cta
          :title="mock.heroBanner.title"
          :introText="mock.heroBanner.introText"
          :theme="mock.campaign.heroBackgroundImage ? 'dark' : 'light'"
          :linkPrimary="mock.heroBannerCta.linkPrimary"
          :ctaText="mock.heroBannerCta.ctaText"
          :linkSecondary="mock.heroBannerCta.linkSecondary"
          class="rpl-site-constrain--on-all"
        />
      </template>

      <rpl-row row-gutter class="demo-main">
      </rpl-row>

      <template slot="sidebar">
        <rpl-related-links :title="mock.relatedLinks.title" :links="mock.relatedLinks.links" class="rpl-component-gutter"/>
      </template>
    </rpl-page-layout>

    <template slot="footer">
      <rpl-site-footer
        :nav="mock.footer.nav"
        :links="mock.footer.links"
        :copyright="mock.footer.copyright"
        :acknowledgement="mock.footer.acknowledgement"
        />
    </template>

  </rpl-base-layout>

</template>

<script>
// This is a page for demo all components in the site layout.
// Change story knob `sidebar` can switch layout between with sidebar and without sidebar.

import { RplBaseLayout, RplPageLayout } from '@dpc-sdp/ripple-layout'
import { RplContainer, RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import RplSiteFooter from '@dpc-sdp/ripple-site-footer'
import RplSiteHeader from '@dpc-sdp/ripple-site-header'

// Breadcrumb
import RplBreadcrumbs from '@dpc-sdp/ripple-breadcrumbs'

// Banner
import { RplHeroBannerCta } from '@dpc-sdp/ripple-hero-banner'

// Sidebar
import RplRelatedLinks from '@dpc-sdp/ripple-related-links'

export default {
  name: 'SCampaignPage',
  components: {
    // Layout
    RplBaseLayout,
    RplPageLayout,
    RplContainer,
    RplRow,
    RplCol,
    RplSiteHeader,
    RplSiteFooter,

    // Breadcrumbs
    RplBreadcrumbs,

    // Banner
    RplHeroBannerCta,

    // Sidebar
    RplRelatedLinks
  },
  props: {
    sidebar: Boolean,
    mock: Object
  },
  data () {
    return {
      defaultCols: {}
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
