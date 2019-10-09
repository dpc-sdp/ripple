<template>
  <div class="rpl-latest-events">
    <h2 v-if="title" class="rpl-latest-events__title">{{ title }}</h2>
    <div class="rpl-latest-events__list">
      <div v-if="processedEvents" class="rpl-latest-events__card" v-for="(event, index) in processedEvents" :key="index">
        <rpl-card-event v-bind="event" data-tid="latest-events-card" />
      </div>
      <div v-if="cta" class="rpl-latest-events__card">
        <rpl-card-cta v-bind="cta" data-tid="latest-events-card" />
      </div>
    </div>
    <rpl-button v-if="link" :href="link.url" theme="primary" class="rpl-latest-events__call-to-action">{{ link.text }}</rpl-button>
  </div>
</template>

<script>
import { RplCardEvent, RplCardCta } from '@dpc-sdp/ripple-card'
import RplButton from '@dpc-sdp/ripple-button'

export default {
  name: 'RplLatestEvents',
  props: {
    title: String,
    events: Array,
    cta: Object,
    link: Object
  },
  components: {
    RplCardEvent,
    RplCardCta,
    RplButton
  },
  computed: {
    processedEvents () {
      if (this.events) {
        let processedEvents = this.events.slice()
        return this.cta ? processedEvents.slice(0, 5) : processedEvents.slice(0, 6)
      }
      return null
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-latest-events-call-to-action-margin: $rpl-space-3 0 !default;
  $rpl-latest-events-title-ruleset: (
    'xs': ('l', 1.5em, 'bold'),
    's': ('mega', 1em, 'bold')
  ) !default;
  $rpl-latest-events-title-color: rpl-color('extra_dark_neutral') !default;

  .rpl-latest-events {
    &__title {
      @include rpl_typography_ruleset($rpl-latest-events-title-ruleset);
      @include rpl_text_color($rpl-latest-events-title-color);
    }

    &__list {
      @include rpl_grid_row;
      @include rpl_grid_row_gutter;
    }

    &__card {
      @include rpl_breakpoint('m') {
        @include rpl_grid_column(6);
      }
      @include rpl_breakpoint('l') {
        @include rpl_grid_column(4);
      }
      @include rpl_breakpoint('xxxl') {
        @include rpl_grid_column(3);
      }
    }

    &__call-to-action {
      margin: $rpl-latest-events-call-to-action-margin;
    }
  }
</style>
