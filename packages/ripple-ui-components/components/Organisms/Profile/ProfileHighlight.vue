<template>
  <div class="rpl-profile-highlight">
    <img class="rpl-profile-highlight__image" v-if="image" :src="image" alt="" ref="image" />
    <div class="rpl-profile-highlight__content">
      <slot name="details" />
    </div>
  </div>
</template>

<script>
import objectFitImages from 'object-fit-images'

export default {
  name: 'RplProfileHighlight',
  props: {
    image: String
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

  $rpl-profile-highlight-image-margin: 0 ($rpl-space * 6) 0 0 !default;
  $rpl-profile-highlight-image-border-radius: 100% !default;
  $rpl-profile-highlight-image-size: rem(156px) !default;

  .rpl-profile-highlight {
    display: flex;
    align-items: center;

    &__image {
      width: $rpl-profile-highlight-image-size;
      height: $rpl-profile-highlight-image-size;
      margin: $rpl-profile-highlight-image-margin;
      border-radius: $rpl-profile-highlight-image-border-radius;
      @include object_fit_image(cover);
    }
  }
</style>
