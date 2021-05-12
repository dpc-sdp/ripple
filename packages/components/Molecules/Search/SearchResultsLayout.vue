<template>
  <div class="rpl-search-results-layout">
    <div v-if="error" class="rpl-search-results-layout__error-msg">
      <slot name="error">{{ error.message || errorMsg }}</slot>
    </div>
    <template v-else>
      <div class="rpl-search-results-layout__header">
        <div class="rpl-search-results-layout__info" v-if="range && count">
          <slot name="count">
            Displaying {{ range }} of {{ count }} results
          </slot>
        </div>
        <div v-if="!!$slots.sort" class="rpl-search-results-layout__sort">
          <slot name="sort"></slot>
        </div>
      </div>
      <template v-if="loading">
        <slot name="loading">
          ...loading
        </slot>
      </template>
      <rpl-row row-gutter class="rpl-search-results-layout__main" :class="{'rpl-search-results-layout__main--loading': loading}" v-if="searchResults && searchResults.length > 0 && !loading">
        <slot name="results" :searchResults="searchResults">
          <rpl-col cols="full">
            {{searchResults}}
          </rpl-col>
        </slot>
      </rpl-row>
      <div v-if="searchResults.length === 0 && !loading" class="rpl-search-results-layout__no-results-msg">
        <slot name="noresults"><p> {{ noResultsMsg }} </p></slot>
      </div>
      <rpl-row row-gutter v-if="pager">
        <slot name="pagination">
          <rpl-col cols="full" :colsBp="pagerColsBp">
            <rpl-pagination
              :totalSteps="pager.totalSteps"
              :initialStep="pager.initialStep"
              :stepsAround="pager.stepsAround"
              @change="$emit('pager-change', $event)"
            />
          </rpl-col>
        </slot>
      </rpl-row>
    </template>
  </div>
</template>

<script>
import provideChildCols from '@dpc-sdp/ripple-global/mixins/ProvideChildCols'
import RplPagination from '@dpc-sdp/ripple-pagination'
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'

export default {
  name: 'rplSearchResults',
  mixins: [provideChildCols],
  components: {
    RplPagination,
    RplRow,
    RplCol
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
    perPage: {
      type: Number,
      default: 10
    },
    error: {
      type: Object
    },
    errorMsg: {
      type: String,
      default: 'Search isn\'t working right now, please try again later.'
    },
    count: Number,
    noResultsMsg: {
      type: String,
      default: 'Sorry! We couldn\'t find any matches'
    },
    loading: Boolean,
    pagerColsBp: {
      type: Object,
      default () {
        return { m: 6, l: 4, xxxl: 3 }
      }
    }
  },
  computed: {
    range () {
      if (this.pager && this.count && this.count > 0) {
        const from = this.pager.initialStep < 2 ? 1 : (this.perPage * (this.pager.initialStep - 1)) + 1
        const total = () => {
          const byPage = this.perPage * this.pager.initialStep
          if (byPage > this.count) {
            return this.count
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

  .rpl-search-results-layout {
    color: rpl-color('extra_dark_neutral');
    padding: $rpl-space * 5 0;
    &__no-results-msg,
    &__error-msg {
      margin-bottom: $rpl-space-4;

      @include rpl_breakpoint('m') {
        margin-bottom: $rpl-space-4 * 2;
      }
    }

    &__header {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 1rem;
      margin-right: 0;
      justify-items: center;
      @include rpl_breakpoint('m') {
        align-items: center;
        flex-direction: row;
      }
    }

    &__info {
      margin: $rpl-space-4 0;
    }

    &__sort {
      align-self: flex-start;
    }

    &__sort {
      margin-left: 0;
      width: 100%;
      @include rpl_breakpoint(m) {
        width: auto;
        margin-left: auto;
      }
    }

    &__no-results-msg,
    &__error-msg {
      @include rpl_typography('heading_l');
    }

    &__main {
      &--loading {
        opacity: 0.2;
        pointer-events: none;
      }
    }

    .rpl-pagination {
      // Allow space (72px) for the back-to-top button in BaseLayout.
      margin-top: $rpl-space-4 * 2;
      @include rpl_breakpoint('s') {
        width: calc(100% - #{$rpl-space * 18});
      }

      @include rpl_breakpoint(m) {
        width: 100%;
      }
    }
  }
</style>
