<template>
  <button class="rpl-expander" @click="onExpandCollapse">
    <div class="rpl-expander__title">
      {{title}}
      <rpl-icon
      role="presentation"
      class="rpl-expander__icon"
      :class="{'rpl-expander__icon--expanded': expanded}"
      symbol="down" color="primary" size="l" />
    </div>
    <transition
      name="rpl-expander"
      @enter="transitionStart"
      @after-enter="transitionEnd"
      @before-leave="transitionStart"
      @after-leave="transitionEnd"
    >
      <div class="rpl-expander__inner" v-show="expanded">
        <slot name="inner" />
      </div>
    </transition>
  </button>
</template>

<script>
import { RplIcon } from '@dpc-sdp/ripple-icon'

export default {
  name: 'RplExpander',
  components: {
    RplIcon
  },
  props: {
    title: {
      type: String
    },
    expanded: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onExpandCollapse: function () {
      this.$emit('expanded', !this.expanded)
    },
    transitionStart (el) {
      el.style.height = el.scrollHeight + 'px'
    },
    transitionEnd (el) {
      el.style.height = ''
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  .rpl-expander {
    @include rpl_btn_reset();
    display: block;
    font-family: "VIC-Bold", "Arial", "Helvetica", "sans-serif";
    color: rpl-color('primary');

    &__icon {
      margin-left: $rpl-space-2;
      transition: transform .25s;

      &--expanded {
        transform: rotate(-180deg);
      }
    }

    &__inner {
      &.toggle-list-enter-active,
      &.toggle-list-leave-active {
        transition: height .5s;
        overflow: hidden;
      }

      &.toggle-list-enter,
      &.toggle-list-leave-to {
        height: 0 !important;
      }
    }
  }
</style>
