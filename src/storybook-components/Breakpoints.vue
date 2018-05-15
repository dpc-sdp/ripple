<template>
  <div>
    <h2>Breakpoints</h2>
    <p>Resize browser window to change in-use breakpoints.</p>
    <ul>
      <li v-for="(point, index) in breakpoints" :key="index" for="" :class="'breakpoint-' +  point">
        <code>{{ point }}</code>
      </li>
    </ul>
    <div class="breakpoint-indicator">
      <p>Current screen width: {{ currentWidth }}px</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SBreakpoints',
  props: {
    breakpoints: Array
  },
  data: function () {
    return {
      currentWidth: 0
    }
  },
  methods: {
    updateSize: function () {
      this.currentWidth = window.innerWidth
    }
  },
  mounted: function () {
    window.addEventListener('resize', this.updateSize)
    this.updateSize()
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.updateSize)
  }
}
</script>

<style lang="scss" scoped>
@import "~@dpc-sdp/ripple-global/style";

.breakpoint-indicator {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  border-top: 1px solid black;

  &::before {
    content: '←';
  }

  &::after {
    content: '→';
  }
}

@each $breakpoint-name, $breakpoint-value in $rpl-breakpoints {
  .breakpoint-#{$breakpoint-name} {
    &::before {
      content: '✗';
      margin-right: 5px;
      display: inline;
      color: red;
      @include rpl_breakpoint($breakpoint-name) {
        content: '✔';
        color: green;
      }
    }
    code {
      &::after {
        content: ' (#{$breakpoint-value})';
        display: inline;
      }
    }
  }
}

</style>
