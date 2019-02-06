<template>
  <div class="rpl-related-links">
    <rpl-icon class="rpl-related-links__icon" symbol="link_65" color="white"></rpl-icon>
    <div class="rpl-related-links__row">
      <h2 class="rpl-related-links__title">{{ title }}</h2>
    </div>
    <div class="rpl-related-links__row">
      <ul class="rpl-related-links__items" v-if="links">
        <li class="rpl-related-links__item" v-for="(item, index) of links" :key="index">
          <rpl-text-link :url="item.url" icon-color="white" :text="item.text" :underline="true" size="small" theme="dark" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { RplTextLink } from '@dpc-sdp/ripple-link'
import RplIcon from '@dpc-sdp/ripple-icon'

export default {
  name: 'RplRelatedLinks',
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

  $rpl-related-links-max-width-s: rem(583px);
  $rpl-related-links-background-color: rpl_color('primary') !default;
  $rpl-related-links-background-image: url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2246%22%20viewBox%3D%220%200%2040%2046%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M0%200L17.3374%2038.3827L40%2045.3584V0H0Z%22%20fill%3D%22%23#{str-slice(quote(rpl_color("secondary")), 2)}%22%2F%3E%3C%2Fsvg%3E') !default;
  $rpl-related-links-background-position: top right !default;
  $rpl-related-links-background-repeat: no-repeat !default;
  $rpl-related-links-padding-xs: ($rpl-space * 7) $rpl-component-padding-xs;
  $rpl-related-links-padding-s: ($rpl-space * 7) $rpl-component-padding-s;
  $rpl-related-links-padding: ($rpl-space * 7) ($rpl-space * 6);
  $rpl-related-links-margin: $rpl-space-2;
  $rpl-related-links-border-radius: rem(4px);
  $rpl-related-links-title-ruleset: ('l', 1.2em, 'bold');
  $rpl-related-links-title-color: rpl_color('white');
  $rpl-related-links-items-margin: $rpl-space-2 auto;
  $rpl-related-links-item-margin: auto auto $rpl-space-3;

  .rpl-related-links {
    padding: $rpl-related-links-padding;
    background-color: $rpl-related-links-background-color;
    background-image: $rpl-related-links-background-image;
    background-position: $rpl-related-links-background-position;
    background-repeat: $rpl-related-links-background-repeat;
    position: relative;
    border-radius: $rpl-related-links-border-radius;

    &__row {
      @include rpl_breakpoint('s') {
        max-width: $rpl-related-links-max-width-s;
        margin: 0 auto;
      }

      @include rpl_breakpoint('l') {
        max-width: none;
      }
    }

    &__icon {
      position: absolute;
      top: 0;
      right: 0;
      margin: $rpl-related-links-margin;
    }

    &__title {
      @include rpl_typography_ruleset($rpl-related-links-title-ruleset);
      margin: 0;
      color: $rpl-related-links-title-color;
    }

    &__items {
      width: 100%;
      list-style: none;
      padding: 0;
      margin: $rpl-related-links-items-margin;

      @include rpl_breakpoint('s') {
        column-count: 2;
      }

      @include rpl_breakpoint('l') {
        column-count: 1;
      }
    }

    &__item {
      margin: $rpl-related-links-item-margin;
    }
  }
</style>
