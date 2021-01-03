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
import formData from './../formdata.js'
import { searchMixin, getSearch } from '@dpc-sdp/ripple-nuxt-tide/modules/search'

// Setting Australia/Melbourne timezone
import moment from 'moment-timezone'

export default {
  name: 'EventSearch',
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
    const tideSearch = getSearch(app)
    const searchForm = await formData.getFormData(tideSearch.setFilterOptions)
    return {
      sidebar: false,
      breadcrumbs: getBreadcrumbs(route.path, searchForm.title, null),
      searchComponent: 'RplCardEvent',
      searchForm,
      searchOptions: {
        currentSiteOnly: true,
        defaultHits: false,
        responseSize: 9,
        qFields: [
          'body',
          'field_event_details_event_locality',
          'field_landing_page_summary',
          'field_paragraph_body',
          'field_paragraph_summary',
          'title'
        ],
        sFields: [
          'field_event_category_name',
          'field_event_date_end_value',
          'field_event_date_start_value',
          'field_event_details_event_locality',
          'field_event_details_event_requirements_name',
          'field_landing_page_summary',
          'field_media_image_absolute_path',
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
    getComputedFilters () {
      let filterValues = this.tideSearch.getFiltersValues(this.searchForm.filterForm)
      // Test date filter based on start / end fields.
      if (filterValues.field_event_date_start_value) {
        const setFilterDate = moment(filterValues.field_event_date_start_value.values)
        filterValues.field_event_date_start_value.values = setFilterDate.startOf('day').toISOString()
      }

      if (filterValues.field_event_date_end_value) {
        const setFilterDate = moment(filterValues.field_event_date_end_value.values)
        filterValues.field_event_date_end_value.values = setFilterDate.startOf('day').toISOString()
      } else {
        const vic = moment.tz.setDefault('Australia/Melbourne')
        const today = vic().startOf('day').toISOString()
        filterValues['field_event_date_end_value'] = {
          operator: 'gte',
          type: 'date',
          values: today
        }
      }
      return filterValues
    },
    mapSearchResults (source) {
      let pSite = ''
      if (source.field_node_primary_site) {
        pSite = source.field_node_primary_site[0]
      }
      return {
        title: source.title ? source.title[0] : '',
        dateStart: source.field_event_date_start_value ? source.field_event_date_start_value[0] : '',
        dateEnd: source.field_event_date_end_value ? source.field_event_date_end_value[0] : '',
        location: source.field_event_details_event_locality ? source.field_event_details_event_locality[0] : '',
        summary: typeof source.field_landing_page_summary !== 'undefined' ? this.truncateText(source.field_landing_page_summary[0]) : this.truncateText(source.body[0]),
        image: source.field_media_image_absolute_path ? source.field_media_image_absolute_path[0] : '',
        link: source.url && this.getLink(source.url, this.$store.state.tide.siteData.drupal_internal__tid, pSite, this.$store.state.tideSite.sitesDomainMap, { text: 'text', url: 'url' }, 'See event details')
      }
    }
  }
}
</script>
