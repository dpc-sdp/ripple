<template>
  <div class="rpl-search-form" :class="{ 'rpl-search-form--dark': (theme === 'dark'), 'rpl-search-form--two-cols': (type === 'two-cols')  }">
    <h1 v-if="title">{{ title }}</h1>
    <h3 v-if="subtitle">{{ subtitle }}</h3>
    <div class="rpl-search-form__field" v-if="textSearch">
      <label>
        <span class="rpl-search-form__label-text">Search for</span>
        <input v-model="searchInput" ref="searchinput" class="rpl-search-form__input" type="text" :placeholder="searchPlaceholder" @keydown.enter="submitSearch()" />
      </label>
      <button @click="submitSearch()" class="rpl-search-form__btn">
        <span>Search</span>
        <rpl-icon symbol="search" :color="(theme === 'dark') ? 'white' : 'primary'" size="l"></rpl-icon>
      </button>
    </div>
    <button
      v-if="filterForm && !expandFilters"
      :aria-expanded="showFilters"
      class="rpl-search-form__show-filters"
      :class="{ 'rpl-search-form__show-filters--expanded': showFilters }"
      @click="showFilters = !showFilters"
    >
      <span>Refine search</span>
      <span v-if="filterCount > 0">( {{ filterCount }} )</span>
    </button>
    <div v-if="showFilters" class="rpl-search-form__filters">
      <rpl-form :formData="filterForm" :submitHandler="submitSearch"></rpl-form>
    </div>
  </div>
</template>

<script>
import RplIcon from '@dpc-sdp/ripple-icon'
import RplForm from '@dpc-sdp/ripple-form'
let timeoutID

export default {
  name: 'RplSearchForm',
  props: {
    title: String,
    subtitle: String,
    searchPlaceholder: String,
    prefillSearchTerm: String,
    autoFocus: { type: Boolean, default: false },
    textSearch: { type: Boolean, default: true },
    expandFilters: { type: Boolean, default: false },
    filterForm: Object,
    theme: String,
    type: { type: String, default: 'default' },
    allowBlank: { type: Boolean, default: false }
  },
  components: {
    RplForm,
    RplIcon
  },
  data: function () {
    return {
      searchInput: this.prefillSearchTerm,
      showFilters: false
    }
  },
  mounted () {
    if (this.autoFocus) {
      this.$nextTick(function () {
        timeoutID = setTimeout(() => {
          // this is needed to prevent a re render issue with the parent component
          this.focusSearchInput()
        }, 100)
      })
    }
    if (this.expandFilters) {
      this.showFilters = true
    }
  },
  destroyed () {
    clearTimeout(timeoutID)
  },
  methods: {
    focusSearchInput () {
      if (document && document.activeElement !== this.$refs.searchinput) {
        this.$refs.searchinput.focus()
      }
    },
    submitSearch: function () {
      if (this.allowBlank || (!this.allowBlank && this.searchInput)) {
        this.$emit('search', this.searchInput)
      }
    }
  },
  computed: {
    filterCount: function () {
      let count = 0
      for (let key in this.filterForm.model) {
        let item = this.filterForm.model[key]
        if (Array.isArray(item)) {
          if (item.length > 0) {
            count++
          }
        } else if (item !== '' && item !== null && item !== false) {
          count++
        }
      }
      return count
    }
  },
  watch: {
    prefillSearchTerm: function (newVal, oldVal) {
      this.searchInput = newVal
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-search-form-button-width: rem(28px) !default;
  $rpl-search-form-input-text-color: rpl-color('extra_dark_neutral') !default;
  $rpl-search-form-input-margin: auto auto ($rpl-space-4) auto !default;
  $rpl-search-form-input-margin-s: auto auto ($rpl-space-4) auto !default;
  $rpl-search-form-input-margin-l: auto auto ($rpl-space-4) auto !default;
  $rpl-search-form--two-cols-col-padding-l: 0 0 0 rem(25px) !default;
  $rpl-search-form--two-cols-col-width-l: calc(50% - #{$rpl-space-4}) !default;
  $rpl-search-form-input-ruleset: (
    'xs': ('m', 1.22em, 'medium'),
    'm': ('xl', 1.17em, 'medium'),
    'xxl': ('mega', 1.14em, 'medium')
  ) !default;
  $rpl-search-form-term-margin: auto $rpl-space-2 $rpl-space-3 auto !default;
  $rpl-search-form-terms-header-text-color: rpl-color('extra_dark_neutral') !default;
  $rpl-search-form-field-underline-background: rpl-color('mid_neutral_2') !default;
  $rpl-search-form-heading-color: rpl-color('primary') !default;
  $rpl-search-form-dark-text-color: rpl-color('white') !default;
  $rpl-search-form-heading-ruleset: (
    'xs': ('mega', 1.07em, 'bold'),
    'm': ('xgiga', 1em, 'bold'),
    'xxl': ('tera', 1em, 'bold')
  ) !default;
  $rpl-search-form-sub-heading-ruleset: (
    'm': ('mega', 1em, 'medium'),
  ) !default;
  $rpl-search-form-show-filters-ruleset: ('s', .87em, 'bold') !default;
  $rpl-search-form-legend-ruleset: (2em, 2.2em, 'bold') !default;
  $rpl-search-form-show-filters-text-color: rpl-color('primary') !default;

  .rpl-search-form {
    $root: &;
    @include rpl_mobile_padding();
    padding-top: $rpl-space * 7;
    padding-bottom: $rpl-space-4 * 2;

    @include rpl_breakpoint('m') {
      padding-left: 0;
      padding-right: 0;
    }

    @include rpl_breakpoint('l') {
      padding-top: $rpl-space-4 * 3;
      padding-bottom: $rpl-space * 15;
    }

    h1 {
      @include rpl_typography_ruleset($rpl-search-form-heading-ruleset);
      color: $rpl-search-form-heading-color;
      margin-top: 0;

      @at-root {
        #{$root}--dark h1 {
          color: $rpl-search-form-dark-text-color;
        }
      }
    }

    h3 {
       @include rpl_typography_ruleset($rpl-search-form-sub-heading-ruleset);
    }

    &__btn {
      background-color: transparent;
      border: 0;
      padding: 0;
      width: $rpl-search-form-button-width;
      cursor: pointer;

      span {
        @include rpl_visually_hidden;
      }
    }

    fieldset {
      legend {
        @include rpl_typography_ruleset($rpl-search-form-legend-ruleset);
      }
    }

    &__input {
      @include rpl_typography_ruleset($rpl-search-form-input-ruleset);
      background-color: transparent;
      border: 0;
      padding: 1px;
      width: 100%;
      color: $rpl-search-form-input-text-color;

      @at-root {
        #{$root}--dark #{$root}__input {
          color: $rpl-search-form-dark-text-color;
        }
      }

      &::-webkit-input-placeholder {
        color: $rpl-search-form-input-text-color;

        @at-root {
          #{$root}--dark #{$root}__input::-webkit-input-placeholder {
            color: $rpl-search-form-dark-text-color;
          }
        }
      }
    }

    &__label-text {
      @include rpl_visually_hidden;
    }

    &__field {
      position: relative;
      display: flex;
      margin: $rpl-search-form-input-margin;

      @include rpl_breakpoint('s') {
        margin: $rpl-search-form-input-margin-s;
      }

      @include rpl_breakpoint('l') {
        margin: $rpl-search-form-input-margin-l;
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
        left: 0;
        right: 0;
        height: rem(2px);
        background: $rpl-search-form-field-underline-background;
        @include rpl_breakpoint('l') {
          height: rem(3px);
        }
      }
    }

    &__show-filters {
      @include rpl_typography_ruleset($rpl-search-form-show-filters-ruleset);
      color: $rpl-search-form-show-filters-text-color;
      background: transparent;
      border: 0;
      margin-left: auto;
      display: block;
      cursor: pointer;

      @at-root {
        #{$root}--dark #{$root}__show-filters {
          color: $rpl-search-form-dark-text-color;
        }
      }

      &::after {
        content: ' +';
      }

      &--expanded {
        &::after {
          content: ' -';
        }
      }
    }

    &__filters {
      padding-top: $rpl-space * 12;
    }

  }
</style>
