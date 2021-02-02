<template>
  <div class="rpl-breadcrumbs">
    <div class="rpl-breadcrumbs__row">
      <nav aria-label="breadcrumbs">
        <ul class="rpl-breadcrumbs__items" v-if="crumbs">
          <li class="rpl-breadcrumbs__item" v-for="(item, index) of crumbs" :key="index">
            <span class="rpl-breadcrumbs__text" v-if="index == crumbs.length - 1">{{ item.text }}</span>
            <rpl-link class="rpl-breadcrumbs__link" v-else :href="item.url">{{ item.text }}</rpl-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import RplLink from '@dpc-sdp/ripple-link'

export default {
  name: 'RplBreadcrumbs',
  props: {
    crumbs: Array
  },
  components: {
    RplLink
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-breadcrumbs-background: rpl-color('white') !default;
  $rpl-breadcrumbs-border: 1px solid rpl-color('mid_neutral_1') !default;
  $rpl-breadcrumbs-border-radius: rem(4px) !default;
  $rpl-breadcrumbs-padding: ($rpl-space-3) ($rpl-space * 5) !default;
  $rpl-breadcrumbs-link-ruleset: ('xs', 1.4em, 'medium') !default;
  $rpl-breadcrumbs-link-color: mix(rpl_color('primary'), rpl_color('white'), 93%) !default;
  $rpl-breadcrumbs-text-ruleset: ('xs', 1.4em, 'regular') !default;
  $rpl-breadcrumbs-text-color: rpl-color('extra_dark_neutral') !default;
  $rpl-breadcrumbs-separator-color: rpl-color('dark_neutral') !default;
  $rpl-breadcrumbs-separator-padding: 0 ($rpl-space-2) 0 ($rpl-space) !default;
  $rpl-breadcrumbs-items-margin: 0 !default;

  .rpl-breadcrumbs {
    display: none;

    @include rpl_breakpoint('s') {
      display: block;
    }

    @include rpl_print_hidden;

    &__items {
      display: inline-block;
      list-style: none;
      background: $rpl-breadcrumbs-background;
      border: $rpl-breadcrumbs-border;
      border-radius: $rpl-breadcrumbs-border-radius;
      padding: $rpl-breadcrumbs-padding;
      margin: $rpl-breadcrumbs-items-margin;
      @include rpl_dropshadow;
    }

    &__item {
      display: inline-block;
      @include rpl_typography_ruleset($rpl-breadcrumbs-text-ruleset);
      &:after {
        content: ' > ';
        padding: $rpl-breadcrumbs-separator-padding;
        color: $rpl-breadcrumbs-separator-color;
      }
      &:last-child:after {
        content: '';
        padding: 0;
      }
    }

    &__link {
      @include rpl_typography_ruleset($rpl-breadcrumbs-link-ruleset);
      color: $rpl-breadcrumbs-link-color;
    }
  }
</style>
