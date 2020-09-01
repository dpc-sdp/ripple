<template>
  <main class="rpl-page" :class="{'rpl-page--with-search': withSearch }">
    <div class="rpl-above-content" :style="bgGraphic">
      <div class="rpl-page-header" :class="{'rpl-page-header--with-image': bannerImage }">
        <RplResponsiveImg v-if="bannerImage" class="rpl-page-header__picture" v-bind="bannerImage" />
        <div class="rpl-above-content__inner">
          <div class="rpl-above-content__top">
            <slot name="breadcrumbs"></slot>
            <rpl-quick-exit v-if="quickexit && !menuopen" menuOffsetSelector=".rpl-above-content__inner" />
          </div>
          <div class="rpl-above-content__below">
            <slot name="aboveContent"></slot>
          </div>
        </div>
      </div>
      <div class="rpl-above-content-two">
        <slot name="aboveContentTwo"></slot>
      </div>
    </div>

    <section id="rpl-main-content" class="rpl-content" :class="{'rpl-content--with-sidebar': sidebar, 'rpl-content--grey': bgGrey}">
      <div class="rpl-site-constrain--on-all">
        <rpl-row>
          <rpl-col cols="full" :colsBp="mainCols" class="rpl-main">
            <slot></slot>
          </rpl-col>
          <rpl-col
            v-if="sidebar"
            :colsBp="columns.sidebar.colsBp"
            :push="columns.sidebar.push"
            cols="full"
            class="rpl-sidebar" >
            <slot name="sidebar"></slot>
          </rpl-col>
        </rpl-row>
      </div>
    </section>

    <div class="rpl-below-content">
      <slot name="belowContent"></slot>
    </div>

  </main>
</template>

<script>
import RplQuickExit from './QuickExit'
import { RplContainer, RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import { RplSiteHeaderEventBus } from '@dpc-sdp/ripple-site-header'
import RplResponsiveImg from '@dpc-sdp/ripple-responsive-img'

export default {
  components: { RplContainer, RplRow, RplCol, RplQuickExit, RplResponsiveImg },
  props: {
    'sidebar': Boolean,
    'columns': {
      type: Object,
      default () {
        return {
          main: { l: 7 },
          sidebar: {
            colsBp: { l: 4 },
            push: { l: 1 }
          }
        }
      }
    },
    'quickExit': { type: Boolean, default: null },
    'backgroundColor': String,
    'heroBackgroundImage': Object,
    'backgroundGraphic': String,
    'withSearch': Boolean
  },
  data () {
    return {
      quickexit: false,
      menuopen: false
    }
  },
  computed: {
    mainCols () {
      return this.sidebar === true ? this.columns.main : {}
    },
    bgGrey () {
      return this.backgroundColor === 'grey'
    },
    bgGraphic () {
      if (!this.heroBackgroundImage) {
        return this.backgroundGraphic ? { 'background-image': `url(${this.backgroundGraphic})` } : null
      }
    },
    bannerImage () {
      if (this.heroBackgroundImage) {
        return {
          ...this.heroBackgroundImage,
          srcSet: [
            { size: 'xs', height: 300, width: 575 },
            { size: 's', height: 600, width: 768 },
            { size: 'm', height: 600, width: 992 },
            { size: 'xxl', height: 600, width: 1600 }
          ],
          sizes: '100vw'
        }
      }
    }
  },
  mounted () {
    RplSiteHeaderEventBus.$on('open', this.setMenuOpen)
  },
  created () {
    this.quickexit = (this.quickExit !== null) ? this.quickExit : this.rplOptions.quickexit
  },
  methods: {
    setMenuOpen (val) {
      this.menuopen = val
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";
$rpl-search-back-to-top-offset: 72px / 2;
$rpl-content-bg-color-grey: rpl_color('light_neutral') !default;
$rpl-page-header-bg-color: rpl_color('secondary') !default;
$rpl-page-header-title-bg-color-s: rpl_color('primary') !default;

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
    // Decimal point to solve Safari's lack of sub-pixel rendering / rounding.
    background-position: calc(50.001% - 43rem) -13rem;
    background-size: 40rem;
  }

  @media (min-width: 1900px) {
    background-position: left -13rem;
  }

  @include rpl_print {
    background-image: none !important;
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

    @include rpl_print {
      padding-top: 0;
      background-image: none !important;
    }
  }

  &__top {
    display: flex;
    padding: 0 $rpl-header-horizontal-padding-xs;
    @include rpl_breakpoint(s) {
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

  @include rpl_print {
    padding: 0;
  }

  &--grey {
    background: $rpl-content-bg-color-grey;
  }

  .rpl-row {
    @include rpl_print {
      display: block;
      margin: 0;
      width: auto;
    }
  }
}

.rpl-main,
.rpl-sidebar {
  @include rpl_print {
    width: 100%;
    margin: 0;
    left: 0;
  }
}

.rpl-page--with-search {
  .rpl-pagination {
    // Allow half of back to top buttom (72px) in BaseLayout.
    padding-bottom: $rpl-search-back-to-top-offset;
    @include rpl_breakpoint('s') {
      padding-bottom: 0;
    }

    @include rpl_breakpoint(m) {
      width: 100%;
    }
  }
}

.rpl-page-header {
  &--with-image {
    position: relative;
  }
  &__picture {
    position: absolute;
    z-index: -1;
    height: 100%;
  }
}

</style>
