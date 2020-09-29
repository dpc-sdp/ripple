<template>
  <div class="app-card-collection" :class="`app-card-collection--${displayType}`">
    <h2 v-if="title && (hasResults || noResultsMsg)" ref="title" class="app-card-collection__title">{{ title }}</h2>
      <div class="app-card-collection__carousel" v-if="displayType === 'carousel'">
        <client-only v-if="hasResults">
          <rpl-card-carousel :cards="cards" :childColsBp="cols" />
        </client-only>
      </div>
      <div class="app-card-collection__grid" v-else-if="displayType === 'grid'">
        <div class="app-card-collection__filters" v-if="filterForm">
          <rpl-title-search class="app-card-collection__keyword-search" placeholder="search all something" ref="titlesearch" @submit-search="titleSearchSubmit" />
          <button v-if="!alwaysShowFilters" @click="toggleFilters()" class="app-card-collection__filter-toggle">
            {{ showFilters ? 'Hide' : 'Show' }} filters
          </button>
          <rpl-form
            v-if="showFilters"
            :submitHandler="searchFormSubmit"
            v-bind="filterForm"
          />
        </div>
        <rpl-row v-if="hasResults && cards.length > 0" row-gutter :class="{ [`app-card-collection__grid--loading`]: loading }">
          <rpl-col v-for="card in cards" cols="full" :colsBp="card.cols" :key="card.uuid" :data-card-collection-item="card.uuid">
            <rpl-card v-bind="card.data" />
          </rpl-col>
        </rpl-row>
        <div v-if="total > results.length" class="app-card-collection__pagination">
          <rpl-pagination
            :totalSteps="totalSteps"
            :initialStep="page"
            :stepsAround="2"
            @change="pageChange"
          />
        </div>
      </div>
    <div v-if="!hasResults && noResultsMsg" class="app-card-collection__no-results">
      {{noResultsMsg}}
    </div>
  </div>
</template>

<script>
import get from 'lodash.get'
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import { RplCardCarousel, RplCard } from '@dpc-sdp/ripple-card'
import RplPagination from '@dpc-sdp/ripple-pagination'
import { RplForm, RplFormEventBus } from '@dpc-sdp/ripple-form'
import { getQueryParams, getSiteDomainUrl, getFilterFormFromConfig } from './../lib/card-collection-utils'
import VueScrollTo from 'vue-scrollto'
import RplTitleSearch from './TitleSearch'
export default {
  props: {
    title: String,
    config: Object,
    initialResults: Array,
    initialTotal: Number,
    aggregations: Object
  },
  components: {
    RplRow,
    RplCol,
    RplCard,
    RplCardCarousel,
    RplPagination,
    RplTitleSearch,
    RplForm
  },
  data () {
    return {
      page: 1,
      cols: {
        m: 6,
        l: 4,
        xxxl: 3
      },
      results: [],
      filterForm: {},
      loading: false,
      total: 0,
      showFilters: false,
      alwaysShowFilters: false
    }
  },
  methods: {
    async pageChange (p) {
      if (this.page !== p) {
        this.page = p
        this.loading = true
        await this.doSearch()
        this.loading = false
        if (this.$refs.title) {
          VueScrollTo.scrollTo(this.$refs.title, 500, { offset: -100 })
        }
      }
    },
    toggleFilters () {
      this.showFilters = !this.showFilters
    },
    async doSearch (formParams, title) {
      const params = getQueryParams(this.config)
      params.filters = {
        ...params.filters,
        ...formParams
      }

      if (this.config.form.titleFields && title) {
        params.q = {
          value: title,
          fields: this.config.form.titleFields
        }
      }
      if (this.$store.state.tideSite.siteId) {
        params.site = this.$store.state.tideSite.siteId
      }
      if (this.page) {
        params.page = this.page
      }
      console.log('params', params, title)
      const response = await this.$tideSearchApi.search('/cards', params)
      // TODO : Update form from aggregation values
      this.results = response.results
      this.total = Number(response.total)
    },
    titleSearchSubmit (title) {
      this.searchFormSubmit(this.filterForm.formData.model, title)
    },
    searchFormSubmit (formModel = this.filterForm.formData.model, title = false) {
      if (formModel && !this.loading) {
        this.loading = true
        const filters = {}
        Object.keys(formModel).forEach(key => {
          filters[key] = {
            values: formModel[key]
          }
        })
        this.doSearch(filters, title)
        this.loading = false
      }
    },
    async setfilterForm () {
      if (this.config.form) {
        const filterForm = await getFilterFormFromConfig(this.config.form, this.aggregations)
        this.filterForm = filterForm
      }
    }
  },
  created () {
    if (this.initialResults) {
      this.results = this.initialResults
    }
    this.setfilterForm()
    this.total = this.initialTotal
    if (this.alwaysShowFilters) {
      this.showFilters = true
    }
  },
  mounted () {
    if (this.config && this.config.form.submit.onChange) {
      RplFormEventBus.$on('updated', this.searchFormSubmit)
    }
  },
  computed: {
    totalSteps () {
      return Math.ceil(Number(this.total) / this.perPage)
    },
    perPage () {
      return get(this.config, ['display', 'items'], 9)
    },
    displayType () {
      if (this.config) {
        return get(this.config, ['display', 'type'], 'grid')
      }
    },
    contentType () {
      if (this.config) {
        return get(this.config, 'content_type', 'all')
      }
    },
    cards () {
      if (this.results.length > 0) {
        return this.results.map(item => {
          const url = getSiteDomainUrl(item.link.url, this.$store.state.tideSite.siteId, this.$store.state.tideSite.sitesDomainMap)
          return {
            name: 'rpl-card',
            cols: this.cols,
            uuid: item.uuid,
            data: {
              ...item,
              link: {
                url,
                text: ''
              },
              uuid: undefined
            }
          }
        })
      }
      return []
    },
    hasResults () {
      return this.results.length > 0
    },
    noResultsMsg () {
      if (!this.hasResults && this.config.results.min_not_met === 'no_results_message') {
        return this.config.results.no_results_message || 'There are currently no results'
      }
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

$card-collection-title-ruleset: (
  'xs': ('l', 0.9em, 'bold'),
  'l': ('mega', 1.29em, 'bold')
) !default;
$card-collection-title-text-color: rpl-color('extra_dark_neutral') !default;

.app-card-collection {
  &__title {
    @include rpl_typography_ruleset($card-collection-title-ruleset);
    color: $card-collection-title-text-color;
    margin-top: 0;
  }

  &__grid {
    .rpl-link {
      pointer-events: inherit;
    }
    &--loading {
      opacity: 0.5;
      a.rpl-link {
        pointer-events: none;
      }
    }
  }

  &__filters {
    margin-bottom: $rpl-space-4;
  }

  &__keyword-search {
    margin-bottom: $rpl-space-4;
  }

  &__filter-toggle {
    color: $card-collection-title-text-color;
    margin-left: auto;
    background: none;
    border: 0;
    display: flex;
    padding: $rpl-space-2;
    margin-top: $rpl-space-2;
  }

  &__no-results-msg {
    margin-bottom: $rpl-space-4;

    @include rpl_breakpoint('m') {
      margin-bottom: $rpl-space-4 * 2;
    }
  }
}
</style>
