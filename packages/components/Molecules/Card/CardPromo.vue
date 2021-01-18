<template>
  <rpl-link v-if="link" :class="['rpl-card-promo', modifiers]" :href="link.url">
    <slot name="image">
      <rpl-responsive-img v-if="image" class="rpl-card-promo__image" v-bind="image" alt="" :srcSet="[{ size: 'xs', height: 534, width: 764  }, { size: 's', height: 200, width: 764  }, {  size: 'm', height: 232, width: 448 }, {  size: 'l', height: 232, width: 333 }]" />
    </slot>
    <div class="rpl-card-promo__content">
      <div v-if="formattedDate || status || contentTypeTopicLabel || tag" class="rpl-card-promo__meta">
        <slot name="meta">
          <div class="rpl-card-promo__tag" v-if="tag" >{{ tag }}</div>
          <div class="rpl-card-promo__topic-content-type" v-if="contentTypeTopicLabel" >{{ contentTypeTopicLabel }}</div>
          <slot name="status">
            <div class="rpl-card-promo__status" :class="`rpl-card-promo__status--${this.status.toLowerCase()}`" v-if="status" >
              <rpl-icon class="rpl-card-promo__status-icon" :symbol="statusIcon.symbol" :color="statusIcon.color" size="s" />
              <span>{{status}}</span>
            </div>
          </slot>
          <div class="rpl-card-promo__date" v-if="formattedDate">{{ formattedDate }}</div>
        </slot>
      </div>
      <slot name="content">
        <h2 class="rpl-card-promo__title" v-if="title">{{ trimmedTitle }}</h2>
        <p class="rpl-card-promo__summary" v-if="summary" >{{ trimmedSummary }}</p>
      </slot>
      <slot name="footer">
      </slot>
    </div>
  </rpl-link>
</template>

<script>
import formatdate from '@dpc-sdp/ripple-global/mixins/formatdate'
import RplLink from '@dpc-sdp/ripple-link'
import RplResponsiveImg from '@dpc-sdp/ripple-responsive-img'
import RplIcon from '@dpc-sdp/ripple-icon'
import card from '@dpc-sdp/ripple-card/mixins/card'

export default {
  name: 'RplCardPromo',
  mixins: [formatdate, card],
  props: {
    title: {
      type: String,
      required: true
    },
    link: {
      type: Object,
      default () {
        return {}
      }
    },
    summary: {
      type: String,
      default: ''
    },
    image: {
      type: Object,
      default () {
        return {}
      }
    },
    dateStart: {
      type: String,
      default: ''
    },
    dateEnd: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: ''
    },
    contentType: {
      type: String,
      default: ''
    },
    topic: {
      type: String,
      default: ''
    },
    showTopic: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      default: ''
    },
    displayStyle: {
      type: String,
      default: 'noImage',
      validator: val => ['noImage', 'thumbnail', 'profile'].includes(val)
    }
  },
  components: {
    RplResponsiveImg,
    RplIcon,
    RplLink
  },
  computed: {
    modifiers () {
      const prefix = 'rpl-card-promo'
      const modifiers = []
      modifiers.push(`${prefix}--${this.displayStyle.toLowerCase()}`)

      return modifiers
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
  @import "scss/card";
  $rpl-card-promotion-bg-color: $rpl-card-background !default;
  $rpl-card-promo-min-height: rem(400px) !default;
  $rpl-card-promo-meta-margin: 0 0 $rpl-space-3 0 !default;
  $rpl-card-promo-meta-ruleset: $rpl-card-meta-ruleset !default;
  $rpl-card-promo-meta-text-color: $rpl-card-meta-text-color !default;
  $rpl-card-promo-date-padding: $rpl-space $rpl-space-2 !default;
  $rpl-card-promo-topic-bg-color: rpl_color('light_neutral') !default;
  $rpl-card-promo-topic-color: $nav-card-text-color !default;
  $rpl-card-promo-tag-padding: $rpl-space $rpl-space-2;
  $rpl-card-promo-link-color: $nav-card-text-color !default;
  $rpl-card-promo-link-color-hover: $rpl-card-link-hover-color !default;
  $rpl-card-promo-title-ruleset: $rpl-card-title-ruleset !default;
  $rpl-card-promo-title-text-color: $nav-card-text-color !default;
  $rpl-card-promo-title-text-decoration: $rpl-card-title-text-decoration !default;
  $rpl-card-promo-title-margin: 0 0 $rpl-space-3 0 !default;
  $rpl-card-promo-summary-ruleset: $rpl-card-summary-ruleset !default;
  $rpl-card-promo-summary-text-color: $nav-card-text-color !default;
  $rpl-card-promo-content-padding: $rpl-space-4 !default;
  $rpl-card-promo-border-color: $rpl-card-border-color !default;
  $rpl-card-promo-border: 1px solid $rpl-card-promo-border-color !default;
  $rpl-card-promo-border-radius: $rpl-card-border-radius !default;
  $rpl-card-promo-no-image-border: rpl_gradient('decorative_gradient') !default;
  $rpl-card-promo-no-image-border-height: rem(8px) !default;
  $rpl-card-promo-no-image-padding-top: rem(89px) !default;
  $rpl-card-promo-profile-image-margin-top: rem(56px) !default;
  $rpl-card-promo-profile-image-size: rem(148px) !default;
  $rpl-card-promo-img-height: (
    'xs': rem(300px),
    'm': rem(200px),
    'l': rem(232px),
    'xl': rem(200px)
  ) !default;

  .rpl-card-promo {
    $root: &;
    display: flex;
    height: 100%;
    min-height: $rpl-card-promo-min-height;
    flex-direction: column;
    border: $rpl-card-promo-border;
    border-radius: $rpl-card-promo-border-radius;
    background-color: $rpl-card-promotion-bg-color;
    &:hover,
    &:focus {
      @include rpl_dropshadow;

      &.rpl-link {
        text-decoration: none;
      }

      #{$root}__title {
        color: $rpl-card-promo-link-color-hover;
        text-decoration: $rpl-card-promo-title-text-decoration;
      }
    }

    &__image {
      border-radius: $rpl-card-promo-border-radius $rpl-card-promo-border-radius 0 0;
      @each $bp, $height in $rpl-card-promo-img-height {
        @include rpl_breakpoint($bp) {
          height: $height;
        }
      }
    }

    &__meta {
      margin: $rpl-card-promo-meta-margin;
    }

    &__date {
      @include rpl_typography_ruleset($rpl-card-promo-meta-ruleset);
      display: inline;
      color: $rpl-card-promo-meta-text-color;
      text-transform: uppercase;
    }

    &__date {
      padding: $rpl-card-promo-date-padding;
    }

    &__tag {
      @include rpl_typography_ruleset($rpl-card-promo-meta-ruleset);
      display: inline-block;
      color: $rpl-card-promo-meta-text-color;;
      text-transform: uppercase;
      padding: $rpl-card-promo-tag-padding;
    }

    &__topic-content-type {
      @include rpl_typography_ruleset($rpl-card-promo-meta-ruleset);
      display: inline-block;
      color: $rpl-card-promo-topic-color;
      background-color: $rpl-card-promo-topic-bg-color;
      padding: $rpl-card-promo-tag-padding;

      &::first-letter {
        text-transform: capitalize;
      }
    }

    &__status {
      display: inline-flex;
      align-items: center;
      padding-left: $rpl-space;
      span {
        @include rpl_typography_ruleset($rpl-card-promo-meta-ruleset);
        padding-left: $rpl-space;
        color: rpl_color('dark_neutral');
        text-transform: uppercase;
        padding-left: $rpl-space-4;
      }
      &-icon {
        position: absolute;

      }
    }

    &__title {
      @include rpl_typography_ruleset($rpl-card-promo-title-ruleset);
      color: $rpl-card-promo-title-text-color;
      margin: $rpl-card-promo-title-margin;
    }

    &__summary {
      @include rpl_typography_ruleset($rpl-card-promo-summary-ruleset);
      color: $rpl-card-promo-summary-text-color;
      @include rpl_breakpoint('m') {
        margin: 0;
      }
    }

    &__content {
      padding: $rpl-card-promo-content-padding;

      #{$root}--noimage & {
        padding-top: $rpl-card-promo-no-image-padding-top;
      }
    }

    &--noimage {
      background-image: $rpl-card-promo-no-image-border;
      background-size: 100% $rpl-card-promo-no-image-border-height;
      background-repeat: no-repeat;
    }

    &--profile {
      #{$root}__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        text-align: center;
      }

      #{$root}__image {
        margin-top: $rpl-card-promo-profile-image-margin-top;
        margin-left: auto;
        margin-right: auto;
        border-radius: 50%;
        display: block;
        width: $rpl-card-promo-profile-image-size;
        height: $rpl-card-promo-profile-image-size;
      }
    }
  }
</style>
