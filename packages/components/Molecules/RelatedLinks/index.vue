<template>
  <div class="rpl-related-links">
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

export default {
  name: 'RplRelatedLinks',
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

  $rpl-related-links-background-color: rpl_color('primary') !default;
  $rpl-related-links-background-position: top right !default;
  $rpl-related-links-background-repeat: no-repeat !default;
  $rpl-related-links-padding-xs: ($rpl-space * 7) $rpl-component-padding-xs;
  $rpl-related-links-padding-s: ($rpl-space * 7) $rpl-component-padding-s;
  $rpl-related-links-padding: ($rpl-space * 7) ($rpl-space * 6);
  $rpl-related-links-margin: $rpl-space-2;
  $rpl-related-links-border-radius: var(--rpl-theme-border-radius, rem(4px));
  $rpl-related-links-title-ruleset: ('l', 1.2em, 'bold');
  $rpl-related-links-title-color: rpl_color('white') !default;
  $rpl-related-links-items-margin: $rpl-space-2 auto;
  $rpl-related-links-item-min-width: rem(220px);
  $rpl-related-links-item-margin: 0 $rpl-space-3 $rpl-space-3 auto;

  .rpl-related-links {
    padding: $rpl-related-links-padding;
    background-color: $rpl-related-links-background-color;
    background-position: $rpl-related-links-background-position;
    background-repeat: $rpl-related-links-background-repeat;
    position: relative;
    border-radius: $rpl-related-links-border-radius;

    @include rpl_print_hidden;

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
      display: flex;
      flex-wrap: wrap;
    }

    &__item {
      margin: $rpl-related-links-item-margin;
      flex: 40%;
      min-width: $rpl-related-links-item-min-width;
    }
  }
</style>
