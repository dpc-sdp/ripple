<template>
  <rpl-base-layout class="demo">

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
      class="main"
      :backgroundGraphic="showTopGraphic ? mock.landingPage.backgroundGraphic : null"
      :quickExit="showQuickExit"
    >
      <template slot="breadcrumbs">
        <rpl-breadcrumbs v-if="showBreadcrumbs" :crumbs="mock.breadcrumbs.crumbs" />
      </template>

      <template slot="aboveContent">
        <rpl-hero-banner
          title="This is a display copy on home page that can wrap two lines"
          introText="This is supplementary intro text that can also wrap over a couple of lines."
          :links="[
            { text: 'This is a large journey based link', url: '#' },
            { text: 'This is a second journey based link', url: '#' },
            { text: 'This is a third link', url: '#' },
            { text: 'This is the fourth and final link', url: '#' }
          ]"
          :showLinks="true"
          :backgroundGraphic="showBottomGraphic ? mock.heroBanner.backgroundGraphic : null"
          :logo="showHeroLogo ? mock.heroBanner.logo : null"
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
// This is a page for demo the hero banner graphics for the landing page component.
// Change story knob `sidebar` can switch layout between with sidebar and without sidebar.

import { RplBaseLayout, RplPageLayout } from '@dpc-sdp/ripple-layout'
import { RplContainer, RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import RplSiteFooter from '@dpc-sdp/ripple-site-footer'
import RplSiteHeader from '@dpc-sdp/ripple-site-header'

// Breadcrumb
import RplBreadcrumbs from '@dpc-sdp/ripple-breadcrumbs'

// Banner
import RplHeroBanner from '@dpc-sdp/ripple-hero-banner'

// Sidebar
import RplRelatedLinks from '@dpc-sdp/ripple-related-links'

export default {
  name: 'SPageHeroGraphics',
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
    RplHeroBanner,

    // Sidebar
    RplRelatedLinks
  },
  props: {
    sidebar: Boolean,
    showHeroLogo: Boolean,
    showTopGraphic: Boolean,
    showBottomGraphic: Boolean,
    showBreadcrumbs: Boolean,
    showQuickExit: Boolean,
    mock: Object
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
