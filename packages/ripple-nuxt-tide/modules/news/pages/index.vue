<template v-if="page.type === 'node--news'">
  <rpl-row row-gutter class="app-content tide-content tide-content--news">
    <rpl-col cols="full" v-if="publishDateAndAuthor">
      <rpl-publish-date-and-author v-bind="publishDateAndAuthor" />
    </rpl-col>
    <!-- rpl topic term and tags -->
    <rpl-col cols="full" v-if="figure">
      <rpl-figure v-bind="figure" />
    </rpl-col>
    <rpl-col cols="full">
      <rpl-markup v-if="page.body" :html="page.body.processed"></rpl-markup>
    </rpl-col>
    <rpl-col v-if="page.field_show_topic_term_and_tags" cols="full">
      <app-topic-tags :topic="this.page.field_topic" :tags="this.page.field_tags" />
    </rpl-col>
  </rpl-row>
</template>

<script>
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import RplFigure from '@dpc-sdp/ripple-figure'
import RplMarkup from '@dpc-sdp/ripple-markup'
import RplPublishDateAndAuthor from '@dpc-sdp/ripple-publish-date-and-author'
import AppTopicTags from '../../../lib/components/AppTopicTags'

export default {
  components: {
    RplRow,
    RplCol,
    RplFigure,
    RplPublishDateAndAuthor,
    RplMarkup,
    AppTopicTags
  },
  props: {
    page: Object
  },
  computed: {
    figure () {
      const featuredImage = this.page.field_featured_image
      if (featuredImage && featuredImage.field_media_image) {
        return {
          image: {
            src: featuredImage.field_media_image.url,
            alt: featuredImage.field_media_image.meta.alt
          },
          caption: featuredImage.field_media_caption
        }
      } else {
        return null
      }
    },
    publishDateAndAuthor () {
      const hasLocation = (val) => Array.isArray(val) && val.length > 0 && val[0].hasOwnProperty('name')

      const locationsArray = this.page.field_location.map(loc => loc.name)
      const getLocations = () => {
        if (locationsArray.length > 1) { // more than 1 location
          return locationsArray.slice(0, -1).join(', ') + ', and ' + locationsArray.slice(-1)
        } else if (locationsArray.length === 1) { // 1 location
          return locationsArray[0]
        } else {
          return null
        }
      }

      return {
        date: this.page.field_news_date,
        location: hasLocation(this.page.field_location) ? getLocations() : null,
        author: this.page.field_node_department ? this.page.field_node_department.name : null
      }
    }
  }
}
</script>
