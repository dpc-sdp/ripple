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
      class="main"
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
            :searchResults="subsetResults"
            :pager="pagerOptions"
            :responseSize="noResults ? 0 : mock.searchResults.responseSize"
            :count="noResults ? 0 : totalResultCount"
            :errorMsg="hasError ? mock.searchResults.errorMsg : undefined"
            :noResultsMsg="mock.searchResults.noResultsMsg"
            @pager-change="pagerChange"
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
      defaultCols: {},
      searchFor: this.mock.searchForm.prefillSearchTerm,
      totalResultCount: this.mock.searchResults.count,
      offset: 0
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
      const split = value.split(' x')
      if (split.length !== 2) {
        this.searchFor = value
      } else {
        this.searchFor = split[0]
        this.totalResultCount = parseInt(split[1], 10)
      }
      this.offset = 0
    },

    // Methods for search results
    pagerChange: function (newStep) {
      // Use your own custom code to handle it.
      this.offset = (newStep - 1) * this.mock.searchResults.responseSize
    }
  },
  computed: {
    pagerOptions () {
      const count = this.totalResultCount
      const show = this.mock.searchResults.responseSize
      return {
        totalSteps: (count > show) ? (count / show) : 0,
        initialStep: 1,
        stepsAround: 2
      }
    },
    subsetResults () {
      let returnedResults = []
      let step = 0
      const totalSteps = this.mock.searchResults.responseSize
      const start = this.offset
      while (step < totalSteps) {
        if (this.totalResults[start + step]) {
          returnedResults.push(this.totalResults[start + step])
          step++
        } else {
          break
        }
      }
      return returnedResults
    },
    totalResults () {
      if (this.totalResultCount === 0) {
        return []
      } else {
        let returnedResults = []
        const searchResultJSON = JSON.stringify(this.mock.searchResult)
        for (let i = 0; i < this.totalResultCount; i++) {
          let newResult = JSON.parse(searchResultJSON)
          newResult.title = `${this.searchFor} result ${i + 1}`
          returnedResults.push(newResult)
        }
        return returnedResults
      }
    }
  }
}
</script>
