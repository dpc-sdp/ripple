<template>
  <div class="rpl-accordion">
    <h2 class="rpl-accordion__title-top" :id="titleId" v-if="title">{{ title }}</h2>
    <div class="rpl-accordion__collapse">
      <button class="rpl-accordion__collapse-btn" @click="closeOpenAll">{{ closeOpenLabel }}</button>
    </div>
    <ol class="rpl-accordion__list" v-if="type === 'numbered'">
      <li class="rpl-accordion__list-item" v-for="(accordion, index) in accordions" :key="index" :class="{'rpl-accordion__list-item--expanded': accordionIsOpen(index)}">
        <h2 class="rpl-accordion__title" :class="{'rpl-accordion__title--expanded': accordionIsOpen(index)}">
          <button @click="accordionClick(index)" class="rpl-accordion__button" :class="{'rpl-accordion__button--expanded': accordionIsOpen(index)}" :aria-expanded="accordionIsOpen(index).toString()" :aria-controls="accordionId(index)">
            <span aria-hidden="true" class="rpl-accordion__title-number">{{ (index + 1) }}</span>
            <span>{{ accordion.title }}</span>
            <rpl-icon symbol="arrow_down_tertiary" color="primary" class="rpl-accordion__icon" :class="{'rpl-accordion__icon--expanded': accordionIsOpen(index)}"/>
          </button>
        </h2>
        <div
          class="rpl-accordion__content"
          :id="accordionId(index)"
          :ref="accordionId(index)"
        >
          <rpl-markup class="rpl-accordion__content-inner" :html="accordion.content" />
        </div>
      </li>
    </ol>
    <ul class="rpl-accordion__list" v-else>
      <li class="rpl-accordion__list-item" v-for="(accordion, index) in accordions" :key="index" :class="{'rpl-accordion__list-item--expanded': accordionIsOpen(index)}">
        <h2 class="rpl-accordion__title" :class="{'rpl-accordion__title--expanded': accordionIsOpen(index)}">
          <button @click="accordionClick(index)" class="rpl-accordion__button" :class="{'rpl-accordion__button--expanded': accordionIsOpen(index)}" :aria-expanded="accordionIsOpen(index).toString()" :aria-controls="accordionId(index)">
            <span class="rpl-accordion__button-text">{{ accordion.title }}</span>
            <rpl-icon symbol="arrow_down_tertiary" color="primary" class="rpl-accordion__icon" :class="{'rpl-accordion__icon--expanded': accordionIsOpen(index)}"/>
          </button>
        </h2>
        <div
          class="rpl-accordion__content"
          :id="accordionId(index)"
          :ref="accordionId(index)"
        >
          <rpl-markup class="rpl-accordion__content-inner" :html="accordion.content" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import uniqueid from '@dpc-sdp/ripple-global/mixins/uniqueid'
import RplIcon from '@dpc-sdp/ripple-icon'
import RplMarkup from '@dpc-sdp/ripple-markup'
import Vue from 'vue'
import { getAnchorLinkName } from '@dpc-sdp/ripple-global/utils/helpers.js'

export default {
  name: 'RplAccordion',
  props: {
    title: String,
    type: String,
    accordions: Array,
    single: Boolean
  },
  components: {
    RplIcon,
    RplMarkup
  },
  mixins: [uniqueid],
  data: function () {
    return {
      itemOpen: {},
      isCollapsed: false,
      closeOpenLabel: 'Open all'
    }
  },
  mounted () {
    for (const index in this.accordions) {
      Vue.set(this.itemOpen, index, false)
    }
  },
  computed: {
    titleId () {
      if (this.title) {
        return getAnchorLinkName(this.title)
      }
    },
    isAllItemOpen () {
      for (const index in this.itemOpen) {
        if (!this.itemOpen[index]) {
          return false
        }
      }

      return true
    }
  },
  methods: {
    accordionClick: function (index) {
      if (this.single) {
        let strIndex = index.toString()
        for (let item in this.itemOpen) {
          if (item !== strIndex) {
            this.collapseContent(item)
            Vue.set(this.itemOpen, item, false)
          }
        }
      }

      this.toggleContent(index)
      Vue.set(this.itemOpen, index, !this.itemOpen[index])
      this.isCollapsed = this.isAllItemOpen
    },
    closeOpenAll () {
      this.isCollapsed = !this.isCollapsed

      for (let item in this.itemOpen) {
        Vue.set(this.itemOpen, item, this.isCollapsed)
        if (this.isCollapsed) {
          this.expandContent(item)
        } else {
          this.collapseContent(item)
        }
      }
    },
    accordionIsOpen: function (index) {
      return (this.itemOpen[index] === undefined) ? false : this.itemOpen[index]
    },
    accordionId (index) {
      return `rpl-accordion-${this.getIdFromLocalRegistry(index)}`
    },
    expandContent (index) {
      const ref = this.accordionId(index)
      const section = this.$refs[ref]
      if (section[0]) {
        // Set fixed height for transition
        section[0].style.height = section[0].scrollHeight + 'px'
        section[0].style.visibility = 'visible'
        setTimeout(function () {
          // Remove the fixed height after transition so it can be responsive
          section[0].style.height = 'auto'
        }, 500)
      } else {
        throw new Error('Something is wrong while getting the height of the referred content')
      }
    },
    collapseContent (index) {
      const ref = this.accordionId(index)
      const section = this.$refs[ref]
      if (section[0]) {
        // Set fixed height for transition
        section[0].style.height = section[0].scrollHeight + 'px'
        setTimeout(function () {
          section[0].style.height = ''
          section[0].style.visibility = ''
        }, 1)
      } else {
        throw new Error('Something is wrong while getting the height of the referred content')
      }
    },
    toggleContent (index) {
      if (this.itemOpen[index]) {
        this.collapseContent(index)
      } else {
        this.expandContent(index)
      }
    }
  },
  watch: {
    isCollapsed (val) {
      if (val) {
        this.closeOpenLabel = 'Close all'
      } else {
        this.closeOpenLabel = 'Open all'
      }
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-accordion-title-ruleset: (
    'xs': ('s', 1.5em, 'bold'),
    's': ('l', 1.2em, 'bold')
  ) !default;
  $rpl-accordion-content-ruleset: (
    'xs': ('xs', 1.4em, 'regular'),
    's': ('s', 1.5em, 'regular')
  ) !default;
  $rpl-accordion-background-color: rpl_color('white') !default;
  $rpl-accordion-border-image: rpl_gradient('primary_gradient_0') !default;
  $rpl-accordion-border: 1px solid rpl_color('mid_neutral_1') !default;
  $rpl-accordion-button-padding: (
    'xs': ($rpl-space * 4) $rpl-component-padding-xs,
    's': $rpl-component-padding-s,
    'm': ($rpl-space * 7) ($rpl-space * 9)
  ) !default;
  $rpl-accordion-text-padding: (
    'xs': 0 $rpl-component-padding-xs 0 0,
    's': 0 $rpl-component-padding-s 0 0,
    'm': 0 ($rpl-space * 9) 0 0
  ) !default;
  $rpl-accordion-content-padding: (
    'xs': 0 $rpl-component-padding-xs,
    's': 0 $rpl-component-padding-s,
    'm': 0 ($rpl-space * 9)
  ) !default;
  $rpl-accordion-button-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-accordion-button-text-color-hover: rpl_color('primary') !default;
  $rpl-accordion-button-text-color-expanded: rpl_color('secondary') !default;
  $rpl-accordion-button-number-text-color: rpl_color('dark_neutral_1') !default;
  $rpl-accordion-button-number-margin: 0 ($rpl-space * 5) 0 0 !default;
  $rpl-accordion-content-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-accordion-content-inner-padding: 0 0 rem(57px) !default;
  $rpl-accordion-collapse-padding: rem(10px) 0 !default;
  $rpl-accordion-collapse-color: rpl_color('primary') !default;

  .rpl-accordion {
    &__collapse {
      text-align: right;
      padding: $rpl-accordion-collapse-padding;
    }

    &__collapse-btn {
      text-decoration: none;
      color: $rpl-accordion-collapse-color;
      background: none;
      border: none;
      @include rpl_typography_font('xs', 1em, 'bold');

      &:hover {
        text-decoration: underline;
      }
    }

    &__title-top {
      margin-top: 0;
      // TODO: Lines below should be removed on merging of SDPA-1810.
      @include rpl_mobile_padding;
      @include rpl_breakpoint(m) {
        padding-left: 0;
        padding-right: 0;
      }
    }

    &__list {
      margin: 0;
      padding: 0;
      background-color: $rpl-accordion-background-color;

      @media print {
        margin: $rpl-space-4 0;
      }
    }

    &__list-item {
      list-style: none;
      position: relative;
      border: $rpl-accordion-border;
      border-bottom: 0;

      &::before {
        content: '';
        display: inline-block;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        background-image: $rpl-accordion-border-image;
        transition: width .25s;

        @media print {
          display: none;
        }
      }

      &--expanded {
        &::before {
          width: rem(8px);
        }
      }

      &:last-child {
        border-bottom: $rpl-accordion-border;
      }
    }

    &__button {
      @include rpl_typography_ruleset($rpl-accordion-title-ruleset);
      @include rpl_text_color($rpl-accordion-button-text-color);
      background: transparent;
      border: 0;
      width: 100%;
      box-sizing: border-box;
      text-align: left;
      display: flex;
      align-items: center;
      position: relative;
      z-index: 1;
      cursor: pointer;
      @each $bp, $val in $rpl-accordion-button-padding {
        @include rpl_breakpoint($bp) {
          padding: $val;
        }
      }

      @media print {
        padding: $rpl-space-3 ($rpl-space * 5);
      }

      &:hover,
      &:focus {
        @include rpl_text_color($rpl-accordion-button-text-color-hover);
      }

      &--expanded {
        @include rpl_text_color($rpl-accordion-button-text-color-expanded);
      }
    }

    &__button-text {
      width: 100%;
      box-sizing: border-box;
      @each $bp, $val in $rpl-accordion-text-padding {
        @include rpl_breakpoint($bp) {
          padding: $val;
        }
      }
    }

    &__title-number {
      @include rpl_text_color($rpl-accordion-button-number-text-color);
      margin: $rpl-accordion-button-number-margin;
    }

    &__title {
      margin: 0;
    }

    &__content {
      @include rpl_typography_ruleset($rpl-accordion-content-ruleset);
      @include rpl_text_color($rpl-accordion-content-text-color);
      box-sizing: border-box;
      // Firefox has issue to render some iframe inside container which has display:none
      // https://bugzilla.mozilla.org/show_bug.cgi?id=941146
      visibility: hidden;
      overflow:auto;
      height: 0;
      transition: height .5s, visibility .5s;

      @each $bp, $val in $rpl-accordion-content-padding {
        @include rpl_breakpoint($bp) {
          padding: $val;
        }
      }

      @media print {
        display: block !important;
        padding: 0 ($rpl-space * 5);
      }
    }

    &__content-inner {
      padding: $rpl-accordion-content-inner-padding;

      @media print {
        display: block !important;
        padding: 0 0 ($rpl-space * 5);
      }
    }

    &__icon {
      margin-left: auto;
      transition: transform .25s;

      @media print {
        fill: rpl-color('black');
      }

      &--expanded {
        transform: rotate(-180deg);

        @media print {
          transform: rotate(0deg);
        }
      }
    }
  }

</style>
