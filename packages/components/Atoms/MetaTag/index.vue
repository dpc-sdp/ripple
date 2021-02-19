<template>
  <div v-if="linkText" class="rpl-meta-tag" :class="themeClass">
    <rpl-link v-if="linkUrl" class="rpl-meta-tag__link" :href="linkUrl">
      <span class="rpl-meta-tag__text">{{ linkText }}</span>
    </rpl-link>
    <div v-else class="rpl-meta-tag__link">
      <span class="rpl-meta-tag__text">{{ linkText }}</span>
    </div>
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
    /**
     * Tag text.
     */
    linkText: String,
    /**
     * Meta tag URL.
     */
    linkUrl: String,
    /**
     * Meta tag theme.
     */
    theme: String
  },
  computed: {
    themeClass () {
      return `rpl-meta-tag--${(this.theme === 'solid' || this.theme === 'dark') ? this.theme : 'light'}`
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-meta-tag-ruleset: ('xxs', 1.2em, 'medium') !default;
  $rpl-meta-tag-solid-ruleset: ('xs', 1.28em, 'medium') !default;
  $rpl-meta-tag-margin: 0 $rpl-space-2 $rpl-space-2 0 !default;
  $rpl-meta-tag-padding: $rpl-space ($rpl-space * 5) !default;
  $rpl-meta-tag-border: 2px solid rpl-color('primary') !default;
  $rpl-meta-tag-border-radius: rem(40px) !default;
  $rpl-meta-tag-solid-border-radius: rem(14px) !default;
  $rpl-meta-tag-text-color: rpl-color('primary') !default;
  $rpl-meta-tag-text-hover-color:rpl-color('white') !default;
  $rpl-meta-tag-link-hover-background-color: rpl-color('primary') !default;
  $rpl-meta-tag-dark-border-color: rpl-color('white') !default;
  $rpl-meta-tag-dark-text-color: rpl-color('white') !default;
  $rpl-meta-tag-solid-text-color: rpl-color('white') !default;
  $rpl-meta-tag-solid-background-color: rpl-color('dark_neutral') !default;

  .rpl-meta-tag {
    $root: &;
    display: inline-block;

    &--light,
    &--dark,
    &--solid {
      margin: $rpl-meta-tag-margin;
    }

    &__link {
      display: inline-block;
      text-decoration: none;

      #{$root}--light &,
      #{$root}--dark & {
        border: $rpl-meta-tag-border;
        border-radius: $rpl-meta-tag-border-radius;
        padding: $rpl-meta-tag-padding;

        @media print {
          border-color: rpl-color('black');
        }
      }

      #{$root}--light & {
        @include rpl_text_color($rpl-meta-tag-text-color);
        &:hover {
          background: $rpl-meta-tag-link-hover-background-color;
        }
      }

      #{$root}--dark & {
        @include rpl_text_color($rpl-meta-tag-text-color);
        border-color: $rpl-meta-tag-dark-border-color;
        @include rpl_focus_dark;
      }

      #{$root}--solid & {
        @include rpl_text_color($rpl-meta-tag-solid-text-color);
        border-radius: $rpl-meta-tag-solid-border-radius;
        background-color: $rpl-meta-tag-solid-background-color;
        padding: ($rpl-space / 2) $rpl-space-3;
      }
    }

    &__text {
      #{$root}--light &,
      #{$root}--dark & {
        @include rpl_typography_ruleset($rpl-meta-tag-ruleset);
        text-transform: uppercase;
      }

      #{$root}--light & {
        @include rpl_text_color($rpl-meta-tag-text-color);
      }
      #{$root}--light #{$root}__link:hover & {
        @include rpl_text_color($rpl-meta-tag-text-hover-color);
      }

      #{$root}--dark & {
        @include rpl_text_color($rpl-meta-tag-dark-text-color);
      }

      #{$root}--solid & {
        @include rpl_typography_ruleset($rpl-meta-tag-solid-ruleset);
      }
    }
  }
</style>
