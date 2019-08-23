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

  $rpl-meta-tag-ruleset: ('xxs', 1.2em, 'medium') !default;
  $rpl-meta-tag-margin: 0 $rpl-space-2 $rpl-space-2 0 !default;
  $rpl-meta-tag-padding: $rpl-space-2 ($rpl-space * 5) !default;
  $rpl-meta-tag-border: 2px solid rpl-color('primary') !default;
  $rpl-meta-tag-border-radius: rem(40px) !default;
  $rpl-meta-tag-text-color: rpl-color('primary') !default;
  $rpl-meta-tag-dark-border-color: rpl-color('white') !default;
  $rpl-meta-tag-dark-text-color: rpl-color('white') !default;

  .rpl-meta-tag {
    $root: &;
    display: inline-block;
    margin: $rpl-meta-tag-margin;

    &__link {
      @include rpl_text_color($rpl-meta-tag-text-color);
      display: inline-block;
      text-decoration: none;
      border: $rpl-meta-tag-border;
      border-radius: $rpl-meta-tag-border-radius;
      padding: $rpl-meta-tag-padding;

      #{$root}--dark & {
        @include rpl_text_color($rpl-meta-tag-text-color);
        border-color: $rpl-meta-tag-dark-border-color;
        @include rpl_focus_dark;
      }
    }

    &__text {
      @include rpl_typography_ruleset($rpl-meta-tag-ruleset);
      @include rpl_text_color($rpl-meta-tag-text-color);
      text-transform: uppercase;

      #{$root}--dark & {
        @include rpl_text_color($rpl-meta-tag-dark-text-color);
      }
    }
  }
</style>
