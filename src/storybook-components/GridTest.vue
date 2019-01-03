<template>
  <div>
    <h2>Grid Tests</h2>
    <h3>Grid with overflow</h3>
    <div class="box">
      <RplContainer class="demo-container rpl-site-constrain--on-all">
        <rpl-row row-gutter>
          <rpl-col v-for="n in 4" :key="n" cols="3">
            <div class="filler" :class="{ 'filler--has-overflow': overflows}">{{ n }}</div>
          </rpl-col>
        </rpl-row>
      </RplContainer>
    </div>
    <h3>Grid with no overflow</h3>
    <div class="box">
      <RplContainer class="demo-container rpl-site-constrain--on-all rpl-container--no-overflow">
        <rpl-row row-gutter>
          <rpl-col v-for="n in 4" :key="n" cols="3">
            <div class="filler" :class="{ 'filler--has-overflow': overflows}">{{ n }}</div>
          </rpl-col>
        </rpl-row>
      </RplContainer>
    </div>
    <h3>Grid with overflow</h3>
    <div class="box">
      <RplContainer class="demo-container rpl-site-constrain--on-all">
        <rpl-row row-gutter>
          <rpl-col cols="full" :colsBp="cols">
            <div class="filler" :class="{'filler--has-overflow': overflows}">Card</div>
          </rpl-col>
          <rpl-col cols="full" :colsBp="cols">
            <div class="filler" :class="{'filler--has-overflow': overflows}">Card</div>
          </rpl-col>
          <rpl-col cols="full" :colsBp="cols">
            <div class="filler" :class="{'filler--has-overflow': overflows}">Card</div>
          </rpl-col>
        </rpl-row>
      </RplContainer>
    </div>
    <h3>Grid with no overflow</h3>
    <div class="box">
      <RplContainer class="demo-container rpl-site-constrain--on-all rpl-container--no-overflow">
        <rpl-row row-gutter>
          <rpl-col cols="full" :colsBp="cols">
            <div class="filler" :class="{'filler--has-overflow': overflows}">Card</div>
          </rpl-col>
          <rpl-col cols="full" :colsBp="cols">
            <div class="filler" :class="{'filler--has-overflow': overflows}">Card</div>
          </rpl-col>
          <rpl-col cols="full" :colsBp="cols">
            <div class="filler" :class="{'filler--has-overflow': overflows}">Card</div>
          </rpl-col>
        </rpl-row>
      </RplContainer>
    </div>
    <h3>Nested Grid</h3>
    <div class="box">
      <RplContainer class="demo-container rpl-site-constrain--on-all">
        <rpl-row row-gutter>
          <rpl-col v-for="n in 2" :key="n" cols="6">
            <RplContainer class="demo-container">
              <rpl-row row-gutter>
                <rpl-col v-for="n in 2" :key="n" cols="6">
                  <div class="filler" :class="{ 'filler--has-overflow': overflows}">{{ n }}</div>
                </rpl-col>
              </rpl-row>
            </RplContainer>
          </rpl-col>
        </rpl-row>
      </RplContainer>
    </div>
    <h3>Nested Grid with no overflow</h3>
    <div class="box">
      <RplContainer class="demo-container rpl-site-constrain--on-all rpl-container--no-overflow">
        <rpl-row row-gutter>
          <rpl-col v-for="n in 2" :key="n" cols="6">
            <RplContainer class="demo-container rpl-container--no-overflow">
              <rpl-row row-gutter>
                <rpl-col v-for="n in 2" :key="n" cols="6">
                  <div class="filler" :class="{ 'filler--has-overflow': overflows}">{{ n }}</div>
                </rpl-col>
              </rpl-row>
            </RplContainer>
          </rpl-col>
        </rpl-row>
      </RplContainer>
    </div>
  </div>
</template>

<script>
import { RplContainer, RplRow, RplCol } from '@dpc-sdp/ripple-grid'

export default {
  components: { RplContainer, RplRow, RplCol },
  props: {
    overflows: Boolean
  },
  data: function () {
    return {
      cols: {
        m: 6,
        l: 4,
        xxxl: 3
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@dpc-sdp/ripple-global/style";

.box {
  outline: 20px solid rgba(0, 0, 0, .2);
  width: calc(100% - 40px);
  margin-left: 20px;
  margin-bottom: 40px;
}

.filler {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
  background-color: rgba(255, 255, 255, 0.25);

  &--has-overflow {
    &:before {
      content: 'top overflow';
      text-align: center;
      font-size: 10px;
      display: block;
      width: 80%;
      height: 40px;
      background-color: orange;
      position: absolute;
      top: -35px;
      left: 10%;
    }
    &:after {
      content: 'bottom overflow';
      text-align: center;
      font-size: 10px;
      display: block;
      width: 80%;
      height: 40px;
      background-color: yellow;
      position: absolute;
      top: calc(100% - 5px);
      left: 10%;
    }
  }
}

.rpl-container {
  background-color: rgba(255, 0, 0, .25);
}

.rpl-row {
  background-color: rgba(255, 255, 0, .25);
}

.rpl-col {
  background-color: rgba(0, 255, 255, .25);
}

@mixin uncovered_alignment($bp: '') {
  $modifier: '';

  @if $bp != '' {
    $modifier: #{'-' + $bp};
  }

  .rpl-col--full#{$modifier} {
    margin-left: 0;
    margin-right: 0;
    width: 100%;
  }

  @for $col from 1 through rpl_grid_get_columns($rpl-grid) {
    @if $col <= rpl_grid_get_columns($rpl-grid) {
      .rpl-col--#{$col}#{$modifier} {

        // Set Width based on size including columns
        $gutter: 1.5rem;
        $columnWidth: $col / rpl_grid_get_columns($rpl-grid);
        width: calc(((100% + #{$gutter}) * #{$columnWidth}) - #{$gutter});

        // Set first and last column of every row to not include margin
        $columnCount: rpl_grid_get_columns($rpl-grid) / $col;
        // First Element
        &:nth-child(#{$columnCount}n + 1) {
          margin-left: 0;
          margin-right: $gutter / 2;
        }
        // Middle Elements
        @if $columnCount >= 3 {
          @for $columnStep from 2 through ($columnCount - 1) {
            &:nth-child(#{$columnCount}n + #{$columnStep}) {
              margin-left: $gutter / 2;
              margin-right: $gutter / 2;
            }
          }
        }
        // Last Element
        &:nth-child(#{$columnCount}n + #{$columnCount}) {
          margin-left: $gutter / 2;
          margin-right: 0;
        }
      }
    }
  }
}

.rpl-container--no-overflow {
  overflow: visible;

  .rpl-row {
    margin-left: 0;
    margin-right: 0;
    width: 100%;
  }

  @each $bp, $bp-val in $rpl-breakpoints {
    @if $bp-val == 0 {
      @include uncovered_alignment;
    } @else {
      @include rpl_breakpoint($bp) {
        @include uncovered_alignment($bp);
      }
    }
  }
}

</style>
