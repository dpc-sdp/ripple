<template>
  <rpl-link
    class="rpl-card-promotion"
    :href="link.url"
    :class="{
      'rpl-card-promotion--no-image': !image
    }"
  >
    <div class="rpl-card-promotion__image-wrapper">
      <img class="rpl-card-promotion__image" v-if="image" :src="image" alt="" />
    </div>
    <div class="rpl-card-promotion__details">
      <div class="rpl-card-promotion__meta" v-if="date || tags">
        <div class="rpl-card-promotion__date" v-if="date">{{ formattedDate }}</div>
        <div class="rpl-card-promotion__tag" v-for="(tag, index) in tags" :key="index">{{ tag }}</div>
      </div>
      <h2 class="rpl-card-promotion__title" v-if="title">{{ title }}</h2>
      <p class="rpl-card-promotion__summary" v-if="summary">{{ summary }}</p>
    </div>
    <div class="rpl-card-promotion__link" v-if="link">
      <span v-if="linkTextWordCount > 1">{{ linkTextWithoutLastWord }}</span>
      <span v-if="linkTextWordCount > 1" class="rpl-card-promotion__text-link-group">{{ linkTextLastWord }} <rpl-icon symbol="arrow_right_primary_s" color="primary" size="m" /></span>
      <span v-if="linkTextWordCount <= 1" class="rpl-card-promotion__text-link-group">{{ link.text }} <rpl-icon symbol="arrow_right_primary_s" color="primary" size="m" /></span>
    </div>
  </rpl-link>
</template>

<script>
import moment from 'moment'
import RplLink from '@dpc-sdp/ripple-link'
import RplIcon from '@dpc-sdp/ripple-icon'

export default {
  name: 'RplCardPromotion',
  props: {
    image: String,
    date: String,
    tags: Array,
    title: String,
    summary: String,
    link: Object,
    locale: { default: 'en-au', type: String }
  },
  components: {
    RplLink,
    RplIcon
  },
  computed: {
    formattedDate: function () {
      moment.locale(this.locale)
      return moment(this.date).format('DD MMMM')
    },
    linkTextWordCount: function () {
      return this.link.text.length > 0 ? this.link.text.match(/[\w\d]+/gi).length : 0
    },
    linkTextWithoutLastWord: function () {
      return this.link.text.substr(0, this.link.text.lastIndexOf(' '))
    },
    linkTextLastWord: function () {
      return this.link.text.substr(this.link.text.lastIndexOf(' '))
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";
  @import "scss/card";

  $rpl-card-promotion-border-color: rpl_color('mid_neutral_1') !default;
  $rpl-card-promotion-border: 1px solid $rpl-card-promotion-border-color !default;
  $rpl-card-promotion-background: rpl_color('white') !default;
  $rpl-card-promotion-border-radius: rem(4px) !default;
  $rpl-card-promotion-icon-after-margin: auto auto auto $rpl-space-2 !default;
  $rpl-card-promotion-no-image-padding: (rem(56px) - $rpl-card-vertical-padding) 0 0 0 !default;
  $rpl-card-promotion-no-image-background-image: rpl_gradient('decorative_gradient') !default;
  $rpl-card-promotion-details-padding-xs: $rpl-card-vertical-padding $rpl-component-padding-xs 0 !default;
  $rpl-card-promotion-details-padding-s: $rpl-card-vertical-padding $rpl-component-padding-s 0 !default;
  $rpl-card-promotion-details-padding-m: $rpl-card-vertical-padding $rpl-card-horizontal-padding-m 0 !default;
  $rpl-card-promotion-meta-margin: 0 0 $rpl-space-3 0 !default;
  $rpl-card-promotion-date-ruleset: ('xs', 1em, 'medium') !default;
  $rpl-card-promotion-date-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-promotion-date-background-color: rpl_color('light_neutral') !default;
  $rpl-card-promotion-date-padding: $rpl-space $rpl-space-2 !default;
  $rpl-card-promotion-tag-ruleset: ('xxs', 1em, 'medium') !default;
  $rpl-card-promotion-tag-text-color: mix(rpl_color('dark_neutral'), rpl_color('white'), 93%) !default;
  $rpl-card-promotion-tag-margin: 0 0 0 $rpl-space-2 !default;
  $rpl-card-promotion-title-ruleset: ('l', 1.2em, 'bold') !default;
  $rpl-card-promotion-title-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-promotion-title-margin: 0 0 $rpl-space-3 0 !default;
  $rpl-card-promotion-summary-ruleset: ('xs', 1.4em, 'regular') !default;
  $rpl-card-promotion-summary-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-promotion-link-ruleset: ('xs', 1em, 'semibold') !default;
  $rpl-card-promotion-link-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-promotion-link-color-hover: rpl_color('primary') !default;
  $rpl-card-promotion-link-padding-xs: $rpl-space-3 $rpl-component-padding-xs !default;
  $rpl-card-promotion-link-padding-s: $rpl-space-3 $rpl-component-padding-s !default;
  $rpl-card-promotion-link-padding-m: $rpl-space-3 $rpl-card-horizontal-padding-m !default;
  $rpl-card-promotion-link-line-space-xs: $rpl-component-padding-xs !default;
  $rpl-card-promotion-link-line-space-s: $rpl-component-padding-s !default;
  $rpl-card-promotion-link-line-space-m: $rpl-card-horizontal-padding-m !default;

  .rpl-card-promotion {
    $root: &;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    border-bottom: $rpl-card-promotion-border;
    background-color: $rpl-card-promotion-background;

    @include rpl_breakpoint('m') {
      border-radius: $rpl-card-promotion-border-radius;
      border: $rpl-card-promotion-border;
    }

    &:hover,
    &:focus {
      @include rpl_dropshadow;

      &.rpl-link {
        text-decoration: none;
      }

      #{$root}__link {
        color: $rpl-card-promotion-link-color-hover;
      }
    }

    &--no-image {
      padding: $rpl-card-promotion-no-image-padding;
      &:before {
        content: '';
        position: absolute;
        background-image: $rpl-card-promotion-no-image-background-image;
        top: 0;
        left: 0;
        right: 0;
        height: rem(8px);
      }
    }

    &__image-wrapper {
      width: 100%;
    }

    &__image {
      width: 100%;
      display: table;
    }

    &__details {
      padding: $rpl-card-promotion-details-padding-xs;
      @include rpl_breakpoint('s') {
        padding: $rpl-card-promotion-details-padding-s;
      }
      @include rpl_breakpoint('m') {
        padding: $rpl-card-promotion-details-padding-m;
      }
    }

    &__meta {
      margin: $rpl-card-promotion-meta-margin;
    }

    &__date {
      @include rpl_typography_ruleset($rpl-card-promotion-date-ruleset);
      display: inline;
      color: $rpl-card-promotion-date-color;
      background-color: $rpl-card-promotion-date-background-color;
      padding: $rpl-card-promotion-date-padding;
    }

    &__tag {
      @include rpl_typography_ruleset($rpl-card-promotion-tag-ruleset);
      display: inline;
      color: $rpl-card-promotion-tag-text-color;
      text-transform: uppercase;
      margin: $rpl-card-promotion-tag-margin;
    }

    &__title {
      @include rpl_typography_ruleset($rpl-card-promotion-title-ruleset);
      color: $rpl-card-promotion-title-text-color;
      margin: $rpl-card-promotion-title-margin;
    }

    &__summary {
      @include rpl_typography_ruleset($rpl-card-promotion-summary-ruleset);
      color: $rpl-card-promotion-summary-text-color;
    }

    &__link {
      @include rpl_typography_ruleset($rpl-card-promotion-link-ruleset);
      color: $rpl-card-promotion-link-color;
      padding: $rpl-card-promotion-link-padding-xs;
      align-self: flex-end;
      display: block;
      position: relative;
      width: 100%;
      @include rpl_breakpoint('s') {
        padding: $rpl-card-promotion-link-padding-s;
      }
      @include rpl_breakpoint('m') {
        padding: $rpl-card-promotion-link-padding-m;
      }

      &::before {
        content: '';
        background-color: $rpl-card-promotion-border-color;
        height: 1px;
        display: block;
        position: absolute;
        top: 0;
        left: $rpl-card-promotion-link-line-space-xs;
        right: $rpl-card-promotion-link-line-space-xs;
        @include rpl_breakpoint('s') {
          left: $rpl-card-promotion-link-line-space-s;
          right: $rpl-card-promotion-link-line-space-s;
        }
        @include rpl_breakpoint('m') {
          left: $rpl-card-promotion-link-line-space-m;
          right: $rpl-card-promotion-link-line-space-m;
        }
      }

      .rpl-icon {
        margin: $rpl-card-promotion-icon-after-margin;
        vertical-align: middle;
      }
    }

    &__text-link-group {
      white-space: nowrap;
    }
  }
</style>
