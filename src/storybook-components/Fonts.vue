<template>
  <div class="typography demo-content">
    <h1>Font</h1>
    <div
      :class="[
        `rpl-font-size--${size}`,
        `rpl-font-weight--${weight}`,
        `rpl-background--${background ? 'true' : 'false'}`
      ]"
      :style="{
        'line-height': (background ? false : lineHeight)
      }"
    >
      <span v-if="background">{{ text }}</span>
      <template v-else>{{ text }}</template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SFonts',
  props: {
    size: String,
    lineHeight: String,
    weight: String,
    background: Boolean,
    text: String
  }
}
</script>

<style lang="scss" scoped>
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

// Size
@each $name, $value in $rpl-font-sizes {
  .rpl-font-size--#{$name} {
    font-size: rpl-font-size($name);

    // Background
    &.rpl-background--true {
      line-height: 0;
      span {
        @include rpl_display_background($name);
      }
    }
  }
}

// Weight
@each $name, $value in $rpl-fonts {
  .rpl-font-weight--#{$name} {
    font-family: rpl-font($name);
  }
}
</style>
