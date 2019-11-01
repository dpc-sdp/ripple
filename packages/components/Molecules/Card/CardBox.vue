<template>
  <div class="rpl-card-box" :class="childErrorClass">
    <rpl-dev-error v-if="gotChildError" :errors="childErrors" />
    <div class="rpl-card-box__items">
      <div class="rpl-card-box__item" v-for="(item, index) in cards" :key="index">
        <component :is="item.name" v-bind="item.data"></component>
      </div>
    </div>
  </div>
</template>

<script>
import catchChildError from '@dpc-sdp/ripple-global/mixins/catch-child-error'
import { RplDevError } from '@dpc-sdp/ripple-global'
import RplCardEmergencyContact from './CardEmergencyContact.vue'

export default {
  name: 'RplCardBox',
  components: {
    RplCardEmergencyContact,
    RplDevError
  },
  props: {
    cards: Array,
    catchChildError: {
      type: Boolean,
      default: true
    }
  },
  mixins: [catchChildError]
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

$rpl-card-box-padding: ($rpl-space * 15) 0 ($rpl-space * 9) !default;
$rpl-card-box-padding-s: ($rpl-space * 9) ($rpl-space * 7) $rpl-space-3 !default;
$rpl-card-box-padding-xs: ($rpl-space * 6) ($rpl-space * 5) 0 !default;
$rpl-card-box-margin: 0 (-$rpl-space-3) !default;
$rpl-card-box-background-color: rpl-color('light_neutral') !default;
$rpl-card-box-item-margin:  0 $rpl-space-3 $rpl-space * 6 !default;

.rpl-card-box {
  background-color: $rpl-card-box-background-color;
  margin: $rpl-card-box-margin;

  @include rpl_breakpoint('xs') {
    padding: $rpl-card-box-padding-xs;
  }

  @include rpl_breakpoint('s') {
    padding: $rpl-card-box-padding-s;
  }

  @include rpl_breakpoint('m') {
    padding: $rpl-card-box-padding;
  }

  @include rpl_print_hidden;

  &__items {
    display: flex;
    flex-wrap: wrap;

    @include rpl_breakpoint('l') {
      justify-content: center;
    }
  }

  &__item {
    margin: $rpl-card-box-item-margin;
    width: calc(100% - #{$rpl-space * 6} );

    @include rpl_breakpoint('s') {
      width: calc(50% - #{$rpl-space * 6} );
    }

    @include rpl_breakpoint('xl') {
      width: calc(25% - #{$rpl-space * 6} );
    }
  }
}
</style>
