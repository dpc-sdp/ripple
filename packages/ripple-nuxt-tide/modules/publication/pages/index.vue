<template>
  <rpl-row row-gutter class="app-content">
    <rpl-col cols="full">
      <rpl-anchor-links title="On this page:" :links="anchorLinks" />
    </rpl-col>
    <rpl-col cols="full">
      <rpl-publication-author-information v-if="publishingInfo" v-bind="publishingInfo" />
    </rpl-col>
    <template v-if="dynamicComponents">
      <template v-for="dComponent in dynamicComponents">
        <rpl-col cols="full" :colsBp="dComponent.cols" :key="dComponent.id">
          <no-ssr v-if="dComponent.ssr === false">
            <component :is="dComponent.component" v-bind="dComponent.data" :class="dComponent.class"></component>
          </no-ssr>
          <component v-else :is="dComponent.component" v-bind="dComponent.data" :class="dComponent.class"></component>
        </rpl-col>
      </template>
    </template>
    <template v-if="chapters">
      <rpl-col cols="full" v-for="chapter in chapters"  :key="chapter.id">
        <rpl-card-navigation v-bind="chapter"> </rpl-card-navigation>
      </rpl-col>
    </template>
    <rpl-col cols="full">
      <rpl-publication-pagination v-if="publicationPagination" v-bind="publicationPagination"> </rpl-publication-pagination>
    </rpl-col>
  </rpl-row>
</template>

<script>
import RplAnchorLinks from '@dpc-sdp/ripple-anchor-links'
import RplMarkup from '@dpc-sdp/ripple-markup'
import { RplPublicationPagination, RplPublicationAuthorInformation } from '@dpc-sdp/ripple-publication'
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import { dComponentsLoader } from '@dpc-sdp/ripple-nuxt-tide/lib/core/componentLoader'
import { truncateText } from '@dpc-sdp/ripple-nuxt-tide/lib/core/tide-helper'
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
    this.dynamicComponents = dComponentsLoader(this.page.appDComponents, this.sidebar)
  },
  computed: {
    publishingInfo () {
      if (this.page.type === 'node--publication') {
        return {
          author: this.page.field_publication_authors && this.page.field_publication_authors.length > 0 ? this.page.field_publication_authors.join(', ') : '',
          date: this.page.field_publication_date,
          copyright: this.page.field_license_type ? this.page.field_license_type.description : ''
        }
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
