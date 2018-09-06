<template>
  <div class="rpl-search-results">
    <div class="rpl-search-results__info" >
      <div v-if="count">Displaying {{ responseSize > count ? count : responseSize }} of {{ count }} results</div>
    </div>

    <div class="rpl-search-results__main">
      <rpl-search-result
        class="rpl-search-results__item rpl-component-gutter"
        v-bind="searchResult"
        v-if="searchResults && !errorMsg"
        v-for="(searchResult, index) of searchResults"
        :key="index"
      />
      <div v-if="searchResults.length === 0" class="rpl-search-results__no-results-msg">
        {{ noResultsMsg }}
      </div>
      <div v-if="errorMsg" class="rpl-search-results__error-msg">
        {{ errorMsg }}
      </div>
    </div>

    <div class="rpl-search-results__pager">
      <rpl-pagination
        :totalSteps="pager.totalSteps"
        :initialStep="pager.initialStep"
        :stepsAround="pager.stepsAround"
        @change="$emit('pager-change', $event)"
      />
    </div>
  </div>
</template>

<script>
import RplPagination from '@dpc-sdp/ripple-pagination'
import RplSearchResult from './SearchResult.vue'

export default {
  name: 'RplSearchResults',
  components: {
    RplPagination,
    RplSearchResult
  },
  props: {
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
    errorMsg: String,
    noResultsMsg: String,
    responseSize: Number,
    count: Number
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";

  .rpl-search-results {
    &__info,
    &__no-results-msg,
    &__error-msg {
      @include rpl_mobile_padding();
      margin-bottom: $rpl-space-4;

      @include rpl_breakpoint('m') {
        padding-left: 0;
        padding-right: 0;
        margin-bottom: $rpl-space-4 * 2;
      }
    }

    &__no-results-msg,
    &__error-msg {
      @include rpl_typography('heading_l');
    }
  }
</style>
