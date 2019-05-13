<template>
  <figure class="rpl-figure">
    <img v-if="image" class="rpl-figure__image" :src="image.src" :alt="image.alt" />
    <figcaption v-if="caption || source">
      <span class="rpl-figure__caption" v-if="caption">{{ caption }}</span>
      <span class="rpl-figure__source" v-if="source">{{ source }}</span>
    </figcaption>
  </figure>
</template>

<script>
export default {
  name: 'RplFigure',
  props: {
    image: Object,
    caption: String,
    source: String
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-figure-caption-ruleset: ('xxs', 1em, 'medium') !default;
  $rpl-figure-caption-text-color: rpl-color('dark_neutral') !default;
  $rpl-figure-caption-margin: $rpl-space-3 0 !default;
  $rpl-figure-image-border-radius: rem(4px) !default;
  $rpl-figure-source-ruleset: ('xxs', 1.33em, 'regular') !default;
  $rpl-figure-source-color: rpl-color('dark_neutral') !default;
  $rpl-figure-source-margin: $rpl-space-2 0 !default;

  .rpl-figure {
    margin: 0;
    width: 100%;

    &__image {
      border-radius: $rpl-figure-image-border-radius;
      height: auto;
      max-width: 100%;
      display: block;

      @include rpl_print_image;
    }

    &__caption {
      @include rpl_typography_ruleset($rpl-figure-caption-ruleset);
      @include rpl_text_color($rpl-figure-caption-text-color);
      display: block;
      margin: $rpl-figure-caption-margin;
    }

    &__source {
      @include rpl_typography_ruleset($rpl-figure-source-ruleset);
      @include rpl_text_color($rpl-figure-source-color);
      display: block;
      margin: $rpl-figure-source-margin;
    }
  }
</style>
