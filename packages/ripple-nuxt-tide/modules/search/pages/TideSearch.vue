<template>
  <rpl-page-layout class="app-main" :sidebar="sidebar">

    <template slot="aboveContent" >
      <rpl-search-form
        @search="getSearchResults"
        class="rpl-site-constrain--on-all"
        v-bind="searchForm"
      />
      <rpl-divider />
    </template>

    <rpl-search-results-layout
      :searchResults="searchResults"
      :pager="searchResults.length === 0 ? undefined : pager"
      :responseSize="searchResults.length === 0 ? 0 : searchOptions.responseSize"
      :count="searchResults.length === 0 ? 0 : count"
      :errorMsg="errorMsg"
      :noResultsMsg="noResultsCopy"
      :pagerColsBp="sidebar ? cardColBp.narrow : cardColBp.wide"
      @pager-change="changed"
      v-if="!loading"
    >
      <template v-slot:results="resultsProps">
        <rpl-col cols="full" v-for="(result, i) in resultsProps.searchResults" :key="i + '-result'">
          <rpl-search-result
            :title="result.title"
            :link="result.link"
            :date="result.date"
            :description="result.description"
            :tags="result.tags"
            :locale="result.locale"
          />
        </rpl-col>
      </template>
    </rpl-search-results-layout>
  </rpl-page-layout>
</template>

<script>

import { RplDivider } from '@dpc-sdp/ripple-global'
import RplBreadcrumbs from '@dpc-sdp/ripple-breadcrumbs'
import { RplSearchForm, RplSearchResultsLayout, RplSearchResultsTable, RplSearchResult } from '@dpc-sdp/ripple-search'

// Layout.
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import { RplPageLayout } from '@dpc-sdp/ripple-layout'
import formData from './../lib/formData.js'
import { searchMixin, getSearch } from './../index'

export default {
  name: 'TideSearch',
  components: {
    RplDivider,
    RplBreadcrumbs,
    RplSearchForm,
    RplSearchResultsLayout,
    RplSearchResultsTable,
    RplSearchResult,
    // Layout.
    RplPageLayout,
    RplRow,
    RplCol
  },
  mixins: [searchMixin],
  async asyncData ({ app, route, store }) {
    const tideSearch = getSearch(app)
    const searchForm = await formData.getFormData(tideSearch.setFilterOptions, 'search')
    return {
      sidebar: true,
      searchComponent: 'default',
      sort: null,
      docType: 'all',
      searchForm,
      searchOptions: {
        currentSiteOnly: true,
        defaultHits: false,
        responseSize: 10,
        qFields: [
          'body',
          'field_landing_page_summary',
          'field_page_intro_text',
          'field_paragraph_body',
          'field_paragraph_summary',
          'summary_processed',
          'title'
        ],
        sFields: [
          'changed',
          'created',
          'field_landing_page_summary',
          'field_node_primary_site',
          'field_page_intro_text',
          'field_tags_name',
          'field_topic_name',
          'summary_processed',
          'title',
          'type',
          'url'
        ],
        exclude: {
          'type': 'grant',
          'field': 'field_node_link'
        }
      }
    }
  },
  methods: {
    validDate: (date) => {
      return typeof date === 'string'
    },
    getDescription: (source) => {
      const type = source.type[0]
      let summary = null
      if (type === 'news' || type === 'page') {
        summary = typeof source.summary_processed !== 'undefined' ? source.summary_processed[0] : (typeof source.field_page_intro_text !== 'undefined' ? source.field_page_intro_text[0] : '')
      } else {
        summary = typeof source.field_landing_page_summary !== 'undefined' ? source.field_landing_page_summary[0] : ''
      }
      return summary
    },
    mapSearchResults (source) {
      const site = this.$store.state.tide.siteData.drupal_internal__tid
      let date = source.changed ? source.changed[0] : source.created[0]
      return {
        title: source.title ? source.title[0] : '',
        link: this.getLink(source.url, site, source.field_node_primary_site, this.$store.state.tideSite.sitesDomainMap, { text: 'linkText', url: 'linkUrl' }),
        date: this.validDate(date) ? date : '',
        description: this.getDescription(source),
        tags: []
      }
    }
  }
}
</script>
