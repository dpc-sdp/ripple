<template>
  <main class="rpl-page">

    <section
      class="rpl-above-content-container"
      :class="{ 'rpl-above-content-container--with-bg': heroBackgroundImage }"
    >
      <div class="rpl-above-content" :style="bgGraphic">
        <div class="rpl-above-content__inner" :style="backgroundImage">
          <div class="rpl-above-content__top">
            <slot name="breadcrumbs"></slot>
            <rpl-quick-exit v-if="quickexit" menuOffsetSelector=".rpl-above-content__inner" />
          </div>
          <slot name="aboveContent"></slot>
        </div>
      </div>

      <div class="rpl-above-content-two">
        <slot name="aboveContentTwo"></slot>
      </div>
    </section>

    <section id="rpl-main-content" class="rpl-content" :class="{'rpl-content--with-sidebar': sidebar, 'rpl-content--grey': bgGrey}">
      <div class="rpl-site-constrain--on-all">
        <rpl-row>
          <rpl-col cols="full" :colsBp="mainCols" class="rpl-main">
            <slot></slot>
          </rpl-col>
          <rpl-col cols="full" :colsBp="{l:4}" :push="{l:1}" class="rpl-sidebar" v-if="sidebar">
            <slot name="sidebar"></slot>
          </rpl-col>
        </rpl-row>
      </div>
    </section>

    <section class="rpl-below-content">
      <slot name="belowContent"></slot>
    </section>

  </main>
</template>

<script>
import RplQuickExit from './QuickExit'
import { RplContainer, RplRow, RplCol } from '@dpc-sdp/ripple-grid'

export default {
  components: { RplContainer, RplRow, RplCol, RplQuickExit },
  props: {
    'sidebar': Boolean,
    'quickExit': { type: Boolean, default: null },
    'backgroundColor': String,
    'heroBackgroundImage': String,
    'backgroundGraphic': String
  },
  data () {
    return {
      quickexit: false
    }
  },
  computed: {
    mainCols () {
      return this.sidebar === true ? {l: 7} : {}
    },
    bgGrey () {
      return this.backgroundColor === 'grey'
    },
    backgroundImage () {
      if (this.heroBackgroundImage) {
        return { 'background-image': 'url(' + this.heroBackgroundImage + ')' }
      }

      return {}
    },
    bgGraphic () {
      return this.backgroundGraphic ? { 'background-image': `url(${this.backgroundGraphic})` } : null
    }
  },
  created () {
    this.quickexit = (this.quickExit !== null) ? this.quickExit : this.rplOptions.quickexit
  }
}
</script>

<style lang="scss" scoped>
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

// TODO: we'd better to make a UI color variable so all UI color can refer to the same color.
$rpl-backbround-color: rpl-color('white') !default;

.rpl-above-content {
  background-repeat: no-repeat;
  background-position: -.5rem -9rem;
  background-size: 18rem;

  @include rpl_breakpoint(s) {
    background-position: -1rem -8.5rem;
    background-size: 20rem;
  }

  @include rpl_breakpoint(m) {
    background-position: -1rem -6.5rem;
  }

  @include rpl_breakpoint(l) {
    background-position: -1.5rem -4.5rem;
  }

  @include rpl_breakpoint(xl) {
    background-position: left -4.5rem;
  }

  @include rpl_breakpoint(xxl) {
    background-position: calc(50% - 43rem) -13rem;
    background-size: 40rem;
  }

  @media (min-width: 1900px) {
    background-position: left -13rem;
    background-size: 40rem;
  }

  @include rpl_breakpoint(xxxl) {
    background-position: left -13rem;
  }

  &__inner {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    @each $bp, $val in $rpl-layout-top-margin {
      @include rpl_breakpoint($bp) {
        padding-top: $val;
      }
    }
  }

  &__top {
    display: flex;
    padding: 0 $rpl-header-horizontal-padding-xs;
    @include rpl_breakpoint('s') {
      justify-content: space-between;
      padding: 0 $rpl-header-horizontal-padding-s;
    }
  }
}

.rpl-content {
  @each $bp, $val in $rpl-content-padding-top {
    @include rpl_breakpoint($bp) {
      padding-top: $val;

      // Padding bottome need to minus last row gutter.
      @if (map-get($rpl-row-gutter, $bp)) {
        padding-bottom: $val - map-get($rpl-row-gutter, $bp);
      }
    }
  }

  &--grey {
    background: rpl-color('light_neutral')
  }
}

.rpl-sidebar {
  background-color: $rpl-backbround-color;
}

@include rpl_breakpoint(l) {
  .rpl-sidebar {
    background-color: transparent;
  }
}
</style>
