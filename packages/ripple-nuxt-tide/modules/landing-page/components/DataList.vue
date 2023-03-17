<template>
  <div :class="{'rpl-data-list': true, 'rpl-data-list--filtered': filtering}">
    <rpl-form
      v-if="searchForm"
      :formData="searchForm"
      :submitFormOnClear="true"
      :submitHandler="onSearchSubmit"
      :fieldChangeHandler="onFieldUpdate"
      class="rpl-data-list__form"
    />
    <rpl-tabs
      v-if="$scopedSlots.map"
      :tabs="tabs"
      :activeTab="activeTab"
      @rpl-tab-switch="updateTab"
      class="rpl-data-list__tabs"
    />
    <keep-alive>
      <slot name="map" :mapData="mapData" v-if="$scopedSlots.map && activeTab === 'map'" />
      <slot name="table" :tableData="tableData" v-if="activeTab === 'list'">
        <rpl-search-results-loading v-if="loading" />
        <rpl-search-results-layout
          v-else
          ref="search-results"
          :searchResults="tableData.results"
          :count="tableData.total"
          :pager="{ totalSteps: pageCount,  initialStep: currentPage, stepsAround: 2 }"
          @pager-change="onPageUpdate"
          class="rpl-data-list__results">
          <template #noresults>
            <div class="rpl-data-list__no-results">
              <slot name="noresults">
                <h3>No results found that match your search criteria.</h3>
                <p>Please clear your search filters and try again.</p>
              </slot>
            </div>
          </template>
          <template #count v-if="tableData.total > 0">
            <slot name="count" :total="tableData.total" :range="range">
              <p>{{`Displaying ${range} of ${total} results`}}</p>
            </slot>
          </template>
          <template #sort v-if="sortOptions.length && tableData.total > 0">
            <label class="rpl-data-list__sort">
              <span class="rpl-form-label">Sort by:</span>
              <rpl-select
                ref="sort-select"
                class="rpl-data-list__sort-select"
                :values="sortOptions"
                :state="sort"
                @rpl-select-update="onSortUpdate"
              />
            </label>
          </template>
          <template #results>
            <rpl-complex-data-table
              ref="search-results-table"
              class="rpl-data-list__results-table"
              :items="tableData.results"
              :columns="columnHeadings"
              :rowHeaders="true"
              :zebraStripes="zebraStripes"
            >
              <template v-slot:hiddenContentCell="{ coldata }" >
                <slot name="hiddenContentCell" :data="coldata">
                  <rpl-description-list v-if="coldata.list" :list="coldata.list" />
                  <rpl-markup v-else :html="coldata" />
                </slot>
              </template>
            </rpl-complex-data-table>
          </template>
        </rpl-search-results-layout>
      </slot>
    </keep-alive>
  </div>
</template>

<script>
import { RplSearchResultsLayout } from '@dpc-sdp/ripple-search'
import { RplComplexDataTable, RplSearchResultsLoading } from '@dpc-sdp/ripple-data-table'
import { RplForm } from '@dpc-sdp/ripple-form'
import RplSelect from '@dpc-sdp/ripple-form/Select'
import RplTabs from '@dpc-sdp/ripple-tabs'
import RplMarkup from '@dpc-sdp/ripple-markup'
import RplDescriptionList from '@dpc-sdp/ripple-description-list'
import { getResultsFromMiddleware } from '@dpc-sdp/ripple-data-vic-api/src/middleware'
import { getQueryParams } from '../lib/data-list'

export default {
  name: 'RplDataList',
  components: {
    RplForm,
    RplSelect,
    RplTabs,
    RplSearchResultsLayout,
    RplSearchResultsLoading,
    RplComplexDataTable,
    RplDescriptionList,
    RplMarkup
  },
  async fetch () {
    await this.fetchData()
  },
  props: {
    initialData: Object,
    dataSet: {
      type: String,
      required: true
    },
    searchForm: {
      type: Object,
      required: true
    },
    searchField: String,
    queryFields: Array,
    aggregationFields: Array,
    sortOptions: {
      type: Array,
      default: () => []
    },
    columnHeadings: {
      type: Array,
      default: () => []
    },
    zebraStripes: {
      type: [String, Boolean],
      default: 'even'
    },
    perPage: {
      type: Number,
      default: 10
    },
    submitOnFormUpdate: {
      type: Boolean,
      default: false
    },
    scrollToResults: {
      type: Boolean,
      default: true
    },
    tableResultsMiddleware: Array,
    mapResultsMiddleware: Array
  },
  data () {
    return {
      debounce: null,
      filtering: false,
      results: [],
      tableData: {},
      mapData: {},
      currentPage: 1,
      activeTab: 'list',
      loading: true,
      total: 0,
      sort: null,
      aggs: null,
      tabs: [
        {
          label: 'List view',
          key: 'list',
          icon: 'list'
        },
        {
          label: 'Map view',
          key: 'map',
          icon: 'map_marker'
        }
      ]
    }
  },
  created () {
    if (this.sortOptions?.[0]?.id) {
      this.sort = this.sortOptions[0].id
    }

    if (this.initialData) {
      this.total = this.initialData.total
      this.results = this.initialData.results
    }
  },
  methods: {
    async fetchData () {
      const params = getQueryParams({
        perPage: this.perPage,
        currentPage: this.currentPage,
        sort: this.sort,
        sortOptions: this.sortOptions,
        model: this.searchForm.model,
        searchField: this.searchField,
        queryFields: this.queryFields,
        aggregationFields: !this.aggs ? this.aggregationFields : null
      })

      this.loading = true
      this.filtering = params?.q || params?.filters

      try {
        const data = await this.$tideSearchApi.search('/data-list', params, this.dataSet)

        if (data && Array.isArray(data.results)) {
          this.total = data.total
          this.results = data.results

          if (data?.aggregations && !this.aggs) {
            this.updateAggregations(data.aggregations)
          }
        }
        this.$emit('fetch-success')
      } catch (error) {
        this.total = 0
        this.results = []
        this.$emit('fetch-error', error)
      }

      this.updateTableData(params)

      if (this.$scopedSlots.map) {
        this.updateMapData(params)
      }

      this.loading = false
    },
    debouncedFetch () {
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => this.fetchData(), 500)
    },
    updateTab (tab) {
      this.activeTab = tab
      this.$emit('tab-update', tab)
    },
    updateMapData (params) {
      let mapData = { results: this.results }

      if (this.mapResultsMiddleware && this.mapResultsMiddleware.length) {
        this.mapData = getResultsFromMiddleware(this.mapResultsMiddleware, {
          params,
          results: this.results
        })
      }

      this.mapData = mapData
    },
    updateTableData (params) {
      let tableData = { results: this.results, total: this.total }

      if (this.tableResultsMiddleware && this.tableResultsMiddleware.length) {
        tableData = getResultsFromMiddleware(this.tableResultsMiddleware, {
          params,
          results: this.results,
          total: this.total
        })
      }

      this.tableData = tableData
    },
    updateAggregations (aggregations) {
      this.aggs = Object.keys(aggregations).map(field => {
        const values = aggregations[field].buckets.map(({ key }) => key).filter(Boolean)

        if (values) {
          this.updateFormValues(field, values)
        }

        return { field, values }
      })
    },
    updateFormValues (model, values) {
      if (this.searchForm.schema.groups) {
        this.searchForm.schema.groups.forEach(group => {
          this.updateFieldValue(group.fields, model, values)
        })
      }
      if (this.searchForm.schema.fields) {
        this.updateFieldValue(this.searchForm.schema.fields, model, values)
      }
    },
    updateFieldValue (fields, model, values) {
      const matchedField = fields.find(f => f.model === model)

      if (matchedField) {
        const updatedValues = values.map(value => ({
          id: value,
          name: value
        }))

        if (matchedField?.values) {
          matchedField.values.push(...updatedValues)
        } else {
          matchedField.value = updatedValues
        }
      }
    },
    onSortUpdate (value) {
      this.sort = value
      this.currentPage = 1

      if (this.$refs['sort-select'] && this.$refs['sort-select'].hasOwnProperty('close')) {
        this.$refs['sort-select'].close()
      }

      this.fetchData()
      this.resetHiddenRows()
      this.$emit('sort-update', value)
    },
    onPageUpdate (page) {
      this.currentPage = page

      this.fetchData()
      this.resetHiddenRows()
      this.$emit('page-update', page)
    },
    onFieldUpdate (value, model) {
      if (!this.submitOnFormUpdate) return

      if (model === this.searchForm.searchField) {
        this.debouncedFetch()
      } else {
        this.fetchData()
      }

      this.$emit('field-update', value, model)
    },
    onSearchSubmit () {
      this.currentPage = 1

      this.fetchData()
      this.resetHiddenRows()
      this.$emit('form-submit', this.searchForm.model)
    },
    resetHiddenRows () {
      if (this.$refs['search-results-table'] && this.$refs['search-results-table'].hasOwnProperty('collapseAllRows')) {
        this.$refs['search-results-table'].collapseAllRows()
      }
    }
  },
  computed: {
    pageCount () {
      return Math.ceil(this.tableData.total / this.perPage)
    },
    range () {
      if (this.tableData.total) {
        const from = this.currentPage < 2 ? 1 : (this.perPage * (this.currentPage - 1)) + 1
        const total = this.perPage * this.currentPage > this.tableData.total ? this.tableData.total : this.perPage * this.currentPage

        return `${from}-${total}`
      }

      return null
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";
@import "~@dpc-sdp/ripple-form/scss/form";

$rpl-data-list-form-background: rpl-color('light_neutral') !default;
$rpl-data-list-form-spacing: $rpl-space-4 !default;
$rpl-data-list-form-radius: $rpl-button-border-radius !default;
$rpl-data-list-form-field-background: rpl-color('white') !default;
$rpl-data-list-sort-width: rem(280px) !default;

.rpl-data-list {
  &:not(.rpl-data-list--filtered) .field-rplclearform {
    display: none;
  }

  .rpl-search-results-layout__header {
    margin-top: $rpl-space-3;
    margin-bottom: $rpl-space-4;
  }

  .rpl-search-results-layout__main {
    margin: 0;
    width: 100%;

    .rpl-text-link {
      text-decoration: underline;
    }
  }

  .rpl-search-results-layout__info p {
    margin: 0;
  }

  &__form {
    padding: $rpl-data-list-form-spacing;
    background-color: $rpl-data-list-form-background;
    border-radius: $rpl-data-list-form-radius;

    fieldset {
      display: flex;
      flex-direction: column;
      gap: $rpl-data-list-form-spacing;

      @include rpl_breakpoint('l') {
        flex-direction: row;
        align-items: flex-end;
      }

      + fieldset {
        margin-top: $rpl-data-list-form-spacing;
      }
    }

    .form-group {
      width: 100%;
      margin-bottom: 0;
    }

    .form-group--center {
      align-items: center;
    }

    .rpl-select__trigger,
    input.rpl-form-input__input:is([type=date], [type=number], [type=search], [type=text]) {
      background-color: $rpl-data-list-form-field-background;
    }

    .rpl-submit-loader {
      @include rpl_breakpoint('l') {
        width: 100%;
      }
    }

    .field-rplsubmitloader {
      max-width: 200px;
    }
  }

  &__tabs {
    margin-top: $rpl-space-4 * 2;
  }

  &__sort {
    display: flex;
    flex-direction: column;

    @include rpl_breakpoint('m') {
      align-items: center;
      flex-direction: row;
    }

    &-select {
      width: 100%;

      @include rpl_breakpoint('m') {
        width: $rpl-data-list-sort-width;
      }
    }

    .rpl-form-label {
      margin-right: $rpl-space-2;
      @include rpl_typography_ruleset(('s', 24px, 'bold'));

      @include rpl_breakpoint_down('m') {
        margin-bottom: $rpl-space-2;
      }
    }
  }

  &__no-results {
    text-align: center;
  }
}
</style>
