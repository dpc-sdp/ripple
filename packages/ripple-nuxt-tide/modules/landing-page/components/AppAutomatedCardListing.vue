<template>
  <div class="automated-card-listing" v-if="showComponent" ref="listing">
    <h2 v-if="title" class="automated-card-listing__title">{{ title }}</h2>
    <div v-if="!showNoResultMessage && (listingSettings.display && listingSettings.display.type === 'carousel')">
      <client-only>
        <rpl-card-carousel :cards="carouselCards" :childColsBp="childColsBp" />
      </client-only>
    </div>
    <div v-if="!showNoResultMessage && (listingSettings.display && listingSettings.display.type === 'grid')">
      <rpl-row v-if="cards" row-gutter>
        <template v-for="(card, index) in cards">
          <rpl-col cols="full" :colsBp="childColsBp" :key="index">
            <card-automated-listing v-bind="card" :trimFieldEventBus="eventBus" />
          </rpl-col>
        </template>
      </rpl-row>
      <rpl-row row-gutter v-if="pager && pager.totalSteps > 1">
        <rpl-col cols="full" :colsBp="childColsBp">
          <rpl-pagination
            :totalSteps="pager.totalSteps"
            :initialStep="pager.initialStep"
            :stepsAround="pager.stepsAround"
            @change="pagerChange"
          />
        </rpl-col>
      </rpl-row>
    </div>
    <div v-if="showNoResultMessage" class="automated-card-listing__no-results-msg">
      <span>{{ listingSettings.results.no_results_message }}</span>
    </div>
    <rpl-button v-if="ctaLink" theme="primary" :href="ctaLink.url">{{ ctaLink.text }}</rpl-button>
  </div>
</template>

<script>
import Vue from 'vue'
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import CardAutomatedListing from './AppCardAutomatedListing'
import RplPagination from '@dpc-sdp/ripple-pagination'
import RplButton from '@dpc-sdp/ripple-button'
import { RplCardCarousel } from '@dpc-sdp/ripple-card'
import provideChildCols from '@dpc-sdp/ripple-global/mixins/ProvideChildCols'
import AutomatedListingSearch from '../lib/automated-listing-search'

export default {
  name: 'AutomatedCardListing',
  mixins: [provideChildCols],
  components: {
    RplRow,
    RplCol,
    CardAutomatedListing,
    RplPagination,
    RplButton,
    RplCardCarousel
  },
  props: {
    listingSettings: Object,
    initialResults: Object,
    initialState: Object,
    title: String,
    cardCtaText: String,
    ctaLink: Object
  },
  data () {
    let state = null
    if (this.initialState) {
      state = {
        page: this.initialState.page,
        siteId: this.initialState.siteId,
        primarySiteId: this.initialState.primarySiteId,
        ignoreId: this.initialState.ignoreId,
        domains: this.initialState.domains,
        cta: this.initialState.cta
      }
    }
    return {
      state: state,
      pager: {
        totalSteps: this.initialResults ? this.initialResults.totalSteps : 0,
        initialStep: 1,
        stepsAround: 2
      },
      cards: this.initialResults ? this.initialResults.hits : [],
      eventBus: new Vue()
    }
  },
  methods: {
    async updateResults () {
      const listingResults = await AutomatedListingSearch.getListing(this.listingSettings, this.state)
      this.cards = listingResults.hits
      this.pager.totalSteps = listingResults.totalSteps
      this.$nextTick(() => {
        this.eventBus.$emit('setTrimFieldMaxHeight')
      })
    },
    pagerChange (step) {
      this.state.page = step
      // Below: '102' is the height of the SiteHeader when sticky.
      window.scrollTo({ top: this.$refs['listing'].offsetTop - 102, behavior: 'smooth' })
      this.updateResults()
    }
  },
  computed: {
    showComponent () {
      if (this.listingSettings) {
        const min = this.listingSettings.results.min || 1
        return !(this.listingSettings.results.min_not_met === 'hide' && this.cards.length < min)
      }
      return false
    },
    showNoResultMessage () {
      if (this.listingSettings) {
        const min = this.listingSettings.results.min || 1
        return (this.listingSettings.results.min_not_met === 'no_results_message' && this.cards.length < min)
      }
      return true
    },
    carouselCards () {
      return this.cards.map(item => ({ name: 'card-automated-listing', data: item }))
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

$automated-card-listing-title-ruleset: (
  'xs': ('l', 0.9em, 'bold'),
  'l': ('mega', 1.29em, 'bold')
) !default;
$automated-card-listing-title-text-color: rpl-color('extra_dark_neutral') !default;

.automated-card-listing {
  &__title {
    @include rpl_typography_ruleset($automated-card-listing-title-ruleset);
    color: $automated-card-listing-title-text-color;
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
