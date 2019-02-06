<template>
  <rpl-card-content class="rpl-card-cta" :border="false" :link="linkOnly">
    <img class="rpl-card-cta__image" v-if="image" ref="image" :src="image" alt="" />
    <h2 class="rpl-card-cta__title" v-if="title">{{ title }}</h2>
    <p class="rpl-card-cta__summary" v-if="summary">{{ summary }}</p>
    <span class="rpl-card-cta__button" v-if="link.text">{{ link.text }}</span>
  </rpl-card-content>
</template>

<script>
import objectFitImages from 'object-fit-images'
import RplCardContent from './CardContent.vue'

export default {
  name: 'RplCardCta',
  props: {
    image: String,
    title: String,
    summary: String,
    link: Object
  },
  components: {
    RplCardContent
  },
  data () {
    return {
      linkOnly: { text: null, url: this.link.url }
    }
  },
  mounted () {
    if (this.image) {
      objectFitImages(this.$refs['image'])
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
      object-fit: cover;
      font-family: 'object-fit: cover;';
    }

    &__title {
      @include rpl_typography_ruleset($rpl-card-cta-title-ruleset);
      color: $rpl-card-cta-title-text-color;
      margin: $rpl-card-cta-title-margin;
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
