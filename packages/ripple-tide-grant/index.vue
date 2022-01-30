<template>
  <div class="tide-content tide-content--grant">
    <rpl-row row-gutter v-if="page.overview">
      <rpl-col cols="full">
        <rpl-grants-overview v-bind="page.overview" />
      </rpl-col>
    </rpl-row>
    <rpl-row row-gutter v-if="page.timeline">
      <rpl-col cols="full">
        <rpl-timeline v-bind="page.timeline" ></rpl-timeline>
      </rpl-col>
    </rpl-row>
    <rpl-row row-gutter v-if="page.guidelines">
      <rpl-col cols="full">
        <div class="tide-guidelines">
          <h2 class="tide-guidelines__title" v-if="page.guidelines.title">{{page.guidelines.title}}</h2>
          <rpl-accordion v-if="page.guidelines.accordions && page.guidelines.accordions.length > 0" :accordions="page.guidelines.accordions"></rpl-accordion>
        </div>
      </rpl-col>
    </rpl-row>
    <rpl-row row-gutter v-if="page.supportingDocuments && page.supportingDocuments.length > 0">
      <rpl-col cols="full" v-for="file in page.supportingDocuments" :key="file.id">
        <rpl-document-link v-bind="file" />
      </rpl-col>
    </rpl-row>
  </div>
</template>

<script>
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import RplDocumentLink from '@dpc-sdp/ripple-document-link'
import RplGrantsOverview from '@dpc-sdp/ripple-grants'
import RplTimeline from '@dpc-sdp/ripple-timeline'
import RplAccordion from '@dpc-sdp/ripple-accordion'

export default {
  components: {
    RplRow,
    RplCol,
    RplDocumentLink,
    RplGrantsOverview,
    RplTimeline,
    RplAccordion
  },
  props: {
    page: {
      type: Object
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
