<template>
  <div class="rpl-site-header-search">
    <rpl-quick-exit class="rpl-search__quickexit" v-if="rplOptions.quickexit" />
    <rpl-search-form
      class="rpl-site-header-search__form"
      searchPlaceholder="Start typing..."
      theme="dark"
      :auto-focus="true"
      @search="searchTerm"
    />
    <div v-if="terms && terms.length > 0">
      <h3 class="rpl-site-header-search__terms-header">Popular searches</h3>
      <ul class="rpl-site-header-search__terms">
        <li class="rpl-site-header-search__term" v-for="(term, index) in terms" :key="index">
          <rpl-meta-tag :linkText="term.linkText" :linkUrl="term.linkUrl" theme="dark" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import RplIcon from '@dpc-sdp/ripple-icon'
import RplMetaTag from '@dpc-sdp/ripple-meta-tag'
import { RplSearchForm } from '@dpc-sdp/ripple-search'
import RplQuickExit from '@dpc-sdp/ripple-layout/QuickExit'

export default {
  name: 'RplSearch',
  props: {
    terms: Array
  },
  components: {
    RplIcon,
    RplMetaTag,
    RplSearchForm,
    RplQuickExit
  },
  methods: {
    searchTerm: function (searchInput) {
      this.$emit('search', searchInput)
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-site-header-search-max-width: rem(1160px) !default;
  $rpl-site-header-search-margin: ($rpl-space * 9) auto auto !default;
  $rpl-site-header-search-margin-s: ($rpl-space * 20) auto auto !default;
  $rpl-site-header-search-margin-m: ($rpl-space * 16) auto auto !default;
  $rpl-site-header-search-margin-l: ($rpl-space * 19) auto auto !default;
  $rpl-site-header-search-margin-xl: ($rpl-space * 20) auto auto !default;
  $rpl-site-header-search-padding: 0 10% !default;
  $rpl-site-header-search-term-margin: auto $rpl-space-2 $rpl-space-3 auto !default;
  $rpl-site-header-search-terms-header-text-color: rpl-color('white') !default;
  $rpl-site-header-search-field-underline-background-image: rpl-gradient('primary_gradient') !default;
  $rpl-site-header-search-quickexit-margin-bottom: ($rpl-space * 6) !default;

  .rpl-site-header-search {
    $root: &;
    max-width: $rpl-site-header-search-max-width;
    margin: $rpl-site-header-search-margin;
    padding: $rpl-site-header-search-padding;
    box-sizing: content-box;

    @include rpl_breakpoint('s') {
      margin: $rpl-site-header-search-margin-s;
    }

    @include rpl_breakpoint('m') {
      margin: $rpl-site-header-search-margin-m;
    }

    @include rpl_breakpoint('l') {
      margin: $rpl-site-header-search-margin-l;
    }

    @include rpl_breakpoint('xl') {
      margin: $rpl-site-header-search-margin-xl;
    }

    &__form {
      &.rpl-search-form {
        padding: 0;
      }
    }

    &__terms {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    &__term {
      display: inline-block;
      margin: $rpl-site-header-search-term-margin;
    }

    &__terms-header {
      @include rpl_typography_font('s', 1.4em, 'bold');
      color: $rpl-site-header-search-terms-header-text-color;
    }

    .rpl-search__quickexit {
      margin-bottom: $rpl-site-header-search-quickexit-margin-bottom;

      @include rpl_breakpoint('s') {
        top: $rpl-space;
        right: $rpl-space;
        position: absolute;
      }

       > a {
        width: 100%;

        @include rpl_breakpoint('s') {
          width: auto;
        }
      }
    }

    .rpl-search-form__field {
      &::after {
        content: '';
        width: 100%;
        position: absolute;
        display: inline-block;
        bottom: rem(-5px);
        border-radius: rem(4px);
        left: 0;
        right: 0;
        height: rem(4px);
        background-image: $rpl-site-header-search-field-underline-background-image;
      }
    }
  }

</style>
