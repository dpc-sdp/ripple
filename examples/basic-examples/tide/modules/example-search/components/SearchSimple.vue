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

    <rpl-search-results
      :searchResults="searchResults"
      :pager="searchResults.length === 0 ? undefined : pager"
      :responseSize="searchResults.length === 0 ? 0 : searchOptions.responseSize"
      :count="searchResults.length === 0 ? 0 : count"
      :errorMsg="errorMsg"
      :noResultsMsg="noResultsCopy"
      :childColsBp="sidebar ? cardColBp.narrow : cardColBp.wide"
      @pager-change="changed"
      :type="searchComponent"
    />
  </rpl-page-layout>
</template>

<script>

import { RplDivider } from '@dpc-sdp/ripple-global'
import { RplSearchForm, RplSearchResults } from '@dpc-sdp/ripple-search'

// Layout.
import { RplPageLayout } from '@dpc-sdp/ripple-layout'
import formData from './formdata-simple.js'
import { searchMixin, getSearch } from '@dpc-sdp/ripple-nuxt-tide/modules/search'

export default {
  name: 'ExampleSearchSimple',
  components: {
    RplDivider,
    RplSearchForm,
    RplSearchResults,

    // Layout.
    RplPageLayout
  },
  mixins: [searchMixin],
  async asyncData ({ app, route }) {
    const tideSearch = getSearch(app)
    const searchForm = await formData.getFormData(tideSearch.setFilterOptions)
    return {
      sidebar: false,
      searchComponent: 'default',
      searchForm,
      searchOptions: {
        currentSiteOnly: true,
        defaultHits: false,
        responseSize: 10,
        qFields: [
          'body',
          'title'
        ],
        sFields: [
          'changed',
          'created',
          'field_landing_page_summary',
          'field_node_primary_site',
          'title',
          'type',
          'url'
        ]
      },
      sort: { field: 'field_event_date_end_value', order: 'asc' },
      docType: 'event',
      type: 'events'
    }
  },
  methods: {
    validDate: (date) => {
      return typeof date === 'string'
    },
    mapSearchResults (source) {
      const site = this.$store.state.tide.siteData.drupal_internal__tid
      let date = source.changed ? source.changed[0] : source.created[0]
      return {
        title: source.title ? source.title[0] : '',
        link: source.url && this.getLink(source.url, site, source.field_node_primary_site, this.$store.state.tideSite.sitesDomainMap, { text: 'linkText', url: 'linkUrl' }, 'See event details'),
        date: this.validDate(date) ? date : '',
        description: typeof source.field_landing_page_summary !== 'undefined' ? this.truncateText(source.field_landing_page_summary[0]) : this.truncateText(source.body[0]),
        tags: []
      }
    }
  }
}
</script>
