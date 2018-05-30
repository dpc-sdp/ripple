<template>
  <div class="rpl-site-header-search">
    <div class="rpl-site-header-search__field">
      <label>
        <span class="rpl-site-header-search__label-text">Search for</span>
        <input v-model="searchInput" class="rpl-site-header-search__input" type="text" placeholder="Start typing..." @keydown.enter="searchTerm()" />
      </label>
      <button @click="searchTerm()" class="rpl-site-header-search__btn">
        <span>Search</span>
        <rpl-icon symbol="search" color="white" size="l"></rpl-icon>
      </button>
    </div>
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

export default {
  name: 'RplSearch',
  props: {
    terms: Array
  },
  components: {
    RplIcon,
    RplMetaTag
  },
  data: function () {
    return {
      searchInput: ''
    }
  },
  methods: {
    searchTerm: function () {
      this.$emit('search', this.searchInput)
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";

  $rpl-site-header-search-max-width: rem(1160px) !default;
  $rpl-site-header-search-margin: ($rpl-space * 9) auto auto !default;
  $rpl-site-header-search-margin-s: ($rpl-space * 20) auto auto !default;
  $rpl-site-header-search-margin-m: ($rpl-space * 16) auto auto !default;
  $rpl-site-header-search-margin-l: ($rpl-space * 19) auto auto !default;
  $rpl-site-header-search-margin-xl: ($rpl-space * 20) auto auto !default;
  $rpl-site-header-search-padding: 0 10% !default;
  $rpl-site-header-search-button-width: rem(28px) !default;
  $rpl-site-header-search-input-text-color: rpl-color('white') !default;
  $rpl-site-header-search-input-margin: auto auto ($rpl-space * 7) auto !default;
  $rpl-site-header-search-input-margin-s: auto auto ($rpl-space * 15) auto !default;
  $rpl-site-header-search-input-margin-l: auto auto ($rpl-space * 19) auto !default;
  $rpl-site-header-search-term-margin: auto $rpl-space-2 $rpl-space-3 auto !default;
  $rpl-site-header-search-terms-header-text-color: rpl-color('white') !default;
  $rpl-site-header-search-field-underline-background-image: rpl-gradient('primary_gradient') !default;

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

    &__btn {
      background-color: transparent;
      border: 0;
      width: $rpl-site-header-search-button-width;
      cursor: pointer;

      span {
        @include rpl_visually_hidden;
      }
    }

    &__input {
      @include rpl_typography_font('s', 1.1em, 'medium');
      background-color: transparent;
      border: 0;
      width: 100%;
      color: $rpl-site-header-search-input-text-color;

      &::-webkit-input-placeholder {
        color: $rpl-site-header-search-input-text-color;
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

    &__label-text {
      @include rpl_visually_hidden;
    }

    &__field {
      position: relative;
      display: flex;
      margin: $rpl-site-header-search-input-margin;

      @include rpl_breakpoint('s') {
        margin: $rpl-site-header-search-input-margin-s;
      }

      @include rpl_breakpoint('l') {
        margin: $rpl-site-header-search-input-margin-l;
      }

      label {
        width: 100%;
      }

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

    &__terms-header {
      @include rpl_typography_font('s', 1.4em, 'bold');
      color: $rpl-site-header-search-terms-header-text-color;
    }
  }

</style>
