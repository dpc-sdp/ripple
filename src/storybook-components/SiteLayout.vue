<template>
  <rpl-base-layout class="demo">
    <template slot="header">
      <div class="sub-content demo-header">
        site header
      </div>
    </template>
    <rpl-page-layout :sidebar="sidebar" backgroundGraphic="/bggraphic.png" class="main rpl-container">
      <template slot="aboveContent">
        <div class="banner-hero rpl-site-constrain--on-all">
          <div class="sub-content">banner hero</div>
        </div>
        <div class="banner-primary rpl-site-constrain--on-all">
          <div class="sub-content">banner primary</div>
        </div>
      </template>
      <rpl-row row-gutter class="demo-main">
        <rpl-col cols="full" :colsBp="sidebar ? cardColsWithSidebar : cardCols">
          <div class="card">
            <div class="image">Image</div>
            card
          </div>
        </rpl-col>
        <rpl-col cols="full" :colsBp="sidebar ? cardColsWithSidebar : cardCols"><div class="card">card</div></rpl-col>
        <rpl-col cols="full" :colsBp="sidebar ? cardColsWithSidebar : cardCols"><div class="card">card</div></rpl-col>
        <rpl-col cols="full" :colsBp="sidebar ? cardColsWithSidebar : cardCols"><div class="card">card</div></rpl-col>
        <rpl-col cols="full" :colsBp="sidebar ? cardColsWithSidebar : cardCols"><div class="card">card</div></rpl-col>
        <rpl-col cols="full" :colsBp="sidebar ? cardColsWithSidebar : cardCols"><div class="card">card</div></rpl-col>
        <rpl-col cols="full" :colsBp="defaultCols">
          <div>
            other component
          </div>
        </rpl-col>
        <rpl-col cols="full" :colsBp="defaultCols">
          Nested grids
          <rpl-row>
            <rpl-col cols="full" :colsBp="{m:6,l:3}">
              <div>1/4 col</div>
            </rpl-col>
            <rpl-col cols="full" :colsBp="{m:6,l:3}">
              <div>1/4 col</div>
            </rpl-col>
            <rpl-col cols="full" :colsBp="{m:6,l:3}">
              <div>1/4 col</div>
            </rpl-col>
            <rpl-col cols="full" :colsBp="{m:6,l:3}">
              <div>1/4 col</div>
            </rpl-col>
          </rpl-row>
        </rpl-col>
        <rpl-col cols="full" :colsBp="defaultCols">
          <div class="cta" :class="sidebar ? 'rpl-edge--below-l rpl-site-constrain--below-l' : 'rpl-edge--on-all rpl-site-constrain--on-all'">
            <div class="sub-content">
              edge style call to action
            </div>
          </div>
        </rpl-col>
      </rpl-row>
      <template slot="sidebar">
        <div class="sub-content">Sidebar content</div>
        <div class="sub-content">Sidebar content</div>
        <div class="sub-content">Sidebar content</div>
      </template>
      <template slot="belowContent">
        <div class="banner-secondary rpl-site-constrain--on-all">
          <div class="sub-content">banner secondary</div>
        </div>
      </template>
    </rpl-page-layout>
    <template slot="footer">
      <div class="sub-content demo-header">
        site footer
      </div>
    </template>
  </rpl-base-layout>
</template>

<script>
import { RplBaseLayout, RplPageLayout } from '@dpc-sdp/ripple-layout'
import { RplContainer, RplRow, RplCol } from '@dpc-sdp/ripple-grid'

export default {
  components: {
    RplBaseLayout,
    RplPageLayout,
    RplContainer,
    RplRow,
    RplCol
  },
  props: {
    'sidebar': Boolean,
    'cardCols': Object,
    'cardColsWithSidebar': Object,
    'defaultCols': {}
  }
}
</script>

<style lang="scss" scoped>
@import '~@dpc-sdp/ripple-global/scss/color';
@import '~@dpc-sdp/ripple-global/scss/variables';

$_section-gutter: $rpl-space;

.demo-header,
.demo-footer {
  background-color: rpl-color(dark_neutral);
  text-align: center;
}

.sub-content {
  background: rpl-color(mid_neutral_1);
}

.rpl-edge--below-l,
.rpl-edge--on-all {
  background-color: rpl-color(dark_neutral);
}

.image {
  background-color: rpl-color(light_neutral);
  border: 1px solid rpl-color(dark_neutral);
}

.rpl-col {
  background-color: rpl-color(mid_neutral_1);
}

.rpl-content {
  background: none;
}
</style>
