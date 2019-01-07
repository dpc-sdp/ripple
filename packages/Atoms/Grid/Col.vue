<template>
  <div :class="colClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    'cols': String,
    'colsBp': Object,
    'pull': Object,
    'push': Object
  },
  computed: {
    colClass: function () {
      let colClass = 'rpl-col'
      colClass = `${colClass} rpl-col--${this.cols}`
      for (let item in this.colsBp) {
        colClass = `${colClass} rpl-col--${this.colsBp[item]}-${item}`
      }
      for (let item in this.pull) {
        colClass = `${colClass} rpl-col--pull-${this.pull[item]}-${item}`
      }
      for (let item in this.push) {
        colClass = `${colClass} rpl-col--push-${this.push[item]}-${item}`
      }
      return colClass
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/style";

@mixin _rpl_bp_classes($bp: '') {
  $modifier: '';

  @if $bp != '' {
    $modifier: #{'-' + $bp};
  }

  &.rpl-col--full#{$modifier} {
    @include rpl_grid_full;
  }

  @for $col from 1 through rpl_grid_get_columns($rpl-grid) {
    @if $col <= rpl_grid_get_columns($rpl-grid) {
      &.rpl-col--#{$col}#{$modifier} {
        @include rpl_grid_column($col);
      }

      &.rpl-col--push-#{$col}#{$modifier} {
        @include rpl_grid_push($col);
      }

      &.rpl-col--pull-#{$col}#{$modifier} {
        @include rpl_grid_pull($col);
      }

      &.rpl-col--order-#{$col}#{$modifier} {
        @include rpl_grid_order($col);
      }
    }
  }
}

.rpl-col {
  @include rpl_grid_column;

  @each $bp, $bp-val in $rpl-breakpoints {
    @if $bp-val == 0 {
      @include _rpl_bp_classes;
    } @else {
      @include rpl_breakpoint($bp) {
        @include _rpl_bp_classes($bp);
      }
    }
  }
}
</style>
