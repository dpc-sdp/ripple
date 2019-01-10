<template>
  <div class="demo-content">
    <h1>Breakpoints</h1>
    <p>Resize browser window to change in-use breakpoints.</p>
    <h2>CSS breakpoint</h2>
    <ul class="breakpoints breakpoints--css">
      <li v-for="(point, index) in breakpoints" :key="index" for="" :class="'breakpoint-' +  point">
        <code>{{ point }}</code>
      </li>
    </ul>
    <h2>JS breakpoint</h2>
    <ul class="breakpoints breakpoints--js">
      <li v-for="(point, index) in breakpoints" :key="index" :class="['breakpoint-' +  point, $breakpoint[point] ? 'tick' : 'cross']">
        <code>{{ point }}</code>
      </li>
    </ul>
    <div class="breakpoint-indicator">
      <p>Current screen width: {{ currentWidth }}px</p>
    </div>
  </div>
</template>

<script>
import breakpoint from './../../packages/Atoms/Global/mixins/breakpoint'

export default {
  name: 'SBreakpoints',
  mixins: [breakpoint],
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
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

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

@mixin cross {
  &::before {
    content: '✗';
    margin-right: 5px;
    display: inline;
    color: red;
  }
}

@mixin tick {
  &::before {
    content: '✔';
    margin-right: 5px;
    display: inline;
    color: green;
  }
}

.cross {
  @include cross;
}

.tick {
  @include tick;
}

@each $breakpoint-name, $breakpoint-value in $rpl-breakpoints {
  .breakpoints {
    .breakpoint-#{$breakpoint-name} {
      code {
        &::after {
          content: ' (#{$breakpoint-value})';
          display: inline;
        }
      }
    }

    &--css {
      .breakpoint-#{$breakpoint-name} {
        @include cross;

        @include rpl_breakpoint($breakpoint-name) {
          @include tick;
        }
      }
    }
  }
}

</style>
