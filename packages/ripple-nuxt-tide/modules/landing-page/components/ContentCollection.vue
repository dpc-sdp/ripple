<template>
  <div class="app-content-collection">
    <!-- Heading -->
    <div class="app-content-collection__header">
      <div class="app-content-collection__header-left">
        <h2 v-if="title" class="app-content-collection__heading">{{ title }}</h2>
        <p v-if="description">{{ description }}</p>
      </div>
      <div class="app-content-collection__header-right">
        <rpl-link v-if="cta" :href="cta.url">{{ cta.text }}</rpl-link>
      </div>
    </div>
    <!-- Filters -->
    <rpl-form
      v-if="exposedFilterFormData"
      :formData="exposedFilterFormData"
      :submitHandler="exposedFilterFormSubmit"
    />
    <hr v-if="exposedFilterFormData" />
    <!-- Search Results -->
    <rpl-search-results-layout
      :searchResults="results"
      :errorMsg="errorText"
      :noResultsMsg="noResultsText"
      :loading="resultsLoading"
    >
      <template v-slot:count v-if="resultCount">{{ resultCount }}</template>
      <template v-slot:sort>
        <rpl-form
          v-if="exposedControlFormData"
          :formData="exposedControlFormData"
          :submitHandler="exposedControlsFormSubmit"
          :listenForClearForm="false"
        />
      </template>
      <template v-slot:loading>{{ loadingText }}</template>
      <template v-slot:results="scoped">
        <!-- Results can be modified through slots. -->
        <slot name="results" :searchResults="scoped.searchResults">
          <rpl-col
            v-for="(result, i) in scoped.searchResults"
            :key="`${i}-result`"
            :colsBp="resultColumns"
          >
            <component
              class="app-content-collection__search-result"
              :is="resultComponentName"
              v-bind="result"
            />
          </rpl-col>
        </slot>
      </template>
      <template v-slot:pagination>
        <rpl-col cols="full" :colsBp="paginationColumns">
          <rpl-pagination
            v-if="showPagination"
            v-bind="paginationData"
            @change="paginationChange"
          />
        </rpl-col>
      </template>
    </rpl-search-results-layout>
  </div>
</template>

<script>
import Vue from 'vue'
import { RplLink } from '@dpc-sdp/ripple-link'
import { RplForm } from '@dpc-sdp/ripple-form'
import { RplCol } from '@dpc-sdp/ripple-grid'
import provideChildCols from '@dpc-sdp/ripple-global/mixins/ProvideChildCols'
import ContentCollection from '../lib/content-collection.js'
import RplPagination from '@dpc-sdp/ripple-pagination'
import { RplSearchResultsLayout, RplSearchResult } from '@dpc-sdp/ripple-search'
import { RplCardPromo } from '@dpc-sdp/ripple-card'
// TODO - We need to figure out how custom result components can be loaded.

export default {
  name: 'AppContentCollection',
  mixins: [provideChildCols],
  components: {
    RplLink,
    RplForm,
    RplCol,
    RplSearchResultsLayout,
    RplSearchResult,
    RplCardPromo,
    RplPagination
  },
  props: {
    schema: Object,
    environment: Object,
    preloadSearchResponse: Object,
    sidebar: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const searchEndpoint = this.searchEndpoint.bind(this)
    const dataManager = new ContentCollection(this.schema, searchEndpoint, this.environment)
    return {
      dataManager,
      defaultState: dataManager.getDefaultState(),
      state: dataManager.getDefaultState(),
      results: [],
      resultTotal: null,
      resultCount: null,
      resultsLoading: false,
      exposedFilterFormData: dataManager.getExposedFilterForm(),
      exposedControlFormData: dataManager.getExposedControlForm(),
      exposedControlModels: dataManager.getExposedControlModelNames(),
      exposedFilterModels: dataManager.getExposedFilterModelNames(),
      paginationData: dataManager.getDisplayPaginationData()
    }
  },
  computed: {
    title () {
      return this.dataManager.getTitle()
    },
    description () {
      return this.dataManager.getDescription()
    },
    cta () {
      return this.dataManager.getCTA()
    },
    loadingText () {
      return this.dataManager.getDisplayLoadingText()
    },
    noResultsText () {
      return this.dataManager.getDisplayNoResultsText()
    },
    errorText () {
      return this.dataManager.getDisplayErrorText()
    },
    resultComponentName () {
      return this.dataManager.getDisplayResultComponentName()
    },
    resultColumns () {
      return this.dataManager.getDisplayResultComponentColumns()
    },
    paginationColumns () {
      return this.dataManager.getDisplayPaginationComponentColumns()
    },
    showPagination () {
      return this.paginationData && this.paginationData.totalSteps > 1
    },
    paginationModelName () {
      return this.dataManager.getPaginationModelName()
    }
  },
  methods: {
    searchEndpoint (dsl) {
      return this.$tideSearchApi.searchByPost(dsl)
    },
    async getResults () {
      this.resultsLoading = true
      const response = await this.dataManager.getResults(this.state)
      this.updatePropertiesBasedOnSearchResponse(response)
      this.resultsLoading = false
    },
    updatePropertiesBasedOnSearchResponse (response) {
      if (this.exposedFilterFormData && response.aggregations) {
        this.updateExposedFilterFormAggregations(response.aggregations)
      }
      this.results = response.hits
      this.resultCount = this.dataManager.getProcessedResultsCount(this.state, response.total)
      if (this.paginationData) {
        this.paginationData.totalSteps = this.dataManager.getPaginationTotalSteps(this.state, response.total)
      }
    },
    updateExposedFilterFormAggregations (responseAggregations) {
      // TODO - Some of this needs to be in the CC class, some here.
      Object.keys(responseAggregations).forEach(model => {
        this.exposedFilterFormData.schema.groups.forEach(group => {
          group.fields.forEach(field => {
            if (field.model === model) {
              const buckets = responseAggregations[model].buckets
              if (buckets.length > 0) {
                field.values = buckets.map(({ key, doc_count: count }) => ({ id: key, name: `${key} (${count})` }))
                Vue.set(field, 'disabled', false)
              } else {
                this.state[model] = this.defaultState[model]
                field.values = this.state[model]
                Vue.set(field, 'disabled', true)
              }
            }
          })
        })
      })
    },
    syncTo (from, to, allowed) {
      return this.dataManager.syncObject(from, to, allowed)
    },
    resetPagination () {
      this.state[this.paginationModelName] = 1
    },
    setPaginationFromState () {
      if (this.paginationData) {
        this.paginationData.initialStep = parseInt(this.state[this.paginationModelName])
      }
    },
    paginationChange (value) {
      this.syncTo({ page: value }, this.state)
      this.updateQuery()
    },
    exposedFilterFormSubmit () {
      this.syncTo(this.exposedFilterFormData.model, this.state)
      this.resetPagination()
      this.updateQuery()
    },
    exposedControlsFormSubmit () {
      this.syncTo(this.exposedControlFormData.model, this.state)
      this.resetPagination()
      this.updateQuery()
    },
    updateQuery () {
      const query = {}
      // TODO - Take into account the default state.
      this.syncTo(this.state, query)
      this.$router.replace({ query })
    },
    syncQueryState (query) {
      this.syncTo(query, this.state)
      if (this.exposedFilterFormData) {
        this.syncTo(this.state, this.exposedFilterFormData.model, this.exposedFilterModels)
      }
      if (this.exposedControlFormData) {
        this.syncTo(this.state, this.exposedControlFormData.model, this.exposedControlModels)
      }
      this.setPaginationFromState()
    }
  },
  watch: {
    $route (to, from) {
      this.syncQueryState(to.query)
      this.getResults()
    }
  },
  created () {
    this.syncQueryState(this.$route.query)
    if (this.preloadSearchResponse) {
      this.updatePropertiesBasedOnSearchResponse(this.preloadSearchResponse)
    }
  },
  mounted () {
    if (!this.preloadSearchResponse) {
      this.getResults()
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

$app-content-collection-form-gutter: .75rem;

.app-content-collection {
  &__header {
    @include rpl-breakpoint('m') {
      display: flex;
      justify-content: space-between;
      width: 100%;
      &-left {
        p:first-child {
          margin-top: 0;
        }
        p:last-child {
          margin-bottom: $rpl-component-gutter-l;
        }
      }
      &-right {
        .rpl-link {
          white-space: nowrap;
          display: inline
        }
      }
    }
    &-right {
      .rpl-link {
        white-space: nowrap;
        margin-bottom: $rpl-component-gutter-l;
        display: inline-block;
        @include rpl-breakpoint('m') {
          margin-left: $rpl-component-gutter-l;
        }
      }
    }
  }

  &__heading {
    @include rpl_typography('heading_l');
    margin: 0;
    margin-bottom: $rpl-space * 5;
  }

  &__search-result {
    width: 100%;
    padding-bottom: 0 !important;
  }

  &__form-wrap {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    margin-left: -$app-content-collection-form-gutter;
    margin-right: -$app-content-collection-form-gutter;
    width: calc(100% + #{$app-content-collection-form-gutter} * 2);

    &-no-gutter {
      margin-left: 0;
      margin-right: 0;
      width: 100%;
    }
  }

  &__form-col-full, &__form-col-2, &__form-col-3, &__form-col-4 {
    margin-left: $app-content-collection-form-gutter;
    margin-right: $app-content-collection-form-gutter;
    width: 100%;
  }

  &__form-col-2 {
    @include rpl-breakpoint('m') {
      width: calc(50% - #{$app-content-collection-form-gutter} * 2);
    }
  }

  &__form-col-3 {
    @include rpl-breakpoint('m') {
      width: calc(50% - #{$app-content-collection-form-gutter} * 2);
    }
    @include rpl-breakpoint('l') {
      width: calc(33.33% - #{$app-content-collection-form-gutter} * 2);
    }
  }

  &__form-col-4 {
    @include rpl-breakpoint('m') {
      width: calc(50% - #{$app-content-collection-form-gutter} * 2);
    }
    @include rpl-breakpoint('l') {
      width: calc(25% - #{$app-content-collection-form-gutter} * 2);
    }
  }

  &__form-inline {
    display: inline-block;
  }

  &__form-inline + &__form-inline {
    margin-left: $rpl-component-gutter-l
  }

  .rpl-search-results-layout__sort {
    .rpl-form {
      .form-group {
        margin-left: $app-content-collection-form-gutter;
        margin-right: $app-content-collection-form-gutter;
        width: 100%;
        @include rpl-breakpoint('m') {
          display: flex;
          flex-direction: row;
          align-items: center;
          width: auto;
          margin-right: 0;
          label:not(.rpl-option-button__label) {
            margin-bottom: 0;
            margin-right: $rpl-space-3;
          }
          .rpl-select__trigger {
            padding-right: $rpl-component-gutter-l * 2;
          }
        }
      }
    }
    .app-content-collection__form-inline + .app-content-collection__form-inline {
      @include rpl-breakpoint('m') {
        margin-left: $rpl-component-gutter-l;
        margin-right: 0;
      }
    }
  }

  .rpl-search-results-layout__header {
    display: block;
  }

  .rpl-clearform {
    padding-top: $rpl-space-3;
    padding-bottom: $rpl-space-3;
  }

  .vue-form-generator fieldset:not(.app-content-collection__form-wrap) {
    // Remove default fieldset margins.
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
