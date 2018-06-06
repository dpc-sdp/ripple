<template>
  <rpl-link
    class="rpl-card-keydates"
    :href="link.url"
  >
    <div class="rpl-card-keydates__details">
      <h2 class="rpl-card-keydates__title" v-if="title">{{ title }}</h2>
      <div class="rpl-card-keydates__keydate" v-for="(keydate, index) in keydates" :key="index">
        <div class="rpl-card-keydates__keydate-date">
          <rpl-icon symbol="calendar" color="white" />
          <span>{{ formatDate(keydate.date) }}</span>
        </div>
        <h3 class="rpl-card-keydates__keydate-title">{{ keydate.title }}</h3>
        <p class="rpl-card-keydates__keydate-description">{{ keydate.description }}</p>
      </div>
    </div>
    <div class="rpl-card-keydates__link" v-if="link">
      <span v-if="linkTextWordCount > 1">{{ linkTextWithoutLastWord }}</span>
      <span v-if="linkTextWordCount > 1" class="rpl-card-keydates__text-link-group">{{ linkTextLastWord }} <rpl-icon symbol="arrow_right_primary_s" color="primary" size="m" /></span>
      <span v-if="linkTextWordCount <= 1" class="rpl-card-keydates__text-link-group">{{ link.text }} <rpl-icon symbol="arrow_right_primary_s" color="primary" size="m" /></span>
    </div>
  </rpl-link>
</template>

<script>
import moment from 'moment'
import RplLink from '@dpc-sdp/ripple-link'
import RplIcon from '@dpc-sdp/ripple-icon'

export default {
  name: 'RplCardKeydates',
  props: {
    title: String,
    keydates: Array,
    link: Object,
    locale: { default: 'en-au', type: String }
  },
  components: {
    RplLink,
    RplIcon
  },
  methods: {
    formatDate: function (date) {
      moment.locale(this.locale)
      return moment(date).format('DD MMMM')
    }
  },
  computed: {
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

  $rpl-card-keydates-padding: ($rpl-space * 5) !default;
  $rpl-card-keydates-border-color: rpl_color('mid_neutral_1') !default;
  $rpl-card-keydates-border: 1px solid $rpl-card-keydates-border-color !default;
  $rpl-card-keydates-background: rpl_color('white') !default;
  $rpl-card-keydates-border-radius: rem(4px) !default;
  $rpl-card-keydates-icon-after-margin: auto auto auto $rpl-space-2 !default;
  $rpl-card-keydates-no-image-padding: (56px - 20px) 0 0 0 !default;
  $rpl-card-keydates-no-image-background-image: rpl_gradient('decorative_gradient') !default;
  $rpl-card-keydates-details-padding-xs: $rpl-card-vertical-padding $rpl-component-padding-xs 0 !default;
  $rpl-card-keydates-details-padding-s: $rpl-card-vertical-padding $rpl-component-padding-s 0 !default;
  $rpl-card-keydates-details-padding-m: $rpl-card-vertical-padding $rpl-card-horizontal-padding-m 0 !default;
  $rpl-card-keydates-title-ruleset: ('l', 1.2em, 'bold') !default;
  $rpl-card-keydates-title-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-keydates-title-margin: 0 0 $rpl-space-3 0 !default;
  $rpl-card-keydates-link-ruleset: ('xs', 1em, 'semibold') !default;
  $rpl-card-keydates-link-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-keydates-link-color-hover: rpl_color('primary') !default;
  $rpl-card-keydates-link-padding-xs: $rpl-space-3 $rpl-component-padding-xs !default;
  $rpl-card-keydates-link-padding-s: $rpl-space-3 $rpl-component-padding-s !default;
  $rpl-card-keydates-link-padding-m: $rpl-space-3 $rpl-card-horizontal-padding-m !default;
  $rpl-card-keydates-link-line-space-xs: $rpl-component-padding-xs !default;
  $rpl-card-keydates-link-line-space-s: $rpl-component-padding-s !default;
  $rpl-card-keydates-link-line-space-m: $rpl-card-horizontal-padding-m !default;
  $rpl-card-keydates-keydate-date-ruleset: ('l', 1em, 'bold') !default;
  $rpl-card-keydates-keydate-date-background: rpl_color('secondary') !default;
  $rpl-card-keydates-keydate-date-text-color: rpl_color('white') !default;
  $rpl-card-keydates-keydate-date-padding: $rpl-space-2 !default;
  $rpl-card-keydates-keydate-date-margin: 0 0 $rpl-space-3 !default;
  $rpl-card-keydates-keydate-date-icon-margin: rem(-2px) auto 0 !default;
  $rpl-card-keydates-keydate-title-ruleset: ('xs', 1.4em, 'bold') !default;
  $rpl-card-keydates-keydate-title-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-keydates-keydate-title-margin: 0 0 $rpl-space-2 !default;
  $rpl-card-keydates-keydate-description-ruleset: ('xs', 1.4em, 'regular') !default;
  $rpl-card-keydates-keydate-description-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-keydates-keydate-description-margin: $rpl-space-2 0 !default;

  .rpl-card-keydates {
    $root: &;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border-bottom: $rpl-card-keydates-border;
    background-color: $rpl-card-keydates-background;
    padding: $rpl-card-keydates-no-image-padding;

    @include rpl_breakpoint('m') {
      border-radius: $rpl-card-keydates-border-radius;
      border: $rpl-card-keydates-border;
    }

    &:hover,
    &:focus {
      @include rpl_dropshadow;

      &.rpl-link {
        text-decoration: none;
      }

      #{$root}__link {
        color: $rpl-card-keydates-link-color-hover;
      }
    }

    &:before {
      content: '';
      position: absolute;
      background-image: $rpl-card-keydates-no-image-background-image;
      top: 0;
      left: 0;
      right: 0;
      height: rem(8px);
    }

    &__details {
      padding: $rpl-card-keydates-details-padding-xs;
      @include rpl_breakpoint('s') {
        padding: $rpl-card-keydates-details-padding-s;
      }
      @include rpl_breakpoint('m') {
        padding: $rpl-card-keydates-details-padding-m;
      }
    }

    &__title {
      @include rpl_typography_ruleset($rpl-card-keydates-title-ruleset);
      color: $rpl-card-keydates-title-text-color;
      margin: $rpl-card-keydates-title-margin;
    }

    &__keydate-date {
      @include rpl_typography_ruleset($rpl-card-keydates-keydate-date-ruleset);
      background: $rpl-card-keydates-keydate-date-background;
      color: $rpl-card-keydates-keydate-date-text-color;
      display: inline-block;
      padding: $rpl-card-keydates-keydate-date-padding;
      margin: $rpl-card-keydates-keydate-date-margin;

      .rpl-icon,
      span {
        vertical-align: middle;
      }

      .rpl-icon {
        margin-top: $rpl-card-keydates-keydate-date-icon-margin;
      }
    }

    &__keydate-title {
      @include rpl_typography_ruleset($rpl-card-keydates-keydate-title-ruleset);
      color: $rpl-card-keydates-keydate-title-text-color;
      margin: $rpl-card-keydates-keydate-title-margin;
    }

    &__keydate-description {
      @include rpl_typography_ruleset($rpl-card-keydates-keydate-description-ruleset);
      color: $rpl-card-keydates-keydate-description-text-color;
      margin: $rpl-card-keydates-keydate-description-margin;
    }

    &__link {
      @include rpl_typography_ruleset($rpl-card-keydates-link-ruleset);
      color: $rpl-card-keydates-link-color;
      padding: $rpl-card-keydates-link-padding-xs;
      align-self: flex-end;
      display: block;
      position: relative;
      width: 100%;
      @include rpl_breakpoint('s') {
        padding: $rpl-card-keydates-link-padding-s;
      }
      @include rpl_breakpoint('m') {
        padding: $rpl-card-keydates-link-padding-m;
      }

      &::before {
        content: '';
        background-color: $rpl-card-keydates-border-color;
        height: 1px;
        display: block;
        position: absolute;
        top: 0;
        left: $rpl-card-keydates-link-line-space-xs;
        right: $rpl-card-keydates-link-line-space-xs;
        @include rpl_breakpoint('s') {
          left: $rpl-card-keydates-link-line-space-s;
          right: $rpl-card-keydates-link-line-space-s;
        }
        @include rpl_breakpoint('m') {
          left: $rpl-card-keydates-link-line-space-m;
          right: $rpl-card-keydates-link-line-space-m;
        }
      }

      .rpl-icon {
        margin: $rpl-card-keydates-icon-after-margin;
        vertical-align: middle;
      }
    }

    &__text-link-group {
      white-space: nowrap;
    }
  }
</style>
