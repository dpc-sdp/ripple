<template>
  <div class="rpl-breadcrumbs">
    <div class="rpl-breadcrumbs__row">
      <nav aria-label="breadcrumbs">
        <ul class="rpl-breadcrumbs__items" v-if="crumbs">
          <!-- Mobile item -->
          <li
            class="rpl-breadcrumbs__item--mobile"
          >
            <rpl-link
              class="rpl-breadcrumbs__link"
              :href="mobileCrumbUrl"
            >
              <rpl-icon symbol="arrow_down_tertiary" size="m"></rpl-icon>
              <span class="rpl-visually-hidden">Return to {{ mobileCrumbTextLong }}</span>
              <span aria-hidden="true">{{ mobileCrumbTextShort }}</span>
            </rpl-link>
          </li>

          <!-- Desktop items -->
          <li
            class="rpl-breadcrumbs__item--desktop"
            v-for="(item, index) of crumbs"
            :key="index"
          >
            <span
              class="rpl-breadcrumbs__text"
              v-if="index == crumbs.length - 1"
            >
              {{ item.text }}
            </span>

            <rpl-link
              class="rpl-breadcrumbs__link"
              v-else
              :href="item.url"
            >
              {{ item.text }}
            </rpl-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import RplLink from '@dpc-sdp/ripple-link'
import RplIcon from '@dpc-sdp/ripple-icon'

export default {
  name: 'RplBreadcrumbs',
  props: {
    crumbs: Array
  },
  components: {
    RplLink,
    RplIcon
  },
  computed: {
    mobileCrumbTextLong () {
      const parentText = this.crumbs[this.crumbs.length - 2]?.text

      return parentText || 'Home'
    },
    mobileCrumbTextShort () {
      let parentText = this.mobileCrumbTextLong

      // Truncate the mobile breadcrumb text if it is longer than 25 characters.
      if (parentText?.length > 25) {
        parentText = parentText.substring(0, 25) + '...'
      }

      return parentText
    },
    mobileCrumbUrl () {
      const parentUrl = this.crumbs[this.crumbs.length - 2]?.url

      return parentUrl || '/'
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-breadcrumbs-background: rpl-color('white') !default;
  $rpl-breadcrumbs-border: 1px solid rpl-color('mid_neutral_1') !default;
  $rpl-breadcrumbs-border-radius: rem(4px) !default;
  $rpl-breadcrumbs-padding-mobile: ($rpl-space-3) ($rpl-space * 4) !default;
  $rpl-breadcrumbs-padding: ($rpl-space-3) ($rpl-space * 5) !default;
  $rpl-breadcrumbs-link-ruleset: ('xs', 1.4em, 'medium') !default;
  $rpl-breadcrumbs-link-color: mix(rpl_color('primary'), rpl_color('white'), 93%) !default;
  $rpl-breadcrumbs-text-ruleset: ('xs', 1.4em, 'regular') !default;
  $rpl-breadcrumbs-text-color: rpl-color('extra_dark_neutral') !default;
  $rpl-breadcrumbs-separator-color: rpl-color('dark_neutral') !default;
  $rpl-breadcrumbs-separator-padding: 0 ($rpl-space-2) 0 ($rpl-space) !default;
  $rpl-breadcrumbs-items-margin: 0 !default;

  .rpl-breadcrumbs {
    @include rpl_print_hidden;

    &__items {
      display: inline-block;
      list-style: none;
      background: $rpl-breadcrumbs-background;
      border: $rpl-breadcrumbs-border;
      border-radius: $rpl-breadcrumbs-border-radius;
      padding: $rpl-breadcrumbs-padding-mobile;
      margin: $rpl-breadcrumbs-items-margin;
      @include rpl_dropshadow;

      @include rpl_breakpoint('s') {
        padding: $rpl-breadcrumbs-padding;
      }
    }

    // Mobile item
    // 1. The designs use 'down' arrow rotated 90 degrees. Note this
    // icon is visually different after rotation to the 'left' icon.
    &__item--mobile {
      @include rpl_breakpoint('s') {
        display: none;
      }

      .rpl-link__inner {
        display: flex;
        align-items: center;
      }

      svg {
        fill: currentColor;
        margin-right: rem(5px);
        transform: rotate(90deg) scale(0.8); // [1]
      }
    }

    // Desktop items
    &__item--desktop {
      display: none;
      @include rpl_typography_ruleset($rpl-breadcrumbs-text-ruleset);

      @include rpl_breakpoint('s') {
        display: inline-block;
      }

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
