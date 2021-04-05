<template>
  <div class="rpl-search-form" :class="searchFormClass">
    <h1 v-if="title">{{ title }}</h1>
    <h3 v-if="subtitle">{{ subtitle }}</h3>
    <slot name="aboveFilters"></slot>
    <div class="rpl-search-form__field" v-if="textSearch">
      <label>
        <span class="rpl-search-form__label-text">{{ searchInputLabel }}</span>
        <input v-model="searchInput" ref="searchinput" class="rpl-search-form__input" type="text" :placeholder="searchPlaceholder" @keypress.enter="submitSearch()" />
      </label>
      <button @click="submitSearch()" class="rpl-search-form__btn">
        <span :class="{'rpl-visually-hidden' : buttonHiddenLabel}">{{ buttonLabel }}</span>
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
      <span>{{ filterText }}</span>
      <span v-if="filterCount > 0">( {{ filterCount }} )</span>
    </button>
    <div v-if="showFilters" class="rpl-search-form__filters">
      <rpl-form :formData="filterForm" :submitHandler="submitSearch" :submitFormOnClear="true"></rpl-form>
    </div>
  </div>
</template>

<script>
import RplIcon from '@dpc-sdp/ripple-icon'
import { RplForm, RplFormEventBus } from '@dpc-sdp/ripple-form'
let timeoutID

export default {
  name: 'RplSearchForm',
  props: {
    title: String,
    subtitle: String,
    searchPlaceholder: String,
    prefillSearchTerm: String,
    searchInputLabel: { type: String, default: 'Search for' },
    buttonLabel: { type: String, default: 'Search' },
    buttonHiddenLabel: { type: Boolean, default: true },
    autoFocus: { type: Boolean, default: false },
    textSearch: { type: Boolean, default: true },
    expandFilters: { type: Boolean, default: false },
    filterForm: Object,
    filterText: { type: String, default: 'Refine search' },
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
    RplFormEventBus.$on('clearform', this.clearSearch)
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
    },
    clearSearch () {
      this.searchInput = ''
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
    },
    searchFormClass () {
      const classes = []
      if (this.theme === 'dark') {
        classes.push('rpl-search-form--dark')
      }
      if (this.theme === 'solid') {
        classes.push('rpl-search-form--solid')
      }
      if (this.type === 'two-cols') {
        classes.push('rpl-search-form--two-cols')
      }
      return classes
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
  $rpl-search-form-input-placeholder-color: $rpl-search-form-input-text-color !default;
  $rpl-search-form-input-margin: auto !default;
  $rpl-search-form-input-margin-s: auto !default;
  $rpl-search-form-input-margin-l: auto !default;
  $rpl-search-form-show-filters-margin: $rpl-space-4 0 0 auto !default;
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
  $rpl-search-form-dark-input-placeholder-color: $rpl-search-form-dark-text-color !default;
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
  $rpl-search-form-search-button-text: $rpl-search-form-show-filters-ruleset !default;
  $rpl-search-form-search-button-text-color: rpl-color('primary') !default;
  $rpl-search-form-solid-background-color: rpl-color('mid_neutral_2') !default;
  $rpl-search-form-solid-field-background-color: rpl-color('white') !default;
  $rpl-search-form-solid-field-border-color: 3px solid rpl-color('mid_neutral_1') !default;
  $rpl-search-form-element-border-radius: rem(4px) !default;

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

    &--solid {
      background-color: $rpl-search-form-solid-background-color;
      padding-top: $rpl-space * 8;
      padding-bottom: $rpl-space * 8;

      @include rpl_breakpoint('m') {
        padding-top: $rpl-space * 13;
        padding-bottom: $rpl-space * 13;
      }
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
      cursor: pointer;
      display: flex;
      align-items: center;
      @include rpl_print_hidden;

      @at-root {
        #{$root}--dark #{$root}__btn {
          @include rpl_focus_dark;
        }
      }

      span {
        @include rpl_typography_ruleset($rpl-search-form-search-button-text);
        color: $rpl-search-form-search-button-text-color;
        margin-right: $rpl-space-2;
      }

      svg {
        width: $rpl-search-form-button-width;
        height: $rpl-search-form-button-width;
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
      width: 100%;
      color: $rpl-search-form-input-text-color;
      padding: rem(1px) $rpl-space;
      margin-left: $rpl-space * -1;
      box-sizing: border-box;

      @at-root {
        #{$root}--dark #{$root}__input {
          @include rpl_focus_dark;
          outline-offset: 0;
          color: $rpl-search-form-dark-text-color;
        }
      }

      &::placeholder {
        color: $rpl-search-form-input-placeholder-color;
        opacity: 1;

        #{$root}--dark & {
          color: $rpl-search-form-dark-input-placeholder-color;
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
      @include rpl_print_hidden;

      @include rpl_breakpoint('s') {
        margin: $rpl-search-form-input-margin-s;
      }

      @include rpl_breakpoint('l') {
        margin: $rpl-search-form-input-margin-l;
      }

      #{$root}--solid & {
        background-color: $rpl-search-form-solid-field-background-color;
        padding: $rpl-space-4;
        border: $rpl-search-form-solid-field-border-color;
        border-radius: $rpl-search-form-element-border-radius;
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

        #{$root}--solid & {
          display: none;
        }
      }
    }

    &__show-filters {
      @include rpl_typography_ruleset($rpl-search-form-show-filters-ruleset);
      color: $rpl-search-form-show-filters-text-color;
      margin: $rpl-search-form-show-filters-margin;
      background: transparent;
      border: 0;
      display: block;
      cursor: pointer;
      @include rpl_print_hidden;

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
      @include rpl_print_hidden;
    }

  }
</style>
