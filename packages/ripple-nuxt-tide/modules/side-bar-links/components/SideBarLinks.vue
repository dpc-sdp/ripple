<template>
  <div :class="['side-bar-links', sideBarStyle]">
    <div class="side-bar-links__row">
      <h2 class="side-bar-links__title">{{ title }}</h2>
    </div>
    <div class="side-bar-links__row">
      <ul class="side-bar-links__items" v-if="links">
        <li class="side-bar-links__item" v-for="(item, index) of links" :key="index">
          <rpl-text-link :url="item.url" :icon-color="iconColour" :text="item.text" :underline="true" size="small" />
          <div class="side-bar-links__description">{{ item.desc }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { RplTextLink } from '@dpc-sdp/ripple-link'
import { stringToClass } from '@dpc-sdp/ripple-nuxt-tide/lib/core/tide-helper.js'

export default {
  name: 'SideBarLinks',
  props: {
    title: String,
    bgColour: String,
    links: Array
  },
  components: {
    RplTextLink
  },
  computed: {
    sideBarStyle () {
      return (this.bgColour) ? `side-bar-links--${stringToClass(this.bgColour)}` : ''
    },
    iconColour () {
      const style = stringToClass(this.bgColour)
      if (style === 'primary-colour') {
        return 'white'
      }
      return 'primary'
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $side-bar-links-background-position: top right !default;
  $side-bar-links-background-repeat: no-repeat !default;
  $side-bar-links-padding-xs: ($rpl-space * 7) $rpl-component-padding-xs;
  $side-bar-links-padding-s: ($rpl-space * 7) $rpl-component-padding-s;
  $side-bar-links-padding: ($rpl-space * 7) ($rpl-space * 6);
  $side-bar-links-margin: $rpl-space-2;
  $side-bar-links-border-radius: rem(4px);
  $side-bar-links-title-ruleset: ('l', 1.2em, 'bold');
  $side-bar-links-title-color: rpl_color('secondary') !default;
  $side-bar-links-items-margin: $rpl-space-2 auto;
  $side-bar-links-item-min-width: rem(220px);
  $side-bar-links-item-margin: 0 $rpl-space-3 $rpl-space-3 auto;

  .side-bar-links {
    padding: $side-bar-links-padding;
    background-position: $side-bar-links-background-position;
    background-repeat: $side-bar-links-background-repeat;
    position: relative;
    border-radius: $side-bar-links-border-radius;

    @include rpl_print_hidden;

    &__icon {
      position: absolute;
      top: 0;
      right: 0;
      margin: $side-bar-links-margin;
    }

    &__title {
      @include rpl_typography_ruleset($side-bar-links-title-ruleset);
      margin: 0;
      color: $side-bar-links-title-color;
    }

    &__items {
      width: 100%;
      list-style: none;
      padding: 0;
      margin: $side-bar-links-items-margin;
      display: flex;
      flex-wrap: wrap;
    }

    &__item {
      margin: $side-bar-links-item-margin;
      flex: 40%;
      min-width: $side-bar-links-item-min-width;
    }

    &__description {
      // Keep in sync with $rpl-text-link-small-typography (RplTextLabel).
      @include rpl_typography_ruleset(('xs', 1.7em, 'medium'));
      margin-top: $rpl-space-2;
    }

    // Side bar custom styles via config.
    &--primary-colour {
      background-color: rpl-color('primary');
      color: rpl-color('white');
      .side-bar-links__title {
        color: rpl-color('white');
      }

      .rpl-link {
        .rpl-text-label {
          color: rpl-color('white');

          &:hover {
            color: rpl-color('secondary');
          }
        }
        &:focus, &:focus-visible, &:active {
          .rpl-text-label {
            color: rpl-color('secondary');
          }
        }
      }
    }

    &--grey {
      background-color: rpl-color('mid_neutral_2');
      .side-bar-links__description {
        color: rpl-color('extra_dark_neutral');
      }

      .rpl-link {
        .rpl-text-label {
          color: rpl-color('primary');

          &--small--underline {
            border-bottom-color: rpl-color('mid_neutral_1');
          }
        }
        &:hover, &:focus, &:focus-visible {
          .rpl-text-label {
             &--small--underline {
              border-bottom-color: rpl-color('primary');
            }
          }
        }
      }
    }

    &--white {
      background-color: rpl-color('white');
      .side-bar-links__description {
        color: rpl-color('dark_neutral');
      }

      .rpl-link {
        .rpl-text-label {
          color: rpl-color('dark_primary');

          &--small--underline {
            border-bottom-color: rpl-color('mid_neutral_1');
          }
        }
        &:hover, &:focus, &:focus-visible {
          .rpl-text-label {
            &--small--underline {
              border-bottom-color: rpl-color('primary');
            }
          }
        }
      }
    }
  }
</style>
