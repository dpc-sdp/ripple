<template>
  <rpl-base-layout class="search-page-demo">

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
    >
      <template slot="aboveContent">
        <rpl-search-form
          :title="mock.searchForm.title"
          :searchPlaceholder="mock.searchForm.searchPlaceholder"
          :prefillSearchTerm="mock.searchForm.prefillSearchTerm"
          :filterForm="mock.searchForm.filterForm"
          :theme="mock.searchForm.theme"
          @search="getSearchResults"
          class="rpl-site-constrain--on-all"
        />
      </template>

      <rpl-row row-gutter class="demo-main">
        <rpl-col cols="full" :colsBp="defaultCols">
          <rpl-search-results />
        </rpl-col>
      </rpl-row>

      <template slot="sidebar">
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
// This is a page for demo all components in the site layout.
// Change story knob `sidebar` can switch layout between with sidebar and without sidebar.

import { RplBaseLayout, RplPageLayout } from '@dpc-sdp/ripple-layout'
import { RplContainer, RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import RplSiteFooter from '@dpc-sdp/ripple-site-footer'
import RplSiteHeader from '@dpc-sdp/ripple-site-header'

// Search
import RplPagination from '@dpc-sdp/ripple-pagination'
import { RplSearchForm, RplSearchResults } from '@dpc-sdp/ripple-search'

export default {
  name: 'SSearchPage',
  components: {
    // Layout
    RplBaseLayout,
    RplPageLayout,
    RplContainer,
    RplRow,
    RplCol,
    RplSiteHeader,
    RplSiteFooter,

    // Search
    RplPagination,
    RplSearchForm,
    RplSearchResults
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
