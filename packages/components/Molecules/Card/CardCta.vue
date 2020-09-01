<template>
  <rpl-card-content class="rpl-card-cta" :border="false" :link="linkOnly">
    <rpl-responsive-img class="rpl-card-cta__image" v-bind="computedImg" alt="" />
    <h2 class="rpl-card-cta__title" v-if="title">{{ title }}</h2>
    <div class="rpl-card-cta__trim-wrapper" v-if="summary" :style="{ maxHeight: trimFieldMaxHeight }">
      <div v-if="summary" class="rpl-card-cta__summary" v-html="summary"></div>
    </div>
    <span class="rpl-card-cta__button" v-if="link.text">{{ link.text }}</span>
  </rpl-card-content>
</template>

<script>
import RplCardContent from './CardContent.vue'
import cardtrimfield from './mixins/cardtrimfield'
import RplResponsiveImg from '@dpc-sdp/ripple-responsive-img'

export default {
  name: 'RplCardCta',
  mixins: [cardtrimfield],
  props: {
    image: [String, Object],
    title: String,
    summary: String,
    link: Object
  },
  components: {
    RplResponsiveImg,
    RplCardContent
  },
  data: function () {
    return {
      linkOnly: { text: null, url: this.link.url },
      trimFieldSelector: '.rpl-card-cta__summary',
      trimFieldRefreshOnFonts: true
    }
  },
  methods: {
    getTrimFieldMaxHeightOffset: function (card) {
      const linkButton = this.$el.querySelector('.rpl-card-cta__button')
      const rtnMaxHeight = linkButton ? (card.clientHeight - linkButton.clientHeight) : card.clientHeight
      return linkButton ? (rtnMaxHeight - linkButton.clientHeight) : rtnMaxHeight
    }
  },
  computed: {
    computedImg () {
      return typeof this.image === 'string' ? { src: this.image } : this.image
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
  @import "scss/card";

  $rpl-card-cta-title-ruleset: ('l', 1.2em, 'bold') !default;
  $rpl-card-cta-title-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-cta-title-margin: 0 0 $rpl-space-3 0 !default;
  $rpl-card-cta-summary-ruleset: ('xs', 1.5em, 'regular') !default;
  $rpl-card-cta-summary-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-cta-button-ruleset: ('xs', 1em, 'bold') !default;
  $rpl-card-cta-button-padding: $rpl-space-3 $rpl-space-4 !default;
  $rpl-card-cta-image-margin: (-$rpl-card-vertical-padding + rem(14px)) 0 ($rpl-space * 6) !default;
  $rpl-card-cta-image-width: rem(148px) !default;
  $rpl-card-cta-image-height: rem(148px) !default;

  .rpl-card-cta {
    $root: &;
    text-align: center;

    &__image {
      border-radius: 100%;
      margin: $rpl-card-cta-image-margin;
      width: $rpl-card-cta-image-width;
      height: $rpl-card-cta-image-height;
      @include object_fit_image(cover);
    }

    &__title {
      @include rpl_typography_ruleset($rpl-card-cta-title-ruleset);
      color: $rpl-card-cta-title-text-color;
      margin: $rpl-card-cta-title-margin;
    }

    &__trim-wrapper {
      @include rpl_breakpoint('m') {
        overflow: hidden;
      }
    }

    &__summary {
      @include rpl_typography_ruleset($rpl-card-cta-summary-ruleset);
      color: $rpl-card-cta-summary-text-color;
      margin: 0;
      margin-bottom: $rpl-space-4;
    }

    &__button {
      @include rpl_typography_ruleset($rpl-card-cta-button-ruleset);
      background-color: $rpl-button-primary-background-color;
      color: $rpl-button-primary-text-color;
      text-align: center;
      display: inline-block;
      margin: 0;
      box-sizing: border-box;
      width: auto;
      padding: $rpl-card-cta-button-padding;
      border: $rpl-button-border;
      border-radius: $rpl-button-border-radius;

      #{$root}:hover & {
        background-color: $rpl-button-primary-hover-background-color;
        color: $rpl-button-primary-hover-text-color;
      }
    }
  }
</style>
