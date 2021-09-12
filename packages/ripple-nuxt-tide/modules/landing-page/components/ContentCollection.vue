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
    <rpl-divider v-if="exposedFilterFormData" />
    <!-- Search Results -->
    <rpl-search-results-layout
      ref="search-results"
      :searchResults="results"
      :error="error"
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
    <div v-if="isInteractive" class="rpl-visually-hidden" aria-live="polite">{{ announcerText }}</div>
  </div>
</template>

<script>
import Vue from 'vue'
import { RplLink } from '@dpc-sdp/ripple-link'
import { RplForm } from '@dpc-sdp/ripple-form'
import { RplCol } from '@dpc-sdp/ripple-grid'
import provideChildCols from '@dpc-sdp/ripple-global/mixins/ProvideChildCols'
import RplPagination from '@dpc-sdp/ripple-pagination'
import { RplSearchResultsLayout, RplSearchResult } from '@dpc-sdp/ripple-search'
import { RplCardPromo } from '@dpc-sdp/ripple-card'
import { RplDivider } from '@dpc-sdp/ripple-global'

export default {
  name: 'AppContentCollection',
  mixins: [provideChildCols],
  components: {
    RplLink,
    RplForm,
    RplCol,
    RplDivider,
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
    const dataManager = new this.$tideContentCollection(this.schema, searchEndpoint, this.environment)
    return {
      dataManager,
      defaultState: dataManager.getDefaultState(),
      state: dataManager.getDefaultState(),
      results: [],
      resultTotal: null,
      resultCount: null,
      resultsLoading: false,
      error: null,
      announcerText: '',
      scrollOnNextLoad: false,
      scrollOnPaginationChange: false,
      scrollOffset: dataManager.getScrollToResultsOffsetHeight(),
      exposedFilterFormData: dataManager.getExposedFilterForm(),
      exposedControlFormData: dataManager.getExposedControlForm(),
      exposedControlModels: dataManager.getExposedControlModelNames(),
      exposedFilterModels: dataManager.getExposedFilterModelNames(),
      paginationData: dataManager.getDisplayPaginationData(),
      useRouter: dataManager.getKeepState()
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
    },
    isInteractive () {
      return (!!this.exposedFilterFormData || !!this.exposedControlFormData || !!this.paginationData)
    }
  },
  methods: {
    searchEndpoint (dsl) {
      return this.$tideSearchApi.searchByPost(dsl)
    },
    async getResults () {
      this.resultsLoading = true
      this.announcerText = ''
      const response = await this.dataManager.getResults(this.state)
      if (response) {
        this.error = null
        this.updateInterfaceFromSearchResponse(response)
        this.announcerText = response.total > 0 ? this.resultCount : this.noResultsText
      } else {
        this.error = { message: this.errorText }
        this.announcerText = this.errorText
      }
      this.resultsLoading = false
      if (this.scrollOnNextLoad) {
        this.scrollOnNextLoad = false
        this.moveToTopOfResults()
      }
    },
    moveToTopOfResults () {
      if (this.scrollOnPaginationChange) {
        const scrollToEl = this.$refs['search-results']?.$el
        if (scrollToEl) {
          this.$nextTick(() => {
            window.scrollTo({
              top: (scrollToEl.offsetTop - this.scrollOffset)
            })
            const firstLinkEl = scrollToEl.querySelector('a')
            if (firstLinkEl) {
              firstLinkEl.focus()
            }
          })
        }
      }
    },
    updateInterfaceFromSearchResponse (response) {
      this.results = response.hits
      this.resultCount = this.dataManager.getProcessedResultsCount(this.state, response.total)
      if (this.exposedFilterFormData && response.aggregations) {
        this.dataManager.updateFiltersFromAggregation(response.aggregations, this.exposedFilterFormData, this.state, (field, isDisabled) => {
          Vue.set(field, 'disabled', isDisabled)
        })
      }
      if (this.paginationData) {
        this.paginationData.totalSteps = this.dataManager.getPaginationTotalSteps(this.state, response.total)
      }
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
      this.scrollOnNextLoad = true
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
      const query = this.dataManager.getDiffObject(this.state, this.defaultState)
      if (this.useRouter) {
        this.$router.replace({ query })
      } else {
        this.syncQueryState(query)
        this.getResults()
      }
    },
    syncQueryState (query) {
      this.syncTo(this.dataManager.getTypeCorrectedQuery(query, this.defaultState), this.state)
      if (this.exposedFilterFormData) {
        this.syncTo(this.state, this.exposedFilterFormData.model, this.exposedFilterModels)
      }
      if (this.exposedControlFormData) {
        this.syncTo(this.state, this.exposedControlFormData.model, this.exposedControlModels)
      }
      this.setPaginationFromState()
    },
    initializeScrollOnPageChange () {
      this.scrollOnPaginationChange = this.dataManager.getScrollToResults()
    }
  },
  watch: {
    $route (to, from) {
      this.syncQueryState(to.query)
      this.getResults()
    }
  },
  created () {
    if (this.useRouter) {
      this.syncQueryState(this.$route.query)
    }
    if (this.preloadSearchResponse) {
      this.updateInterfaceFromSearchResponse(this.preloadSearchResponse)
      this.initializeScrollOnPageChange()
    }
  },
  mounted () {
    if (!this.preloadSearchResponse) {
      this.getResults().then(this.initializeScrollOnPageChange.bind(this))
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

$app-content-collection-form-gutter: .75rem;
$rpl-search-form-button-width: rem(28px) !default;
$rpl-search-form-show-filters-ruleset: ('s', .87em, 'bold') !default;
$rpl-search-form-search-button-text: $rpl-search-form-show-filters-ruleset !default;
$rpl-search-form-search-button-text-color: rpl-color('primary') !default;

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
          display: inline;
          margin-left: $rpl-component-gutter-l;
        }
      }
    }
    &-right {
      .rpl-link {
        white-space: nowrap;
        margin-bottom: $rpl-component-gutter-l;
        display: inline-block;
        color: rpl-color('primary');
        @include rpl-typography-font('s', 1.2rem, 'semibold');
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

  // Search form styles
  .rpl-search-form {
    $root: &;
    &__btn {
      background-color: transparent;
      border: 0;
      padding: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      @include rpl_print_hidden;

      @at-root {
        #{$root}--dark #{$root}__btn {
          @include rpl_focus_dark;
        }
      }

      span {
        @include rpl_typography_ruleset($rpl-search-form-search-button-text);
        color: $rpl-search-form-search-button-text-color;
        margin-right: $rpl-space-2;
      }

      svg {
        width: $rpl-search-form-button-width;
        height: $rpl-search-form-button-width;
      }
    }
  }

  // Search results layout
  .rpl-search-results-layout {
    &__info {
      @include rpl-typography-font('s', 1.2rem, 'medium');
    }
    &__sort {
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
    &__header {
      display: block;
    }
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
