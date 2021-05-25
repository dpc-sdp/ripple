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
import moment from 'moment'

import { RplDivider } from '@dpc-sdp/ripple-global'
import { RplSearchForm, RplSearchResults } from '@dpc-sdp/ripple-search'

// Layout.
import { RplPageLayout } from '@dpc-sdp/ripple-layout'
import formData from './formdata.js'
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
      if (filterValues.field_event_date_end_value) {
        const setFilterDate = moment(filterValues.field_event_date_end_value.values)
        filterValues.field_event_date_end_value.values = setFilterDate.startOf('day').toISOString()
        filterValues['field_event_date_start_value'] = {
          operator: 'lte',
          type: 'date',
          values: setFilterDate.endOf('day').toISOString()
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
