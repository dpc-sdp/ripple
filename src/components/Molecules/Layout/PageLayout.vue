<template>
  <div class="rpl-page">
    <section class="rpl-above-content">
      <slot name="aboveContent"></slot>
    </section>
    <section class="rpl-content" :class="{'rpl-content--with-sidebar': sidebar}">
      <rpl-container class="rpl-site-constrain--on-all">
        <rpl-row>
          <rpl-col cols="full" :colsBp="mainCols" class="rpl-main">
            <slot></slot>
          </rpl-col>
          <rpl-col cols="full" :colsBp="{l:4}" :push="{l:1}" class="rpl-sidebar" v-if="sidebar">
            <slot name="sidebar"></slot>
          </rpl-col>
        </rpl-row>
      </rpl-container>
    </section>
    <section class="rpl-below-content">
      <slot name="belowContent"></slot>
    </section>
  </div>
</template>

<script>
import { RplContainer, RplRow, RplCol } from '@dpc-sdp/ripple-grid'

export default {
  components: { RplContainer, RplRow, RplCol },
  props: {
    'sidebar': Boolean
  },
  computed: {
    mainCols: function () {
      return this.sidebar ? {l: 7} : {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@dpc-sdp/ripple-global/style";

@include rpl_breakpoint(l) {
  .rpl-content {
    > .rpl-container {
      overflow-x: visible;
    }
  }

  .rpl-sidebar {
    margin-top: -$rpl-space-4 * 3;
  }
}
</style>
