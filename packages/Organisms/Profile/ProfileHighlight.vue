<template>
  <div class="rpl-profile-highlight">
    <img class="rpl-profile-highlight__image" v-if="image" :src="image" alt="" />
    <div class="rpl-profile-highlight__content">
      <slot name="details" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'RplProfileHighlight',
  props: {
    image: String
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-profile-highlight-image-margin: 0 ($rpl-space * 6) 0 0 !default;
  $rpl-profile-highlight-image-border-radius: 100% !default;

  .rpl-profile-highlight {
    display: flex;
    align-items: center;

    &__image {
      margin: $rpl-profile-highlight-image-margin;
      border-radius: $rpl-profile-highlight-image-border-radius;
    }
  }
</style>
