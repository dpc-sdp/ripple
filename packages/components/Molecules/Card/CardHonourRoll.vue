<template>
  <rpl-card-content :link="link" :border="false" :center="!image" class="rpl-card-honour-roll">
    <div class="rpl-card-honour-roll__inner">
      <img class="rpl-card-honour-roll__image" v-if="image" ref="image" :src="image" alt="" />
      <h2 class="rpl-card-honour-roll__name" :class="{ 'rpl-card-honour-roll__name--no-margin' : lifespan }" v-if="name">{{ name }}</h2>
      <p class="rpl-card-honour-roll__lifespan" v-if="lifespan">({{ lifespan }})</p>
      <p class="rpl-card-honour-roll__induction">
        <span v-if="inductionYear">{{ inductionYear }}</span>
        <span v-if="inductionYear && category" class="rpl-card-honour-roll__separator">|</span>
        <span v-if="category">{{ category }}</span>
      </p>
      <div class="rpl-card-honour-roll__summary" v-if="summary" v-html="summary"></div>
    </div>
  </rpl-card-content>
</template>

<script>
import objectFitImages from 'object-fit-images'
import RplCardContent from './CardContent.vue'
import deprecate from '@dpc-sdp/ripple-global/mixins/deprecate'

export default {
  name: 'RplCardHonourRoll',
  mixins: [deprecate],
  props: {
    name: String,
    inductionYear: String,
    category: String,
    lifespan: String,
    summary: String,
    link: Object,
    image: [String, Object]
  },
  components: {
    RplCardContent
  },
  mounted () {
    if (this.image) {
      objectFitImages(this.$refs['image'])
    }
    this.deprecatedWarn('"rpl-card-honour-roll" is depricated, please use "rpl-card-profile" instead.')
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
  @import "scss/card";

  $rpl-card-honour-roll-name-ruleset: ('l', 1.2em, 'bold') !default;
  $rpl-card-honour-roll-name-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-honour-roll-name-margin: 0 0 $rpl-space-3 0 !default;
  $rpl-card-honour-roll-summary-ruleset: ('xs', 1.5em, 'regular') !default;
  $rpl-card-honour-roll-summary-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-honour-roll-image-margin: (-$rpl-card-vertical-padding + rem(14px)) 0 ($rpl-space * 6) !default;
  $rpl-card-honour-roll-image-width: rem(148px) !default;
  $rpl-card-honour-roll-image-height: rem(148px) !default;
  $rpl-card-honour-roll-induction-ruleset: ('xxs', 1em, 'medium') !default;
  $rpl-card-honour-roll-induction-color: rpl_color('dark_neutral') !default;

  .rpl-card-honour-roll {

    &__inner {
      text-align: center;
    }

    &__image {
      border-radius: 100%;
      margin: $rpl-card-honour-roll-image-margin;
      width: $rpl-card-honour-roll-image-width;
      height: $rpl-card-honour-roll-image-height;
      @include object_fit_image(cover);
    }

    &__name {
      @include rpl_typography_ruleset($rpl-card-honour-roll-name-ruleset);
      color: $rpl-card-honour-roll-name-text-color;
      margin: $rpl-card-honour-roll-name-margin;

      &--no-margin {
        margin: 0;
      }
    }

    &__lifespan {
      @include rpl_typography_ruleset($rpl-card-honour-roll-name-ruleset);
      color: $rpl-card-honour-roll-name-text-color;
      margin: $rpl-card-honour-roll-name-margin;
    }

    &__induction {
      @include rpl_typography_ruleset($rpl-card-honour-roll-induction-ruleset);
      color: $rpl-card-honour-roll-induction-color;
      text-transform: uppercase;
    }

    &__summary {
      @include rpl_typography_ruleset($rpl-card-honour-roll-summary-ruleset);
      color: $rpl-card-honour-roll-summary-text-color;
      margin: 0;
      margin-bottom: $rpl-space-4;
    }

    &__separator {
      margin: 0 $rpl-space;
    }
  }
</style>
