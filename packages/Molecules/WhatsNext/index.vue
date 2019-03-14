<template>
  <div class="rpl-whats-next">
    <div class="rpl-whats-next__row">
      <h2 class="rpl-whats-next__title">{{ title }}</h2>
    </div>
    <div class="rpl-whats-next__row">
      <ul class="rpl-whats-next__items" v-if="links">
        <li class="rpl-whats-next__item" v-for="(item, index) of links" :key="index">
          <rpl-text-link :url="item.url" :text="item.text" :underline="true" size="small" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { RplTextLink } from '@dpc-sdp/ripple-link'
import RplIcon from '@dpc-sdp/ripple-icon'

export default {
  name: 'RplWhatsNext',
  props: {
    title: String,
    links: Array
  },
  components: {
    RplTextLink,
    RplIcon
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-whats-next-max-width-s: rem(583px);
  $rpl-whats-next-background: transparent;
  $rpl-whats-next-border-radius: rem(4px);
  $rpl-whats-next-title-ruleset: ('l', 1.2em, 'bold');
  $rpl-whats-next-title-color: rpl_color('extra_dark_neutral');
  $rpl-whats-next-items-margin: $rpl-space-2 auto;
  $rpl-whats-next-item-margin: auto auto $rpl-space-3;

  .rpl-whats-next {
    padding-top: $rpl-space-4;
    background: $rpl-whats-next-background;
    position: relative;

    @include rpl_breakpoint('l') {
      border-radius: $rpl-whats-next-border-radius;
    }

    @media print {
      display: none;
    }

    &__row {
      @include rpl_breakpoint('s') {
        max-width: $rpl-whats-next-max-width-s;
        margin: 0 auto;
      }

      @include rpl_breakpoint('l') {
        max-width: none;
      }
    }

    &__title {
      @include rpl_typography_ruleset($rpl-whats-next-title-ruleset);
      @include rpl_text_color($rpl-whats-next-title-color);
      margin: 0;
    }

    &__items {
      width: 100%;
      list-style: none;
      padding: 0;
      margin: $rpl-whats-next-items-margin;

      @include rpl_breakpoint('s') {
        column-count: 2;
      }

      @include rpl_breakpoint('l') {
        column-count: 1;
      }
    }

    &__item {
      margin: $rpl-whats-next-item-margin;
    }
  }
</style>
