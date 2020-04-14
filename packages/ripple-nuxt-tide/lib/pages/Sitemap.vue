<template>
  <rpl-page-layout class="app-main" :sidebar="true">
    <template slot="breadcrumbs">
      <rpl-breadcrumbs :crumbs="breadcrumbs" />
    </template>

    <rpl-row row-gutter>
      <rpl-col cols="full">
        <rpl-sitemap :menu="menu" />
      </rpl-col>
    </rpl-row>
  </rpl-page-layout>
</template>

<script>
import { breadcrumbs } from '@dpc-sdp/ripple-nuxt-tide/lib/core/breadcrumbs'

// Layout.
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import { RplPageLayout } from '@dpc-sdp/ripple-layout'
import RplSitemap from '@dpc-sdp/ripple-sitemap'
import RplBreadcrumbs from '@dpc-sdp/ripple-breadcrumbs'

export default {
  name: 'AppSitemap',
  components: {
    // Layout.
    RplPageLayout,
    RplRow,
    RplCol,

    RplBreadcrumbs,
    RplSitemap
  },
  data () {
    return {
      pageTitle: 'Site map',
      menu: this.$store.state.tide.siteData.hierarchicalMenus.menuMain
    }
  },
  head (tidePage) {
    return {
      title: 'Site map'
    }
  },
  computed: {
    breadcrumbs () {
      return breadcrumbs(this.$route.path, this.pageTitle, this.menu)
    }
  }
}
</script>
