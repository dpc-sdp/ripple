<template>
  <div class="rpl-search-result">
    <rpl-link :href="link.linkUrl">
      <h2 class="rpl-search-result__heading">{{ title }}</h2>
    </rpl-link>
    <rpl-link class="rpl-search-result__link" :href="link.linkUrl">{{ link.linkText }}</rpl-link>
    <p class="rpl-search-result__date-description">
      <span class="rpl-search-result__date">{{ formatDate(date, 'MMM D, YYYY') }}</span>
      <span>{{ description }}</span>
    </p>
    <ul class="rpl-search-result__terms">
      <li class="rpl-search-result__term" v-for="(tag, index) in tags" :key="index">
        <rpl-meta-tag :linkText="tag.linkText" :linkUrl="tag.linkUrl" />
      </li>
    </ul>
  </div>
</template>

<script>
import formatdate from '@dpc-sdp/ripple-global/mixins/formatdate'
import RplLink from '@dpc-sdp/ripple-link'
import RplMetaTag from '@dpc-sdp/ripple-meta-tag'

export default {
  name: 'RplSearchResult',
  mixins: [formatdate],
  props: {
    title: String,
    link: Object,
    date: String,
    description: String,
    tags: Array
  },
  components: {
    RplLink,
    RplMetaTag
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-search-result-term-margin: 0 $rpl-space-2 $rpl-space-2 0 !default;
  $rpl-search-result-terms-margin-xs: ($rpl-space * 6) 0 0 !default;
  $rpl-search-result-terms-margin-m: $rpl-space 0 0 !default;
  $rpl-search-result-terms-margin-l: ($rpl-space * 7) 0 0 !default;
  $rpl-search-result-link-ruleset: ('s', 1.25em, 'medium') !default;
  $rpl-search-result-link-text-color: rpl-color('primary') !default;
  $rpl-search-result-heading-text-color: rpl-color('extra_dark_neutral') !default;
  $rpl-search-result-heading-ruleset: (
    'xs': ('l', 1.2em, 'bold'),
    's': ('xl', 1em, 'bold')
  ) !default;
  $rpl-search-result-date-description-ruleset: (
    'xs': ('xs', 1.43em, 'regular'),
    's': ('s', 1.5em, 'regular')
  ) !default;
  $rpl-search-result-date-description-text-color: rpl-color('extra_dark_neutral') !default;
  $rpl-search-result-date-ruleset: (
    'xs': ('xs', 1.43em, 'medium'),
    's': ('s', 1.5em, 'medium')
  ) !default;

  .rpl-search-result {
    padding-bottom: $rpl-space-4;

    @include rpl_breakpoint('m') {
      padding-bottom: $rpl-space-4 * 2;
    }

    &__heading {
      @include rpl_typography_ruleset($rpl-search-result-heading-ruleset);
      color: $rpl-search-result-heading-text-color;
      max-width: $rpl-content-max-width;
    }

    &__link {
      @include rpl_typography_ruleset($rpl-search-result-link-ruleset);
      color: $rpl-search-result-link-text-color;
      word-wrap: break-word;
    }

    &__date {
      @include rpl_typography_ruleset($rpl-search-result-date-ruleset);

      &::after {
        content: '...';
      }
    }

    &__date-description {
      @include rpl_typography_ruleset($rpl-search-result-date-description-ruleset);
      color: $rpl-search-result-date-description-text-color;
      max-width: $rpl-content-max-width;
    }

    &__terms {
      padding: 0;
      list-style: none;
      margin: $rpl-search-result-terms-margin-xs;
      @include rpl_breakpoint('m') {
        margin: $rpl-search-result-terms-margin-m;
      }
      @include rpl_breakpoint('l') {
        margin: $rpl-search-result-terms-margin-l;
      }
    }

    &__term {
      display: inline-block;
      margin: $rpl-search-result-term-margin;
    }
  }
</style>
