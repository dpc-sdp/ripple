<template>
  <div class="expand-btn ol-control" v-on:click="clickExpand">
    <button>
      <div :class="buttonIcon"></div>
    </button>
  </div>
</template>

<script>
export default {
  name: 'TideMapExpandButton',
  props: {
    expanded: Boolean
  },
  computed: {
    buttonIcon() {
      return this.expanded ? 'chevron top' : 'chevron bottom'
    }
  },
  methods: {
    clickExpand() {
      this.$emit('expand-clicked')
    }
  }
}
</script>

<style lang="scss">
@import '~@dpc-sdp/ripple-global/scss/settings';
@import '~@dpc-sdp/ripple-global/scss/tools';
.expand-btn {
  button {
    font-size: 1.5em;
    &:focus {
      outline: none; // Hiding the orange outline cause by chevron when focussed.
    }
  }
}
.chevron {
  display: inline-block;
  width: 10px;
  height: 10px;
  position: relative;
  border-right: 3px solid white;
  border-bottom: 3px solid white;
  &.top {
    transform: rotate(-135deg);
    top: 0.1em;
  }
  &.bottom {
    transform: rotate(-315deg);
    top: -0.1em;
  }
}
</style>
