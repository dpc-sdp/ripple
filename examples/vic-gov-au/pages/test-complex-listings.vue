<template>
  <!-- This is just for POC, do not merge this -->
   <rpl-page-layout class="app-main" :sidebar="sidebar">

    <template slot="breadcrumbs" v-if="breadcrumbs">
      <rpl-breadcrumbs :crumbs="breadcrumbs" />
    </template>

    <template slot="aboveContent" >
      <rpl-search-form
        @search="getSearchResults(searchForm.filterForm.model.title || '')"
        class="rpl-site-constrain--on-all"
        v-bind="searchForm"
        :title="title"
        :subtitle="subtitle"
      />
      <rpl-divider />
    </template>
    <transition name="fade">
      <rpl-search-results
        :searchResults="searchResults"
        :pager="searchResults.length === 0 ? undefined : pager"
        :responseSize="searchResults.length === 0 ? 0 : searchOptions.responseSize"
        :count="searchResults.length === 0 ? 0 : count"
        :errorMsg="errorMsg"
        :noResultsMsg="noResultsCopy"
        :perPage="20"
        @pager-change="changed"
        v-if="!loading"
      >
        <template v-slot:results="resultsProps">
          <rpl-col cols="full">
            <rpl-search-results-table v-if="columns" ref="search-results-table" :items="resultsProps.searchResults" :columnConfig="columns" />
          </rpl-col>
        </template>
      </rpl-search-results>
    </transition>
  </rpl-page-layout>
</template>

<script>
import { RplDivider } from '@dpc-sdp/ripple-global'
import RplBreadcrumbs from '@dpc-sdp/ripple-breadcrumbs'
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import { RplPageLayout } from '@dpc-sdp/ripple-layout'
import { breadcrumbs as getBreadcrumbs } from '@dpc-sdp/ripple-nuxt-tide/lib/core/breadcrumbs'
import moment from 'moment'

import { RplSearchForm, RplSearchResultsV2 as RplSearchResults, RplSearchResultsTable } from '@dpc-sdp/ripple-search'
import { searchMixin, getSearch } from '@dpc-sdp/ripple-nuxt-tide/modules/search'
import get from 'lodash.get'
export default {
  name: 'RecommendationTest',
  components: {
    RplDivider,
    RplBreadcrumbs,
    RplSearchForm,
    RplSearchResults,
    RplSearchResultsTable,
    // Layout.
    RplPageLayout,
    RplRow,
    RplCol
  },
  head () {
    return {
      title: 'Recommendation'
    }
  },
  mixins: [searchMixin],
  async asyncData ({ app, route, store }) {
    const tideSearch = getSearch(app)
    const fieldProfileCategoryValues = await tideSearch.setFilterOptions({
      fieldName: 'field_vada_category_name'
    })
    const statuses = await app.$axios
      .$post(
        `https://a83890f7a31dea14e1ae83c6f0afacca.elastic.sdp.vic.gov.au/elasticsearch_index_drupal_node/_search`,
        {
          size: 0,
          aggs: {
            field_vada_category_name: {
              terms: {
                field: 'field_vada_category_name',
                order: {
                  _key: 'asc'
                }
              }
            }
          }
        },
        {
          baseURL: '',
          auth: app.$tideSearchOptions.auth
        }
      )
      .then(res => {
        const buckets = res.aggregations.field_vada_category_name.buckets
        if (buckets && Array.isArray(buckets)) {
          return buckets.reduce(
            (acc, { key, doc_count }) => ({ ...acc, [key]: doc_count }), // eslint-disable-line camelcase
            {}
          )
        }
      })
    return {
      sidebar: false,
      breadcrumbs: getBreadcrumbs(route.path, 'test', null),
      searchComponent: 'RplCardProfile',
      statuses,
      searchForm: {
        searchPlaceholder: 'Start typing...',
        theme: 'light',
        textSearch: false,
        expandFilters: true,
        allowBlank: true,
        filterForm: {
          tag: 'rpl-fieldset',
          model: {
            title: '',
            field_vada_category_name: []
          },
          schema: {
            groups: [
              {
                legend: '',
                fields: [
                  {
                    type: 'input',
                    inputType: 'text',
                    maxlength: 50,
                    styleClasses: ['form-group--col-two'],
                    label: 'Keyword',
                    model: 'title',
                    placeholder: 'Start typing...',
                    filter: {
                      type: 'term'
                    }
                  },
                  {
                    type: 'rplchecklist',
                    label: 'Category',
                    model: 'field_vada_category_name',
                    styleClasses: ['form-group--col-two'],
                    values: fieldProfileCategoryValues,
                    placeholder: 'Select a category',
                    filter: {
                      type: 'term',
                      operator: ''
                    }
                  }
                ]
              },
              {
                fields: [
                  {
                    type: 'rplsubmitloader',
                    buttonText: 'Apply search filters',
                    loading: false,
                    autoUpdate: true,
                    styleClasses: ['form-group--inline']
                  },
                  {
                    type: 'rplclearform',
                    buttonText: 'Clear search filters',
                    styleClasses: ['form-group--inline']
                  }
                ]
              }
            ]
          },
          formOptions: {
            validateAfterLoad: false,
            validateAfterChanged: false
          },
          formState: {}
        }
      },
      searchOptions: {
        currentSiteOnly: true,
        defaultHits: false,
        responseSize: 20,
        qFields: ['title'],
        sFields: [
          'title',
          'url',
          'field_vada_category_name',
          'field_node_primary_site'
        ]
      },
      sort: { field: 'title.keyword', order: 'asc' },
      docType: 'vada_profile'
    }
  },
  data () {
    return {
      columns: [
        {
          label: 'Number',
          cols: '1',
          key: 'number'
        },
        {
          label: 'Title',
          component: () => import(/* webpackChunkName: 'rpl-text-link' */ '@dpc-sdp/ripple-link').then(m => m.RplTextLink),
          cols: '6',
          push: '2',
          key: 'title'
        },
        {
          label: 'Category',
          cols: '2',
          key: 'category'
        },
        {
          label: 'Status',
          cols: '2',
          key: 'status'
        }
      ]
    }
  },
  methods: {
    getComputedFilters () {
      // Remove title from filter terms as it is being sent as the search query
      const filters = this.tideSearch.getFiltersValues(this.searchForm.filterForm)
      if (filters.title) {
        delete filters.title
      }
      return filters
    },
    mapSearchResults (source) {
      const title = get(source, ['title', 0], '')
      return {
        number: '001',
        title: {
          text: title,
          url: 'www.google.com'
        },
        category: source.field_vada_category_name[0],
        status: 'In progress'
      }
    }
  },
  computed: {
    title () {
      return `The ${this.count} Recommendations`
    },
    subtitle () {
      return `We are committed to implementing all Royal Commission recommendations. As at ${moment().format('DD MMMM YYYY')} we have implemented ${this.statuses.Advocate} recommendations.`
    }
  }
}
</script>

<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
