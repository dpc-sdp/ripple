<template>
  <div class="tide-content tide-content--complaint">
    <rpl-row row-gutter v-if="overview">
      <rpl-col cols="full">
        <rpl-complaints-overview v-bind="overview" />
      </rpl-col>
    </rpl-row>
    <rpl-row row-gutter v-if="timeline">
      <rpl-col cols="full">
        <rpl-timeline v-bind="timeline" ></rpl-timeline>
      </rpl-col>
    </rpl-row>
    <rpl-row row-gutter v-if="guidelines">
      <rpl-col cols="full">
        <div class="tide-guidelines">
          <h2 class="tide-guidelines__title" v-if="guidelines.title">{{guidelines.title}}</h2>
          <rpl-accordion v-if="guidelines.accordions && guidelines.accordions.length > 0" :accordions="guidelines.accordions"></rpl-accordion>
        </div>
      </rpl-col>
    </rpl-row>
    <rpl-row row-gutter v-if="supportingDocuments && supportingDocuments.length > 0">
      <rpl-col cols="full" v-for="file in supportingDocuments" :key="file.id">
        <rpl-document-link v-bind="file" />
      </rpl-col>
    </rpl-row>
  </div>
</template>

<script>
import RplcomplaintsOverview from '@dpc-sdp/ripple-complaints'
import RplTimeline from '@dpc-sdp/ripple-timeline'
import RplDocumentLink from '@dpc-sdp/ripple-document-link'
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import RplAccordion from '@dpc-sdp/ripple-accordion'
import mime from 'mime-types'
import utils from '@dpc-sdp/ripple-nuxt-tide/modules/complaint/lib/utils.js'

export default {
  components: {
    RplCol,
    RplDocumentLink,
    RplRow,
    RplcomplaintsOverview,
    RplTimeline,
    RplAccordion
  },
  props: {
    page: Object
  },
  computed: {
    overview () {
      return {
        title: this.page.field_overview_title ? this.page.field_overview_title : null,
        audience: utils.formatAudiences(this.page.field_audience),
        funding: this.page.field_node_funding_level ? this.page.field_node_funding_level : null,
        startdate: this.page.field_node_dates ? this.page.field_node_dates.value : '',
        enddate: this.page.field_node_dates ? this.page.field_node_dates.end_value : '',
        description: this.page.field_description ? this.page.field_description.processed : '',
        link: this.page.field_call_to_action ? this.$tideMapping.filter(this.page.field_call_to_action, ['paragraphLink']) : null
      }
    },
    timeline () {
      if (this.page.field_node_timeline && this.page.field_node_timeline.field_timeline && this.page.field_node_timeline.field_timeline.length > 0) {
        return {
          title: this.page.field_node_timeline.field_paragraph_title,
          list: this.page.field_node_timeline.field_timeline.map(timeline => ({
            title: timeline.field_paragraph_title,
            subtitle: timeline.field_paragraph_cta_text,
            url: timeline.field_paragraph_link ? timeline.field_paragraph_link.origin_url || timeline.field_paragraph_link.uri : null,
            image: timeline.field_paragraph_media && timeline.field_paragraph_media.field_media_image ? timeline.field_paragraph_media.field_media_image.url || timeline.field_paragraph_media.field_media_image.uri : null,
            dateStart: timeline.field_paragraph_date_range ? timeline.field_paragraph_date_range.value : null,
            dateEnd: timeline.field_paragraph_date_range ? timeline.field_paragraph_date_range.end_value : null,
            description: timeline.field_paragraph_summary
          }))
        }
      }
      return null
    },
    guidelines () {
      if (this.page.field_node_guidelines) {
        return {
          title: this.page.field_node_guidelines.field_paragraph_title,
          accordions: this.page.field_node_guidelines.field_paragraph_accordion ? this.page.field_node_guidelines.field_paragraph_accordion.map(acc => ({
            title: acc.field_paragraph_accordion_name,
            content: acc.field_paragraph_accordion_body ? acc.field_paragraph_accordion_body.processed : ''
          })) : []
        }
      }
    },
    supportingDocuments () {
      if (this.page.field_node_documents && this.page.field_node_documents.length > 0) {
        return this.page.field_node_documents.map(doc => ({
          name: doc.name,
          url: doc.field_media_file.url || doc.field_media_file.uri,
          extension: mime.extension(doc.field_media_file.filemime),
          filesize: utils.formattedSize(doc.field_media_file.filesize),
          id: doc.id
        }))
      }
      return []
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

.tide-guidelines {
  &__title {
    @include rpl_mobile_padding();
    @include rpl_breakpoint('m') {
      padding-left: 0;
      padding-right: 0;
    }
  }
}

</style>
