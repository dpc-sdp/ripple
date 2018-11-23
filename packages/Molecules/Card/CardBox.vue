<template>
  <div class="rpl-card-box">
    <div class="rpl-card-box-items">
      <div class="rpl-card-box-item" v-for="(item, index) in cards" :key="index">
        <component :is="item.name" v-bind="item.data" :trimFieldEventBus="isTrimmed(item.name) ? eventBus : null" :trimFieldUpdateOnResize="false"></component>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import RplCardEmergencyContact from './CardEmergencyContact.vue'

export default {
  name: 'RplCardBox',
  props: {
    cards: Array
  },
  components: {
    RplCardEmergencyContact
  },
  data () {
    return {
      eventBus: new Vue(),
      // Define which cards use cardtrimfield. These will be given the eventBus
      // object and their resize will be invoked on carousel size changes.
      trimmedCards: [
        'rpl-card-emergency-contact'
      ]
    }
  },
  methods: {
    isTrimmed (name) {
      return (this.trimmedCards.indexOf(name) >= 0)
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/style";

$rpl-card-box-padding: ($rpl-space * 15) 0 ($rpl-space * 9) !default;
$rpl-card-box-margin: 0 (-$rpl-space-3) !default;
$rpl-card-box-background-color: rgba(rpl-color('primary'), .15) !default;
$rpl-card-box-item-margin:  0 $rpl-space-3 $rpl-space * 6;

.rpl-card-box {
  background-color: $rpl-card-box-background-color;
  margin: $rpl-card-box-margin;

  @include rpl_breakpoint('xs') {
    padding: ($rpl-space * 6) 0 0;
  }

  @include rpl_breakpoint('s') {
    padding: ($rpl-space * 9) 0 ($rpl-space * 3);
  }
  
  @include rpl_breakpoint('m') {
    padding: $rpl-card-box-padding;
  }

  &-items {
    display: flex;
    flex-wrap: wrap;
    
    @include rpl_breakpoint('l') {
      justify-content: center;
    }
  }

  &-item {
    margin: $rpl-card-box-item-margin;
    width: calc(100% - 1.5rem);

    @include rpl_breakpoint('s') {
      width: calc(50% - 1.5rem);
    }

    @include rpl_breakpoint('l') {
      width: calc(25% - 1.5rem);
    }
  }
}
</style>
