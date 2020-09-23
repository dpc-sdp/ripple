<template>
  <div class="app-card-collection" :class="`app-card-collection--${displayType}`">
    <h2 v-if="title" ref="title" class="app-card-collection__title">{{ title }}</h2>
    <template v-if="hasResults">
      <template v-if="displayType === 'carousel'">
        <client-only>
          <rpl-card-carousel :cards="cards" :childColsBp="cols" />
        </client-only>
      </template>
      <template v-else-if="displayType === 'grid'">
        <rpl-row row-gutter>
          <template v-for="card in cards">
            <rpl-col cols="full" :colsBp="card.cols" :key="card.uuid" :data-card-collection-item="card.uuid">
              <rpl-card v-bind="card.data" />
            </rpl-col>
          </template>
        </rpl-row>
        <div v-if="total > results.length" class="app-card-collection__pagination">
          <rpl-pagination
            :totalSteps="totalSteps"
            :initialStep="page"
            :stepsAround="2"
            @change="pageChange"
          />
        </div>
      </template>
    </template>
    <div v-else-if="noResultsMsg" class="app-card-collection__no-results">
      {{noResultsMsg}}
    </div>
  </div>
</template>

<script>
import get from 'lodash.get'
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import { RplCardCarousel, RplCard } from '@dpc-sdp/ripple-card'
import RplPagination from '@dpc-sdp/ripple-pagination'
import { getQueryParams, getSiteDomainUrl } from './../lib/card-collection-utils'
import VueScrollTo from 'vue-scrollto'

export default {
  props: {
    title: String,
    config: Object,
    initialResults: Array,
    total: Number
  },
  components: {
    RplRow,
    RplCol,
    RplCard,
    RplCardCarousel,
    RplPagination
  },
  data () {
    return {
      page: 1,
      cols: {
        m: 6,
        l: 4,
        xxxl: 3
      },
      results: []
    }
  },
  methods: {
    pageChange (p) {
      if (this.page !== p) {
        this.page = p
        this.doSearch()
        if (this.$refs.title) {
          VueScrollTo.scrollTo(this.$refs.title, 500, { offset: -100 })
        }
      }
    },
    async doSearch () {
      const params = getQueryParams(this.config)
      const response = await this.$tideSearchApi.search('/cards', {
        ...params,
        site: this.$store.state.tideSite.siteId,
        page: this.page
      })
      this.results = response.results
    }
  },
  created () {
    if (this.initialResults) {
      this.results = this.initialResults
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

  &__no-results-msg {
    margin-bottom: $rpl-space-4;

    @include rpl_breakpoint('m') {
      margin-bottom: $rpl-space-4 * 2;
    }
  }
}
</style>
