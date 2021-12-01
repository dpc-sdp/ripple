<template>
  <div class="rpl-tabs">
    <button class="rpl-tabs__tab" :class="{'rpl-tabs__tab--active': tab.key === activeTab }" v-for="tab in tabs" :key="`tab-${tab.key}`" @click="switchTab(tab.key)">
      <span class="rpl-tabs__tab-label">{{tab.label}}</span>
      <rpl-icon aria-hidden="true" v-if="tab.icon" class="rpl-tabs__tab-icon" :symbol="tab.icon" :color="tab.key === activeTab ? 'primary' : 'extra_dark_neutral'" size="m" />
    </button>
  </div>
</template>

<script>
import { RplIcon } from '@dpc-sdp/ripple-icon'
export default {
  components: {
    RplIcon
  },
  props: {
    tabs: {
      type: Array,
      required: true,
      validator: function (value) {
        return Array.isArray(value) && value.every(tab => tab.hasOwnProperty('key') && tab.hasOwnProperty('label'))
      }
    },
    activeTab: {
      type: String
    }
  },
  methods: {
    switchTab (key) {
      this.$emit('rpl-tab-switch', key)
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

$rpl-tabs-tab-ruleset: ('s', 1em, 'regular') !default;
$rpl-tabs-tab-active-ruleset: ('s', 1em, 'bold') !default;
$rpl-tabs-tab-active-color: rpl-color('primary') !default;
$rpl-tabs-tab-inactive-color: rpl-color('extra_dark_neutral') !default;
$rpl-tabs-divider-border: 1px solid rpl-color('light_neutral') !default;

.rpl-tabs {
  border-bottom: $rpl-tabs-divider-border;
  width: 100%;
  display: flex;
  flex-direction: row;
  &__tab {
    @include rpl_btn_reset();
    cursor: pointer;
    padding: $rpl-space-3 $rpl-space-4 $rpl-space-2 $rpl-space-4;
    border-bottom: $rpl-space solid transparent;
    border-top-left-radius: $rpl-space;
    border-top-right-radius: $rpl-space;
    color: $rpl-tabs-tab-inactive-color;
    text-align: center;

    @include rpl_typography_ruleset($rpl-tabs-tab-ruleset);

    @include rpl_breakpoint_down('l') {
      flex: 1 1;
    }

    &-icon {
      margin-left: $rpl-space;
      fill: currentColor;
    }
    &:focus {
      outline-width: 1px;
      outline-color: rpl-color('primary');
    }
    &:hover {
      background-color: rpl-color('light_neutral');
      border-color: rpl-color('light_neutral');
    }
    &--active {
      color: $rpl-tabs-tab-active-color;
      cursor: default;
      @include rpl_typography_ruleset($rpl-tabs-tab-active-ruleset);
      border-color: $rpl-tabs-tab-active-color;
      &:hover {
        border-color: $rpl-tabs-tab-active-color;
      }
    }
  }
}
</style>
