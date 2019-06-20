<template>
  <rpl-row row-gutter class="app-content">
    <template v-if="anchorLinks && anchorLinks.length > 0">
      <rpl-col cols="full">
        <rpl-anchor-links title="On this page:" :links="anchorLinks" />
      </rpl-col>
    </template>
    <template v-for="dComponent in dynamicComponents" v-if="dynamicComponents">
      <rpl-col cols="full" :colsBp="dComponent.cols" :key="dComponent.id">
        <no-ssr v-if="dComponent.ssr === false">
          <component :is="dComponent.component" v-bind="dComponent.data" :class="dComponent.class"></component>
        </no-ssr>
        <component v-else :is="dComponent.component" v-bind="dComponent.data" :class="dComponent.class"></component>
      </rpl-col>
    </template>
  </rpl-row>
</template>

<script>
import { dComponentsLoader } from '@dpc-sdp/ripple-nuxt-tide/lib/core/componentLoader'
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import RplAnchorLinks from '@dpc-sdp/ripple-anchor-links'

export default {
  components: {
    RplAnchorLinks,
    RplRow,
    RplCol
  },
  data () {
    return {
      dynamicComponents: []
    }
  },
  props: {
    page: {
      type: Object
    },
    anchorLinks: Array,
    sidebar: Boolean
  },
  created () {
    this.dynamicComponents = dComponentsLoader(this.page.appDComponents, this.sidebar)
  }
}
</script>
