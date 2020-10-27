<template>
  <rpl-link v-if="link" class="rpl-card-navigation" :href="link.url" :innerWrap="false">
    <div v-if="image" class="rpl-card-navigation__image-wrapper">
      <rpl-responsive-img class="rpl-card-navigation__image" v-bind="computedImg" alt="" :srcSet="srcSet" />
    </div>
    <div class="rpl-card-navigation__details">
      <div v-if="date || tag" class="rpl-card-navigation__meta">
        <div v-if="tag" class="rpl-card-navigation__tag" >{{ tag }}</div>
        <div v-if="status" class="rpl-card-navigation__status" :class="`rpl-card-navigation__status--${this.status.toLowerCase()}`">
          <rpl-icon v-if="statusIcon" class="rpl-card-navigation__status-icon" :symbol="statusIcon.symbol" :color="statusIcon.color" size="s" />
          <span>{{ status }}</span>
        </div>
        <div v-if="date" class="rpl-card-navigation__date">{{ formatDate(date, 'DD MMMM YYYY') }}</div>
      </div>
      <h2 v-if="title" class="rpl-card-navigation__title">{{ title }}</h2>
      <p v-if="summary" class="rpl-card-navigation__summary">{{ summary }}</p>
      <p v-if="author" class="rpl-card-navigation__author"><strong>Author:</strong> {{ author }}</p>
    </div>
  </rpl-link>
</template>

<script>
import RplLink from '@dpc-sdp/ripple-link'
import RplResponsiveImg from '@dpc-sdp/ripple-responsive-img'
import formatdate from '@dpc-sdp/ripple-global/mixins/formatdate'
import statusIcon from '@dpc-sdp/ripple-card/mixins/status-icon'

export default {
  name: 'RplCardNavigationV2',
  mixins: [formatdate, statusIcon],
  components: {
    RplLink,
    RplResponsiveImg
  },
  props: {
    title: String,
    image: [String, Object],
    summary: String,
    link: Object,
    tag: String,
    date: String,
    author: String,
    status: String
  },
  data () {
    return {
      srcSet: [
        { size: 'xs', height: 534, width: 764 },
        { size: 's', height: 200, width: 764 },
        { size: 'm', height: 232, width: 448 },
        { size: 'l', height: 232, width: 333 }
      ]
    }
  },
  computed: {
    computedImg () {
      return typeof this.image === 'string' ? { src: this.image } : this.image
    },
    statusIcon () {
      return this.getStatusIcon(this.status)
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";
@import "scss/card";

$rpl-card-navigation-background: rpl_color('white') !default;
$rpl-card-navigation-border-color: rpl_color('mid_neutral_1') !default;
$rpl-card-navigation-border: 1px solid $rpl-card-navigation-border-color !default;
$rpl-card-navigation-border-radius: rem(4px) !default;
$rpl-card-navigation-details-padding-xs: $rpl-card-vertical-padding $rpl-component-padding-xs !default;
$rpl-card-navigation-details-padding-s: $rpl-card-vertical-padding $rpl-component-padding-s !default;
$rpl-card-navigation-details-padding-m: $rpl-card-vertical-padding $rpl-card-horizontal-padding-m !default;
$rpl-card-navigation-details-width-xxxl: rem(435px) !default;
$rpl-card-navigation-inline-padding-m: ($rpl-space * 8) ($rpl-space * 8) !default;
$rpl-card-navigation-title-ruleset:  ('l', 1.2em, 'bold') !default;
$rpl-card-navigation-title-color: rpl_color('extra_dark_neutral') !default;
$rpl-card-navigation-title-hover-color: rpl_color('primary') !default;
$rpl-card-navigation-title-text-decoration: underline !default;
$rpl-card-navigation-title-margin: 0 0 rem(12px) !default;
$rpl-card-navigation-summary-ruleset: ('xs', 1.5em, 'regular') !default;
$rpl-card-navigation-summary-color: rpl_color('extra_dark_neutral') !default;
$rpl-card-navigation-link-color-hover: rpl_color('primary') !default;
$rpl-card-navigation-no-image-padding: (rem(56px) - $rpl-card-vertical-padding) 0 0 0 !default;
$rpl-card-navigation-tag-color: rpl_color('extra_dark_neutral') !default;
$rpl-card-navigation-tag-background-color: rpl_color('mid_neutral_2') !default;
$rpl-card-navigation-tag-padding: $rpl-space $rpl-space-2 !default;
$rpl-card-navigation-meta-margin: 0 0 $rpl-space-3 0 !default;
$rpl-card-navigation-meta-ruleset: ('xs', 1em, 'medium') !default;
$rpl-card-navigation-date-text-color: rpl_color('dark_neutral') !default;
$rpl-card-navigation-date-padding: $rpl-space $rpl-space-2 !default;
$rpl-card-navigation-img-height: (
  'xs': rem(300px),
  'm': rem(200px),
  'l': rem(232px),
  'xl': rem(200px)
) !default;
$rpl-card-navigation-img-wrapper-padding-xs: $rpl-component-padding-xs $rpl-component-padding-xs 0 !default;
$rpl-card-navigation-img-wrapper-padding-m: 0 rem(25px) 0 0 !default;
$rpl-card-navigation-author-font-size: rem(14px) !default;

.rpl-card-navigation {
  $root: &;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  background-color: $rpl-card-navigation-background;
  border: $rpl-card-navigation-border;
  border-radius: $rpl-card-navigation-border-radius;
  @include rpl_breakpoint('m') {
    flex-wrap: nowrap;
    padding: $rpl-card-navigation-inline-padding-m;
  }

  &:hover,
  &:focus {
    @include rpl_dropshadow;

    &.rpl-link {
      text-decoration: none;
    }

    #{$root}__link {
      color: $rpl-card-navigation-link-color-hover;
    }

    #{$root}__title {
      color:  $rpl-card-navigation-title-hover-color;
      text-decoration: $rpl-card-navigation-title-text-decoration;
    }
  }

  &__image-wrapper {
    width: 100%;
    padding: $rpl-card-navigation-img-wrapper-padding-xs;
    @include rpl_breakpoint('m') {
      padding: $rpl-card-navigation-img-wrapper-padding-m;
      width: 40%;
      max-width: rem(280px);
    }
    @include rpl_breakpoint('l') {
      max-width: rem(153px);
    }
    @include rpl_breakpoint('xxl') {
      max-width: rem(213px);
    }
    @include rpl_breakpoint('xxxl') {
      max-width: rem(294px);
    }
  }

  &__image {
    width: 100%;
    display: table;
    @include rpl_breakpoint('s') {
      border-radius: $rpl-card-navigation-border-radius;
    }
  }

  &__title {
    @include rpl_typography_ruleset($rpl-card-navigation-title-ruleset);
    color: $rpl-card-navigation-title-color;
    margin: $rpl-card-navigation-title-margin;
  }

  &__status {
    display: inline-flex;
    align-items: center;
    padding-left: $rpl-space;
    span {
      @include rpl_typography_ruleset($rpl-card-navigation-meta-ruleset);
      padding-left: $rpl-space;
      color: rpl_color('dark_neutral');
      text-transform: uppercase;
      padding-left: $rpl-space-4;
    }
    &-icon {
      position: absolute;
    }
  }

  &__summary {
    @include rpl_typography_ruleset($rpl-card-navigation-summary-ruleset);
    margin: 0;
  }

  &__author {
    font-size: $rpl-card-navigation-author-font-size;
    margin-bottom: 0;
  }

  &__details {
    color: $rpl-card-navigation-summary-color;
    width: 100%;
    box-sizing: border-box;
    padding: $rpl-card-navigation-details-padding-xs;

    @include rpl_breakpoint('s') {
      padding: $rpl-card-navigation-details-padding-s;
    }
    @include rpl_breakpoint('m') {
      padding: 0;
      width: 60%;
    }
  }

  &__meta {
    margin: $rpl-card-navigation-meta-margin;
  }

  &__date,
  &__tag {
    @include rpl_typography_ruleset($rpl-card-navigation-meta-ruleset);
    display: inline;
  }

  &__tag {
    color: $rpl-card-navigation-tag-color;
    background-color: $rpl-card-navigation-tag-background-color;
    padding: $rpl-card-navigation-tag-padding;
  }

  &__date {
    color: $rpl-card-navigation-date-text-color;
    text-transform: uppercase;
    padding: $rpl-card-navigation-date-padding;
  }
}
</style>
