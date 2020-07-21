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

export default {
  name: 'RplWhatsNext',
  props: {
    title: String,
    links: Array
  },
  components: {
    RplTextLink
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-whats-next-background: transparent !default;
  $rpl-whats-next-border-radius: rem(4px);
  $rpl-whats-next-title-ruleset: ('l', 1.2em, 'bold');
  $rpl-whats-next-title-color: rpl_color('extra_dark_neutral') !default;
  $rpl-whats-next-items-margin: $rpl-space-2 auto;
  $rpl-whats-next-item-min-width: rem(220px);
  $rpl-whats-next-item-margin: 0 $rpl-space-3 $rpl-space-3 auto;

  .rpl-whats-next {
    padding-top: $rpl-space-4;
    background: $rpl-whats-next-background;
    position: relative;

    @include rpl_breakpoint('l') {
      border-radius: $rpl-whats-next-border-radius;
    }

    @include rpl_print_hidden;

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
      display: flex;
      flex-wrap: wrap;
    }

    &__item {
      margin: $rpl-whats-next-item-margin;
      flex: 40%;
      min-width: $rpl-whats-next-item-min-width;
    }
  }
</style>
