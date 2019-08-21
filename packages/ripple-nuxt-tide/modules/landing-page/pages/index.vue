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
    <rpl-col v-if="page.field_show_topic_term_and_tags" cols="full">
      <rpl-meta-tag v-for="(tag, index) in topicsAndTags" :key="index" :linkText="tag.text" :linkUrl="tag.url" />
    </rpl-col>
  </rpl-row>
</template>

<script>
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import RplAnchorLinks from '@dpc-sdp/ripple-anchor-links'
import RplMetaTag from '@dpc-sdp/ripple-meta-tag'

export default {
  components: {
    RplAnchorLinks,
    RplRow,
    RplMetaTag,
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
  computed: {
    topicsAndTags () {
      if (this.page.field_show_topic_term_and_tags) {
        let metaTags = []
        if (this.page.field_topic) {
          metaTags.push(this.page.field_topic)
        }
        if (this.page.field_tags) {
          metaTags = metaTags.concat(this.page.field_tags)
        }
        return metaTags.map(tag => ({
          text: tag.name,
          url: (tag.path && tag.path.alias) ? tag.path.alias : ''
        }))
      }
      return null
    }
  },
  created () {
    this.dynamicComponents = this.$tide.getDynamicComponents(this.page.appDComponents, this.sidebar)
  }
}
</script>
