<template>
  <div class="rpl-search-results">
    <div class="rpl-search-results__info" >
      <div v-if="count">Displaying {{ responseSize > count ? count : responseSize }} of {{ count }} results</div>
    </div>
    <rpl-row row-gutter class="rpl-search-results__main" :class="{'rpl-search-results__main--events': type === 'RplCardEvent'}">
      <template v-if="searchResults && !errorMsg">
        <rpl-col cols="full" v-for="(searchResult, index) of searchResults" :key="index" :colsBp="searchResultContent.colsBp">
          <component
            v-if="searchResultContent.component"
            :is="searchResultContent.component"
            :class="searchResultContent.class"
            v-bind="searchResult"
            class="rpl-search-results__item rpl-component-gutter"
          />
        </rpl-col>
      </template>
      <div v-if="searchResults.length === 0" class="rpl-search-results__no-results-msg">
        {{ noResultsMsg }}
      </div>
      <div v-if="errorMsg" class="rpl-search-results__error-msg">
        {{ errorMsg }}
      </div>
    </rpl-row>
    <rpl-row row-gutter>
      <rpl-col cols="full" :colsBp="childColsBp">
        <rpl-pagination
          :totalSteps="pager.totalSteps"
          :initialStep="pager.initialStep"
          :stepsAround="pager.stepsAround"
          @change="$emit('pager-change', $event)"
        />
      </rpl-col>
    </rpl-row>
  </div>
</template>

<script>
import provideChildCols from '@dpc-sdp/ripple-global/mixins/ProvideChildCols'
import RplPagination from '@dpc-sdp/ripple-pagination'
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'

export default {
  name: 'RplSearchResults',
  mixins: [provideChildCols],
  components: {
    RplPagination,
    RplRow,
    RplCol
  },
  props: {
    type: { type: String, default: 'default' },
    searchResults: {
      type: Array,
      default: function () {
        return []
      }
    },
    pager: {
      type: Object,
      default: function () {
        return {
          totalSteps: 0,
          initialStep: 0,
          stepsAround: 0
        }
      }
    },
    childColsBp: {
      type: Object,
      default: function () {
        return {m: 6, l: 4, xxxl: 3}
      }
    },
    errorMsg: String,
    noResultsMsg: String,
    responseSize: Number,
    count: Number
  },
  created () {
    if (this.type) {
      switch (this.type) {
        case 'RplCardEvent':
          this.searchResultContent = {
            component: () => import(/* webpackChunkName: 'rpl-card-event' */ '@dpc-sdp/ripple-card').then(m => m.RplCardEvent),
            colsBp: this.childColsBp,
            class: ['rpl-search-results__item--event']
          }
          break
        case 'RplCardPromotion':
          this.searchResultContent = {
            component: () => import(/* webpackChunkName: 'rpl-card-promotion' */ '@dpc-sdp/ripple-card').then(m => m.RplCardPromotion),
            colsBp: this.childColsBp,
            class: ['rpl-search-results__item--promotion']
          }
          break
        case 'RplCardHonourRoll':
          this.searchResultContent = {
            component: () => import(/* webpackChunkName: 'rpl-card-honour-roll' */ '@dpc-sdp/ripple-card').then(m => m.RplCardHonourRoll),
            colsBp: this.childColsBp,
            class: ['rpl-search-results__item--honour-roll']
          }
          break
        case 'RplGrantsListItem':
          this.searchResultContent = {
            component: () => import(/* webpackChunkName: 'rpl-card-promotion' */ '@dpc-sdp/ripple-grants').then(m => m.RplGrantsListItem),
            class: ['rpl-search-results__item--grant']
          }
          break
        default:
          this.searchResultContent = {
            component: () => import(/* webpackChunkName: 'rpl-card-promotion' */ './SearchResult.vue')
          }
      }
    }
  },
  data () {
    return {
      searchResultContent: null
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  .rpl-search-results {
    &__info,
    &__no-results-msg,
    &__error-msg {
      margin-bottom: $rpl-space-4;

      @include rpl_breakpoint('m') {
        margin-bottom: $rpl-space-4 * 2;
      }
    }

    &__no-results-msg,
    &__error-msg {
      @include rpl_typography('heading_l');
    }

    .rpl-pagination {
      // Allow space (72px) for the back-to-top button in BaseLayout.
      width: calc(100% - #{$rpl-space * 18});

      @include rpl_breakpoint(m) {
        width: 100%;
      }
    }
  }
</style>
