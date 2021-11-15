<template>
<div class="rpl-data-listing">
  <rpl-form v-if="searchForm" :formData="searchForm" class="rpl-data-listing__form" :submitHandler="onSearchSubmit" :submitFormOnClear="true" :scrollToMessage="false"></rpl-form>
  <rpl-tabs class="rpl-data-listing__tabs" v-if="enableMap" :tabs="tabs" :activeTab="activeTab" @rpl-tab-switch="switchTab" />
  <keep-alive>
    <slot name="map" :mapData="mapData" v-if="enableMap && (!hasTabs || activeTab === 'map')">
    </slot>
    <slot name="table" :tableData="tableData" v-if="enableTable && (!hasTabs || activeTab === 'list')">
      <rpl-search-results-loading v-if="loading" />
      <rpl-search-results-layout v-else ref="searchresults" class="rpl-data-listing__results" key="vaccination-locations" :searchResults="tableData.results" :count="parseInt(tableData.total)">
        <template slot="noresults">
          <div class="rpl-data-listing__no-results">
            <slot name="noresults">
              <h3>No results found that match your search criteria. </h3>
              <p>Please clear your search filters and try again.</p>
            </slot>
          </div>
        </template>
        <template slot="count" v-if="total > 0">
          <slot name="count" :total="tableData.total" :range="range">
            <p>{{countMsg(range, tableData.total)}}</p>
          </slot>
        </template>
        <template slot="sort" v-if="sortValues && sortValues.length > 0">
          <div v-if="total > 0" class="rpl-data-listing__sort">
            <label for="ch-sort-select">
              <span class="rpl-form-label">Sort by:</span>
            </label>
            <rpl-select ref="sortselect" id="ch-sort-select" class="rpl-data-listing__sort-select" :values="sortValues" :state="sort" @rpl-select-update="sortUpdate"/>
          </div>
        </template>
        <template v-slot:results="resultsProps">
          <rpl-complex-data-table
            class="rpl-data-listing__results-table"
            ref="search-results-table"
            :items="resultsProps.searchResults"
            :columns="columns"
            :zebraStripes="zebraStripes"
            :rowHeaders="true"
            @expand-row="(rowIdx) => handleEvent('expand-row', tableData.results[rowIdx])"
            >
            <template v-slot:hiddenContentCell="hiddenContentProps" >
              <rpl-description-list-icon v-bind="hiddenContentProps.coldata" />
            </template>
          </rpl-complex-data-table>
        </template>
        <template slot="pagination">
          <rpl-col cols="full" :colsBp="{ l: 4, xxxl: 3 }">
            <rpl-pagination
              ref="pagination"
              v-if="pageCount > 1"
              class="rpl-data-listing__pagination"
              :totalSteps="pageCount"
              :initialStep="page"
              :stepsAround="2"
              @change="onPageChange"
            />
          </rpl-col>
        </template>
      </rpl-search-results-layout>
    </slot>
  </keep-alive>
</div>

</template>

<script>
import { RplSearchResultsLayout } from '@dpc-sdp/ripple-search'
import { RplForm, RplFormEventBus } from '@dpc-sdp/ripple-form'
import { RplContainer, RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import { RplIcon } from '@dpc-sdp/ripple-icon'
import RplSelect from '@dpc-sdp/ripple-form/Select'
import RplPagination from '@dpc-sdp/ripple-pagination'
import RplTabs from './../../components/Molecules/Tabs/Tabs.vue'
import { RplComplexDataTable, RplSearchResultsLoading } from '@dpc-sdp/ripple-data-table'
import RplDescriptionListIcon from '@dpc-sdp/ripple-description-list'
import { getResultsFromMiddleware } from '@dpc-sdp/ripple-data-vic-api/src/middleware'
import VueScrollTo from 'vue-scrollto'

import RplDataListingEventBus from './rpl-data-listing-event-bus.js'

export default {
  components: {
    RplForm,
    RplIcon,
    RplSearchResultsLayout,
    RplComplexDataTable,
    RplSearchResultsLoading,
    RplTabs,
    RplRow,
    RplCol,
    RplSelect,
    RplDescriptionListIcon,
    RplContainer,
    RplPagination
  },
  async fetch () {
    await this.fetchData()
    if (this.setFormValues && typeof this.setFormValues === 'function') {
      await this.setFormValues(this.searchForm)
    }
  },
  props: {
    zebraStripes: {
      type: [String, Boolean],
      default: 'even'
    },
    dataSet: {
      type: String
    },
    perPage: {
      type: Number,
      default: 10
    },
    columns: {
      type: Array,
      default: () => []
    },
    sortOptions: {
      type: Array,
      default: () => []
    },
    searchForm: {
      type: Object
    },
    serverSideFiltering: {
      type: Boolean,
      default: false
    },
    submitOnFormUpdate: {
      type: Boolean,
      default: false
    },
    enableMap: {
      type: Boolean,
      default: false
    },
    enableTable: {
      type: Boolean,
      default: true
    },
    onSearchSubmitHook: {
      type: Function
    },
    setFormValues: {
      type: Function
    },
    tableResultsMiddleware: {
      type: Array
    },
    mapResultsMiddleware: {
      type: Array
    },
    aggregationFields: {
      type: Array
    },
    onModelUpdateHook: {
      type: Function
    },
    countMsg: {
      type: Function,
      default: (range, total) => {
        return `Displaying ${range} of ${total} results`
      }
    }
  },
  provide: function () {
    return {
      setMap: this.setMap
    }
  },
  data () {
    return {
      results: null,
      tableData: [],
      mapData: {},
      mapInstance: {},
      page: 1,
      total: 0,
      activeTab: 'map',
      loading: true,
      aggs: {},
      sort: null,
      sortValues: [],
      appliedFilters: {},
      aggregationsUpdated: false,
      tabs: [
        {
          label: 'Map view',
          key: 'map',
          icon: 'map_pin'
        },
        {
          label: 'List view',
          key: 'list',
          icon: 'list'
        }
      ],
      aggregations: {}
    }
  },
  mounted () {
    this.sortValues = this.sortOptions
    this.sort = this.sortValues && this.sortValues[0] && this.sortValues[0].id
    if (this.submitOnFormUpdate) {
      RplFormEventBus.$on('model-updated', this.onModelUpdate)
    }
    RplFormEventBus.$on('clear-form', this.onClearForm)
  },
  watch: {
    aggs (newVal, oldVal) {
      if (!this.aggregationsUpdated) {
        Object.keys(newVal).forEach(key => {
          this.updateFormValues(newVal[key], key)
        })
      }
      this.aggregationsUpdated = true
    }
  },
  methods: {
    setMap (instance) {
      this.mapInstance = instance
    },
    setFieldValues (fields, key, values) {
      const matchedField = fields.find(f => f.model === key)
      if (matchedField) {
        const updatedValues = values.map(itm => {
          return {
            id: itm.toLowerCase(),
            name: itm
          }
        })
        if (matchedField.values && Array.isArray(matchedField.values)) {
          matchedField.values.push(...updatedValues)
        } else {
          matchedField.values = updatedValues
        }
      }
    },
    updateFormValues (values, key) {
      if (this.searchForm.schema.groups) {
        this.searchForm.schema.groups.forEach(group => {
          this.setFieldValues(group.fields, key, values)
        })
      }
      if (this.searchForm.schema.fields) {
        this.setFieldValues(this.searchForm.schema.fields, key, values)
      }
    },
    switchTab (tab) {
      this.activeTab = tab
      this.handleEvent('tab-change', tab)
      if (tab === 'map') {
        this.$nextTick(() => {
          this.mapInstance.updateSize()
        })
      }
    },
    getModelValue (key, model) {
      const value = model[key]
      if (value) {
        if (Array.isArray(value) && value.length > 0) {
          return value
        } else if (typeof value === 'string' && value.length > 0) {
          return value
        } else if (typeof value === 'object' && Object.keys(value).length > 0) {
          return value
        }
      }
    },
    getRequestParams () {
      const params = {
        size: this.perPage,
        sort: this.sort,
        page: this.page
      }
      if (Array.isArray(this.aggregationFields) && this.aggregationFields.length > 0) {
        params.aggs = this.aggregationFields.map(agg => agg.field).join(',')
      }
      const filters = {}
      if (this.submitOnFormUpdate) {
        Object.keys(this.searchForm.model).forEach(key => {
          const val = this.getModelValue(key, this.searchForm.model)
          if (val) {
            filters[key] = val
          }
        })
      } else {
        Object.keys(this.appliedFilters).forEach(key => {
          const val = this.getModelValue(key, this.appliedFilters)
          if (val) {
            filters[key] = val
          }
        })
      }
      if (Object.keys(filters).length !== 0) {
        params.filters = filters
      }
      return params
    },
    async fetchData (showLoading = true) {
      if (showLoading) {
        this.loading = true
      }
      if (!this.results || this.serverSideFiltering) {
        let params = {}
        if (this.serverSideFiltering) {
          params = this.getRequestParams()
        } else {
          params.limit = 10000
        }

        const BASE_URL = ''
        try {
          const { data, status } = await this.$axios.get(`${BASE_URL}/ckan-api/v1/resource/${this.dataSet}`, { params })
          if (status === 200 && data && data.total > 0 && data.results && Array.isArray(data.results)) {
            this.total = data.total
            this.results = data.results
            if (this.serverSideFiltering && data.aggregations) {
              this.aggs = data.aggregations
            }
          }
          RplDataListingEventBus.$emit('fetch', { status: 'ok' })
        } catch (error) {
          this.results = []
          this.total = 0
          RplDataListingEventBus.$emit('fetch', { status: 'error' })
        }
      }

      if (this.enableMap) {
        this.setMapData()
      }
      if (this.enableTable) {
        this.setTableData()
      }
      if (showLoading) {
        setTimeout(() => {
          this.loading = false
        }, 200)
      }
      this.loading = false
    },
    setMapData () {
      if (this.enableMap && this.mapResultsMiddleware && this.mapResultsMiddleware.length > 0) {
        this.mapData = getResultsFromMiddleware(this.mapResultsMiddleware, {
          results: this.results,
          query: {
            filters: this.searchForm.model
          },
          total: this.total
        })
      } else {
        this.mapData = {
          results: this.results
        }
      }
    },
    setTableData () {
      if (this.enableTable && this.tableResultsMiddleware && this.tableResultsMiddleware.length > 0) {
        const query = {
          size: this.perPage,
          sort: this.sort,
          page: this.page,
          filters: JSON.parse(JSON.stringify(this.searchForm.model))
        }
        if (Array.isArray(this.aggregationFields) && this.aggregationFields.length > 0) {
          query.aggs = this.aggregationFields.map(agg => agg.field).join(',')
        }
        this.tableData = getResultsFromMiddleware(this.tableResultsMiddleware, {
          results: this.results,
          query,
          total: this.total
        })
        if (this.tableData.aggregations) {
          this.aggs = this.tableData.aggregations
          delete this.tableData.aggregations
        }
      } else {
        this.tableData = {
          results: this.results,
          total: this.total
        }
      }
    },
    async onModelUpdate (newVal, schema) {
      if (this.onModelUpdateHook && typeof this.onModelUpdateHook === 'function') {
        this.onModelUpdateHook()
      } else {
        this.page = 1
        if (this.submitOnFormUpdate) {
          this.fetchData()
        }
      }
      this.collapseHiddenRows()
      this.handleEvent('form-update', { value: newVal, field: schema })
    },
    collapseHiddenRows () {
      if (this.$refs['search-results-table'] && this.$refs['search-results-table'].hasOwnProperty('collapseAllRows')) {
        this.$refs['search-results-table'].collapseAllRows()
      }
    },
    onClearForm () {
      if (this.onModelUpdateHook && typeof this.onModelUpdateHook === 'function') {
        this.$nextTick(() => {
          this.onModelUpdateHook()
        })
      }
      this.collapseHiddenRows()
      this.handleEvent('clear-form')
    },
    sortUpdate (value) {
      this.page = 1
      this.sort = value
      this.collapseHiddenRows()
      this.$refs.sortselect.close()
      this.$nextTick(() => {
        this.fetchData()
        setTimeout(() => {
          this.$refs.sortselect.$el.querySelector('[role="button"]').focus()
        }, 210)
      })
      this.handleEvent('sort-change', value)
    },
    onPageChange (page) {
      this.page = page
      this.fetchData()
      if (this.$refs.searchresults) {
        VueScrollTo.scrollTo(this.$refs.searchresults.$el, 500, { offset: -50 })
      }
      this.collapseHiddenRows()
      this.handleEvent('page-change', page)
    },
    handleEvent (eventName, value) {
      RplDataListingEventBus.$emit(eventName, value)
    },
    onSearchSubmit () {
      this.appliedFilters = JSON.parse(JSON.stringify(this.searchForm.model))
      if (this.onSearchSubmitHook) {
        this.onSearchSubmitHook(this.appliedFilters)
      } else {
        if (this.$refs.searchresults) {
          VueScrollTo.scrollTo(this.$refs.searchresults.$el, 500, { offset: -50 })
        }
        this.page = 1
      }
      this.fetchData()
      this.collapseHiddenRows()
      this.handleEvent('form-submit')
    }
  },
  computed: {
    hasTabs () {
      return this.enableTable & this.enableMap
    },
    pageCount () {
      return Math.ceil(this.tableData.total / this.perPage)
    },
    range () {
      if (this.tableData.total && this.tableData.total > 0) {
        const from = this.page < 2 ? 1 : (this.perPage * (this.page - 1)) + 1
        const total = () => {
          const byPage = this.perPage * this.page
          if (byPage > this.tableData.total) {
            return this.tableData.total
          }
          return byPage
        }
        return `${from}-${total()}`
      }
      return false
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";
@import "~@dpc-sdp/ripple-form/scss/form";

@mixin rpl_btn_reset() {
  /* https://gist.github.com/MoOx/9137295 */
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  text-align: inherit;
  background: transparent;

  /* inherit font & color from ancestor */
  color: inherit;
  font: inherit;

  /* Normalize `line-height`. Cannot be changed from `normal` in Firefox 4+. */
  line-height: normal;

  /* Corrects font smoothing for webkit */
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;

  /* Corrects inability to style clickable `input` types in iOS */
  -webkit-appearance: none;

  /* Remove excess padding and border in Firefox 4+ */
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
}
$rpl-data-listing-header-spacing-s: rem(20px);
$rpl-data-listing-header-spacing-l: rem(40px);
$ch-form-element-spacing: $rpl-space-4;
$ch-form-padding-mob: rem(20px);
$ch-form-padding-desk: $rpl-space-4;
$rpl-data-listing-sort-width: rem(280px);
.rpl-data-listing {
  &__results {
    padding: 0;
  }
  .rpl-search-results-layout__header {
    margin: $rpl-data-listing-header-spacing-s 0;
    @include rpl_breakpoint('l') {
      margin: $rpl-data-listing-header-spacing-l 0;
    }
  }

  .rpl-search-results-layout__info {
    p {
      margin: 0;
      @include rpl_breakpoint_down('m') {
        margin-bottom: $rpl-data-listing-header-spacing-s;
      }
    }
  }

  &__tabs {
    margin-top: rem(36px);
  }

  &__sort {
    display: flex;
    flex-direction: column;
    @include rpl_breakpoint('m') {
      margin: auto;
      align-items: center;
      flex-direction: row;
    }
    &-select {
      @include rpl_typography_ruleset(('xs', 1em, 'regular'));
      width: 100%;
      @include rpl_breakpoint('m') {
        width: $rpl-data-listing-sort-width;
      }
    }
    label {
      text-align: left;
      flex: 1 1 200px;
      display: contents;
      @include rpl_breakpoint('l') {
        text-align: right;
      }
      .rpl-form-label {
        @include rpl_typography_ruleset(('s', 24px, 'bold'));
        margin-right: $rpl-space-2;
        @include rpl_breakpoint_down('m') {
          margin-bottom: $rpl-space-2;
        }
      }
    }
  }
  &__no-results {
    display: flex;
    align-items: center;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    padding: 36px 20px;
    h3 {
      @include rpl_typography_ruleset(('l', 20px, 'bold'));
      margin-bottom: rem(20px);
    }
    p {
      margin-top: 0;
      @include rpl_typography_ruleset(('s', 20px, 'regular'));
    }
  }
  .rpl-search-results-layout__info {
    margin: 0;
  }
  &__results-table {
    margin-left: $rpl-space-3;
    margin-right: $rpl-space-3;
    width: calc(100% - #{$rpl-space-3 * 2});
  }
  &__form {
    padding: $ch-form-padding-mob;
    @include rpl_breakpoint('l') {
      padding: $ch-form-padding-desk;
      padding-top: rem(44px);
    }
    background-color: #F5F5F8;
    &__results {
      padding: $rpl-space * 5;
    }
    fieldset {
      margin: 0;
      display: flex;
      flex-direction: column;
      @include rpl_breakpoint('l') {
        flex-direction: row;
        align-items: flex-end;
        margin-left: -$ch-form-element-spacing / 2;
        margin-right: -$ch-form-element-spacing / 2;
      }
    }
    .form-group {
      width: 100%;
      flex: 1 1;
      @include rpl_breakpoint('l') {
        margin: 0 $ch-form-element-spacing / 2;
      }
      &--center {
        width: auto;
        margin: auto;
        flex: none;
      }
      @include rpl_breakpoint_down('l') {
        margin-bottom: rem(20px);
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
    .field-rplclearform {
      margin-top: rem(30px);
      margin-bottom: rem(30px) - $ch-form-element-spacing;
    }
    [type='submit'] {
      width: 100%;
    }
    &__element {
      flex: 2;
    }
    .field-rplsubmitloader {
      flex: 1;
    }
    .rpl-select__trigger {
      background-color: #fff;
    }

  }
}
</style>
