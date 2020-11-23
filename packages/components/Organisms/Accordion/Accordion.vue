<template>
  <div class="rpl-accordion">
    <h2 class="rpl-accordion__title-top" :id="titleId" v-if="title">{{ title }}</h2>
    <div class="rpl-accordion__collapse">
      <a href="" @click.prevent="collapseExpandAll" v-html="collapseExpandLabel" />
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
        <transition
          name="accordion"
          @enter="start"
          @after-enter="end"
          @before-leave="start"
          @after-leave="end"
        >
          <div class="rpl-accordion__content" v-show="accordionIsOpen(index)" :id="accordionId(index)">
            <rpl-markup class="rpl-accordion__content-inner"  :html="accordion.content" />
          </div>
        </transition>
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
        <transition
          name="accordion"
          @enter="start"
          @after-enter="end"
          @before-leave="start"
          @after-leave="end"
        >
          <div class="rpl-accordion__content" v-show="accordionIsOpen(index)" :id="accordionId(index)">
            <rpl-markup class="rpl-accordion__content-inner" :html="accordion.content" />
          </div>
        </transition>
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
      isCollapsed: false
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
    },
    collapseExpandLabel () {
      if (this.isCollapsed || this.isAllItemOpen) {
        return 'Close all'
      }

      return 'Open all'
    }
  },
  methods: {
    accordionClick: function (index) {
      if (this.single) {
        let strIndex = index.toString()
        for (let item in this.itemOpen) {
          if (item !== strIndex) {
            Vue.set(this.itemOpen, item, false)
          }
        }
      }
      Vue.set(this.itemOpen, index, !this.itemOpen[index])
    },
    collapseExpandAll () {
      this.isCollapsed = true
      if (this.isAllItemOpen) {
        this.isCollapsed = false
      }

      for (let item in this.itemOpen) {
        Vue.set(this.itemOpen, item, this.isCollapsed)
      }
    },
    start (el) {
      el.style.height = el.scrollHeight + 'px'
    },
    end (el) {
      el.style.height = ''
    },
    accordionIsOpen: function (index) {
      return (this.itemOpen[index] === undefined) ? false : this.itemOpen[index]
    },
    accordionId (index) {
      return `rpl-accordion-${this.getIdFromLocalRegistry(index)}`
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
      @include rpl_typography_font('xs', 1em, 'bold');

      a, a:hover:focus:active {
        text-decoration: none;
        color: $rpl-accordion-collapse-color;
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
      @each $bp, $val in $rpl-accordion-content-padding {
        @include rpl_breakpoint($bp) {
          padding: $val;
        }
      }

      @media print {
        display: block !important;
        padding: 0 ($rpl-space * 5);
      }

      &.accordion-enter-active,
      &.accordion-leave-active {
        transition: height .5s;
        overflow: hidden;
      }

      &.accordion-enter,
      &.accordion-leave-to {
        height: 0 !important;
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
