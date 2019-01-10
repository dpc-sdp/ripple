<template>
  <div class="rpl-meta-tag" :class="{'rpl-meta-tag--dark' : (theme === 'dark')}">
    <rpl-link class="rpl-meta-tag__link" :href="linkUrl">
      <span class="rpl-meta-tag__text">{{ linkText }}</span>
    </rpl-link>
  </div>
</template>

<script>
import RplLink from '@dpc-sdp/ripple-link'

export default {
  name: 'RplMetaTag',
  components: {
    RplLink
  },
  props: {
    linkText: String,
    linkUrl: String,
    theme: String
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-meta-tag-padding: $rpl-space-2 ($rpl-space * 5) !default;
  $rpl-meta-tag-border: 2px solid rpl-color('primary') !default;
  $rpl-meta-tag-border-radius: rem(40px) !default;
  $rpl-meta-tag-text-color: rpl-color('primary') !default;
  $rpl-meta-tag-dark-border-color: rpl-color('white') !default;
  $rpl-meta-tag-dark-text-color: rpl-color('white') !default;

  .rpl-meta-tag {
    $root: &;
    display: inline-block;

    &__link {
      display: inline-block;
      text-decoration: none;
      border: $rpl-meta-tag-border;
      border-radius: $rpl-meta-tag-border-radius;
      padding: $rpl-meta-tag-padding;

      #{$root}--dark & {
        border-color: $rpl-meta-tag-dark-border-color;
      }
    }

    &__text {
      @include rpl_typography_font('xxs', 1.2em, 'medium');
      text-transform: uppercase;
      color: $rpl-meta-tag-text-color;

      #{$root}--dark & {
        color: $rpl-meta-tag-dark-text-color;
      }
    }
  }
</style>
