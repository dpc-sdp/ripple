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

    <rpl-page-layout class="main rpl-container" :sidebar="true">
      <template slot="aboveContent">
        <rpl-breadcrumbs :crumbs="mock.breadcrumbs.crumbs" />
      </template>

      <rpl-row row-gutter class="demo-main">
        <rpl-col cols="full">
          <rpl-sitemap :menu="mock.header.links" />
        </rpl-col>
      </rpl-row>

    </rpl-page-layout>

    <template slot="footer">
      <rpl-site-footer v-bind="mock.footer" />
    </template>

  </rpl-base-layout>

</template>

<script>
// This is a page for demo the hero banner graphics for the landing page component.

import { RplBaseLayout, RplPageLayout } from '@dpc-sdp/ripple-layout'
import { RplContainer, RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import RplSiteFooter from '@dpc-sdp/ripple-site-footer'
import RplSiteHeader from '@dpc-sdp/ripple-site-header'

// Sitemap
import RplSitemap from '@dpc-sdp/ripple-sitemap'

// Breadcrumbs
import RplBreadcrumbs from '@dpc-sdp/ripple-breadcrumbs'

export default {
  name: 'SPageSitemap',
  components: {
    // Layout
    RplBaseLayout,
    RplPageLayout,
    RplContainer,
    RplRow,
    RplCol,
    RplSiteHeader,
    RplSiteFooter,

    // Sitemap
    RplSitemap,

    // Breadcrumbs
    RplBreadcrumbs
  },
  props: {
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
