<template>
  <rpl-page-layout class="app-main" :sidebar="sidebar">

    <template slot="breadcrumbs" v-if="breadcrumbs">
      <rpl-breadcrumbs :crumbs="breadcrumbs" />
    </template>

    <template slot="aboveContent" >
      <rpl-search-form
        @search="getSearchResults"
        class="rpl-site-constrain--on-all"
        v-bind="searchForm"
      />
      <rpl-divider />
    </template>

    <rpl-search-results
      v-if="!loading"
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
import RplBreadcrumbs from '@dpc-sdp/ripple-breadcrumbs'
import { RplSearchForm, RplSearchResults } from '@dpc-sdp/ripple-search'

// Layout.
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import { RplPageLayout } from '@dpc-sdp/ripple-layout'
import { breadcrumbs as getBreadcrumbs } from '@dpc-sdp/ripple-nuxt-tide/lib/core/breadcrumbs'
import formData from './../lib/formdata.js'
import utils from './../lib/utils.js'
import { searchMixin } from '@dpc-sdp/ripple-nuxt-tide/modules/search'

export default {
  name: 'GrantSearch',
  components: {
    RplDivider,
    RplBreadcrumbs,
    RplSearchForm,
    RplSearchResults,

    // Layout.
    RplPageLayout,
    RplRow,
    RplCol
  },
  mixins: [searchMixin],
  async asyncData ({ app, route }) {
    const searchForm = await formData.getFormData(app.$tideSearch.setFilterOptions)
    return {
      sidebar: false,
      breadcrumbs: getBreadcrumbs(route.path, searchForm.title, null),
      searchComponent: 'RplGrantsListItem',
      searchForm,
      searchOptions: {
        currentSiteOnly: true,
        defaultHits: false,
        responseSize: 10,
        qFields: ['body', 'field_landing_page_summary', 'title'],
        sFields: [
          'field_audience_name',
          'field_node_dates_end_value',
          'field_node_dates_start_value',
          'field_landing_page_summary',
          'field_node_primary_site',
          'field_topic_name',
          'funding_level_from',
          'funding_level_to',
          'field_node_link',
          'title',
          'url'
        ],
        filterFromURI: [
          'field_node_on_going',
          'field_node_dates_end_value',
          'field_node_dates_start_value',
          'funding_level'
        ]
      },
      sort: {field: 'title.keyword', order: 'asc'},
      docType: 'grant',
      type: 'grant'
    }
  },
  methods: {
    getComputedFilters () {
      const _filters = this.$tideSearch.getFiltersValues(this.searchForm.filterForm)
      return utils.getGrantsFilters(_filters)
    },
    mapSearchResults (source) {
      let mapTags = []
      const externalLink = (source.field_node_link && source.field_node_link.length > 0) ? source.field_node_link[0] : null
      return {
        title: source.title ? source.title[0] : '',
        link: externalLink ? { url: externalLink } : this.getLink(source.url, this.$store.state.tide.siteData.drupal_internal__tid, source.field_node_primary_site, this.$store.state.tideSite.sitesDomainMap),
        audience: source.field_audience_name ? utils.formatAudiences(source.field_audience_name) : '',
        startdate: source.field_node_dates_start_value ? source.field_node_dates_start_value[0] : '',
        enddate: source.field_node_dates_end_value ? source.field_node_dates_end_value[0] : '',
        description: source.field_landing_page_summary ? source.field_landing_page_summary[0] : '',
        funding: {
          from: source.funding_level_from ? source.funding_level_from[0] : '',
          to: source.funding_level_to ? source.funding_level_to[0] : ''
        },
        tags: mapTags
      }
    }
  }
}
</script>
