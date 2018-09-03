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
        <rpl-divider />
      </template>

      <rpl-row row-gutter class="demo-main">
        <rpl-col cols="full" :colsBp="defaultCols">
          <rpl-search-results
            :searchResults="noResults ? [] : [mock.searchResult, mock.searchResult]"
            :pager="noResults ? undefined : mock.pagination"
            :pagerChangeHandler="pagerChange"
            :responseSize="noResults ? 0 : mock.searchResults.responseSize"
            :count="noResults ? 0 : mock.searchResults.count"
            :errorMsg="hasError ? mock.searchResults.errorMsg : undefined"
            :noResultsMsg="mock.searchResults.noResultsMsg"
          />
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

import { RplDivider } from '@dpc-sdp/ripple-global'
import { RplBaseLayout, RplPageLayout } from '@dpc-sdp/ripple-layout'
import { RplContainer, RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import RplSiteFooter from '@dpc-sdp/ripple-site-footer'
import RplSiteHeader from '@dpc-sdp/ripple-site-header'

// Search
import { RplSearchForm, RplSearchResults } from '@dpc-sdp/ripple-search'

export default {
  name: 'SSearchPage',
  components: {
    RplDivider,

    // Layout
    RplBaseLayout,
    RplPageLayout,
    RplContainer,
    RplRow,
    RplCol,
    RplSiteHeader,
    RplSiteFooter,

    // Search
    RplSearchForm,
    RplSearchResults
  },
  props: {
    sidebar: Boolean,
    mock: Object,
    hasError: Boolean,
    noResults: Boolean
  },
  data () {
    return {
      defaultCols: {}
    }
  },
  methods: {
    // Methods for site header.
    searchFunc: function (value) {
      // Use your own custom code to handle it.
      alert('Search for: "' + value + '"')
    },

    // Methods for site header.
    menuOpenFunc: function (menuOpenState) {
      document.body.style.overflow = menuOpenState ? 'hidden' : ''
    },

    // Methods for search results
    getSearchResults: function (value) {
      // Use your own custom code to handle it.
      alert('Search for: "' + value + '"')
    },

    // Methods for search results
    pagerChange: function (newStep) {
      // Use your own custom code to handle it.
      alert('Going to step: ' + newStep)
    }
  }
}
</script>
