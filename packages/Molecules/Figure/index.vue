<template>
  <figure class="rpl-figure">
    <img v-if="image" class="rpl-figure__image" :src="image.src" :alt="image.alt" />
    <figcaption v-if="caption" class="rpl-figure__caption">{{ caption }}</figcaption>
  </figure>
</template>

<script>
export default {
  name: 'RplFigure',
  props: {
    image: Object,
    caption: String
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";

  $rpl-figure-caption-ruleset: ('xxs', 1em, 'medium') !default;
  $rpl-figure-caption-text-color: rpl-color('dark_neutral') !default;
  $rpl-figure-caption-margin: $rpl-space-3 0 !default;
  $rpl-figure-image-border-radius: rem(4px) !default;

  .rpl-figure {
    margin: 0;
    width: 100%;

    &__image {
      border-radius: $rpl-figure-image-border-radius;
      height: auto;
      max-width: 100%;
    }

    &__caption {
      @include rpl_typography_ruleset($rpl-figure-caption-ruleset);
      color: $rpl-figure-caption-text-color;
      margin: $rpl-figure-caption-margin;
      text-transform: uppercase;
    }
  }
</style>
