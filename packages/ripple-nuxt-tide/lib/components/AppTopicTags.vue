<template>
  <ul class="app-topics-tags" v-if="topicAndTags">
    <li class="app-topics-tags__item" v-for="(tag, index) in topicAndTags" :key="index">
      <rpl-meta-tag :linkText="tag.text" :linkUrl="tag.url" />
    </li>
  </ul>
</template>

<script>
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import RplMetaTag from '@dpc-sdp/ripple-meta-tag'

export default {
  components: {
    RplRow,
    RplCol,
    RplMetaTag
  },
  props: {
    topic: Object,
    tags: Array
  },
  computed: {
    topicAndTags () {
      let metaTags = []
      if (this.topic) {
        metaTags.push(this.topic)
      }
      if (this.tags) {
        metaTags = metaTags.concat(this.tags)
      }
      metaTags = metaTags.map(tag => ({
        text: tag.name,
        url: (tag.path && tag.path.alias) ? tag.path.alias : ''
      }))
      return metaTags.length > 0 ? metaTags : null
    }
  }
}
</script>

<style lang="scss">
  .app-topics-tags {
    list-style: none;
    padding: 0;
    margin: 0;

    &__item {
      display: inline;
    }
  }
</style>
