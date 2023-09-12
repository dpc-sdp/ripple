<template>
  <rpl-row row-gutter class="app-content tide-content tide-content--publication">
    <rpl-col v-if="anchorLinks && anchorLinks.length > 0" cols="full">
      <rpl-anchor-links title="On this page:" :links="anchorLinks" />
    </rpl-col>
    <rpl-col v-if="publishingInfo" cols="full">
      <rpl-publication-author-information v-bind="publishingInfo" />
    </rpl-col>
    <template v-if="dynamicComponents">
      <template v-for="dComponent in dynamicComponents">
        <rpl-col cols="full" :colsBp="dComponent.cols" :key="dComponent.id" catchChildError>
          <client-only v-if="dComponent.ssr === false">
            <component :is="dComponent.component" v-bind="dComponent.data" :class="dComponent.class"></component>
          </client-only>
          <component v-else :is="dComponent.component" v-bind="dComponent.data" :class="dComponent.class"></component>
        </rpl-col>
      </template>
    </template>
    <template v-if="chapters">
      <rpl-col cols="full" v-for="chapter in chapters" :key="chapter.id">
        <rpl-card-navigation v-bind="chapter"> </rpl-card-navigation>
      </rpl-col>
    </template>
    <rpl-col v-if="publicationPagination" cols="full">
      <rpl-publication-pagination v-bind="publicationPagination"> </rpl-publication-pagination>
    </rpl-col>
  </rpl-row>
</template>

<script>
import RplAnchorLinks from '@dpc-sdp/ripple-anchor-links'
import RplMarkup from '@dpc-sdp/ripple-markup'
import { RplPublicationPagination, RplPublicationAuthorInformation } from '@dpc-sdp/ripple-publication'
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import { truncateText } from '@dpc-sdp/ripple-global/utils/helpers.js'
import { RplCardNavigation } from '@dpc-sdp/ripple-card'

export default {
  components: {
    RplAnchorLinks,
    RplRow,
    RplCol,
    RplMarkup,
    RplCardNavigation,
    RplPublicationAuthorInformation,
    RplPublicationPagination
  },
  props: {
    page: Object,
    anchorLinks: Array,
    sidebar: Boolean
  },
  created () {
    this.dynamicComponents = this.$tide.getDynamicComponents(this.page.appDComponents, this.sidebar)
  },
  computed: {
    publishingInfo () {
      if (this.page.type === 'node--publication') {
        const authorsName = this.page.field_publication_authors ? this.page.field_publication_authors : ''
        const author = Array.isArray(authorsName) ? authorsName.map((author) => author.name) : [authorsName.name]
        const date = this.page.field_publication_date
        const copyright = this.page.field_license_type ? this.page.field_license_type.description : ''
        return (author || date || copyright) ? { author, date, copyright } : null
      }
    },
    chapters () {
      if (this.page.type === 'node--publication' && this.page.publication_children) {
        if (this.page.publication_children.length > 0) {
          return this.page.publication_children.map(item => {
            const menuItem = item.meta
            if (menuItem) {
              return {
                id: menuItem.id,
                title: menuItem.title ? menuItem.title : '',
                summary: menuItem.field_landing_page_summary ? menuItem.field_landing_page_summary : '',
                link: {
                  url: menuItem.url,
                  text: 'Read more'
                }
              }
            }
          })
        }
      }
    },
    publicationPagination () {
      if (this.page.type === 'node--publication_page') {
        let pagination = {}
        const prev = this.page.publication_navigation_prev ? this.page.publication_navigation_prev.meta : null
        const next = this.page.publication_navigation_next ? this.page.publication_navigation_next.meta : null
        if (prev) {
          pagination.previousLink = prev.url
          pagination.previousText = truncateText(prev.title, 40)
          pagination.previousDescription = truncateText(prev.field_landing_page_summary, 60)
        }
        if (next) {
          pagination.nextLink = next.url
          pagination.nextText = truncateText(next.title, 40)
          pagination.nextDescription = truncateText(next.field_landing_page_summary, 60)
        }
        return pagination
      }
    }
  }

}
</script>
