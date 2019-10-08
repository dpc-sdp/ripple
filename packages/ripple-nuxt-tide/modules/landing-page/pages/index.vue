<template>
  <rpl-row row-gutter class="app-content">
    <template v-if="anchorLinks && anchorLinks.length > 0">
      <rpl-col cols="full">
        <rpl-anchor-links title="On this page:" :links="anchorLinks" />
      </rpl-col>
    </template>
    <template v-for="dComponent in dynamicComponents" v-if="dynamicComponents">
      <rpl-col cols="full" :colsBp="dComponent.cols" :key="dComponent.id" catchChildError>
        <client-only v-if="dComponent.ssr === false">
          <component :is="dComponent.component" v-bind="dComponent.data" :class="dComponent.class"></component>
        </client-only>
        <component v-else :is="dComponent.component" v-bind="dComponent.data" :class="dComponent.class"></component>
      </rpl-col>
    </template>
    <rpl-col v-if="page.field_show_topic_term_and_tags" cols="full">
      <app-topic-tags :topic="this.page.field_topic" :tags="this.page.field_tags" />
    </rpl-col>
  </rpl-row>
</template>

<script>
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import RplAnchorLinks from '@dpc-sdp/ripple-anchor-links'
import AppTopicTags from '../../../lib/components/AppTopicTags'

export default {
  components: {
    RplAnchorLinks,
    RplRow,
    RplCol,
    AppTopicTags
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
    this.dynamicComponents = this.$tide.getDynamicComponents(this.page.appDComponents, this.sidebar)
  }
}
</script>
