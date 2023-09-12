<template>
  <rpl-page-layout class="app-main tide-pub-print" :sidebar="true">
    <template slot="breadcrumbs">
      <rpl-breadcrumbs :crumbs="breadcrumbs" />
    </template>
    <template slot="aboveContent">
      <rpl-hero-banner
        :title="publication.title"
        :introText="publication.field_landing_page_intro_text"
        class="rpl-site-constrain--on-all"
      />
    </template>
    <rpl-row row-gutter v-if="parentComps">
      <template v-for="component in parentComps">
        <rpl-col cols="full" :colsBp="component.cols" :key="component.id">
          <client-only v-if="component.ssr === false">
            <component :is="component.component" v-bind="component.data" :class="component.class"></component>
          </client-only>
          <component v-else :is="component.component" v-bind="component.data" :class="component.class"></component>
        </rpl-col>
      </template>
      <rpl-divider class="tide-pub-print__page-divider" />
    </rpl-row>

    <rpl-row v-if="publishingInfo" row-gutter>
      <rpl-col cols="full">
        <rpl-publication-author-information v-bind="publishingInfo" />
      </rpl-col>
    </rpl-row>
    <rpl-row row-gutter v-if="anchorLinks && anchorLinks.length > 0">
      <rpl-col cols="full">
        <rpl-anchor-links title="On this page:" :links="anchorLinks" />
      </rpl-col>
    </rpl-row>
    <rpl-row row-gutter class="tide-content">
      <rpl-col cols="full">
        <section v-for="(page, index) in pages" :key="`${index}-page`">
          <h2 :id="formatAnchor(page.title)" class="tide-pub-print__page-title">{{ page.title }}</h2>
          <p class="tide-pub-print__page-intro-text">{{ page.introText }}</p>
          <template v-if="page.components">
            <rpl-row row-gutter>
              <template v-for="component in page.components">
                <rpl-col v-if="component" cols="full" :colsBp="component.cols" :key="component.id" :data-tid="component.id">
                  <client-only v-if="component.ssr === false">
                    <component :is="component.component" v-bind="component.data" :class="component.class"></component>
                  </client-only>
                  <component v-else :is="component.component" v-bind="component.data" :class="component.class"></component>
                </rpl-col>
              </template>
            </rpl-row>
          </template>
          <rpl-divider :key="`${index}-page-divider`" class="tide-pub-print__page-divider" />
        </section>
      </rpl-col>
    </rpl-row>
    <rpl-updated-date v-bind="updatedDate.data"></rpl-updated-date>
  </rpl-page-layout>

</template>

<script>
import { RplPageLayout } from '@dpc-sdp/ripple-layout'
import RplAnchorLinks from '@dpc-sdp/ripple-anchor-links'
import { RplHeroBanner } from '@dpc-sdp/ripple-hero-banner'
import { RplDivider } from '@dpc-sdp/ripple-global'
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import RplBreadcrumbs from '@dpc-sdp/ripple-breadcrumbs'
import { RplPublicationAuthorInformation, RplPublicationDownloadPrint } from '@dpc-sdp/ripple-publication'
import RplUpdatedDate from '@dpc-sdp/ripple-updated-date'
import kebabCase from 'lodash/kebabCase'
import { logger } from '@dpc-sdp/ripple-nuxt-tide/lib/core'

export default {
  name: 'TidePrintPublication',
  components: {
    RplPublicationAuthorInformation,
    RplPublicationDownloadPrint,
    RplBreadcrumbs,
    RplHeroBanner,
    RplPageLayout,
    RplAnchorLinks,
    RplDivider,
    RplRow,
    RplCol,
    RplUpdatedDate
  },
  props: {
    sidebar: Boolean
  },
  methods: {
    formatAnchor (title) {
      return kebabCase(title)
    }
  },
  computed: {
    breadcrumbs () {
      return [{ text: 'Home', url: '/' }, { text: this.publication.title, url: `/${this.$route.params.publicationname}` }, { text: 'Print', url: this.$route.path }]
    },
    anchorLinks () {
      return this.pages.map(page => ({
        url: `#${this.formatAnchor(page.title)}`,
        text: page.title
      }))
    },
    publishingInfo () {
      if (this.publication.type === 'node--publication') {
        const authorsName = this.publication.field_publication_authors ?? []
        const author = Array.isArray(authorsName) ? authorsName.map((author) => author.name) : [authorsName.name]
        const date = this.publication.field_publication_date
        const copyright = this.publication.field_license_type ? this.publication.field_license_type.description : ''
        return (author || date || copyright) ? { author, date, copyright } : null
      }
    },
    updatedDate () {
      return {
        data: {
          date: this.publication.changed.toString() || this.publication.created.toString()
        }
      }
    },
    parentComps () {
      return this.$tide.getDynamicComponents(this.publication.componentMapping, true)
    },
    pages () {
      return this.publicationPages.map(page => {
        return {
          title: page.title,
          introText: page.introText,
          components: page.componentMapping.map(cmp => {
            return this.$tide.getDynamicComponent(cmp, true)
          }).filter(c => c)
        }
      })
    }
  },
  async asyncData ({ app, route, store }) {
    const publication = await app.$tide.getPageByPath('/' + route.params.publicationname)
    store.dispatch('tide/setPageHead', { title: publication.title })
    try {
      publication.componentMapping = await app.$tideMapping.get(publication.field_landing_page_component, 'landingPageComponents')

      // Add parent page's contact us
      if (publication.field_landing_page_show_contact && publication.field_landing_page_contact) {
        const contact = await app.$tideMapping.get(publication.field_landing_page_contact)
        if (contact) {
          publication.componentMapping.push({
            name: 'rpl-contact',
            data: contact.data
          })
        }
      }
    } catch (error) {
      if (process.server) {
        logger.error('Failed to map publication components', { error, label: 'Publication' })
      }
    }

    const hierarchyJson = await app.$tide.get('node/publication', {}, `${publication.id}/hierarchy`)
    const ids = []
    const addId = (o, arr) => {
      if (o.id) {
        arr.push(o.id)
      }
      if (o.children) {
        o.children.forEach(gc => {
          addId(gc, ids)
        })
      }
    }

    addId(hierarchyJson.data.meta.hierarchy, ids)

    const filters = {
      pub: {
        condition: {
          operator: 'IN',
          path: 'id',
          value: {
            '': ids
          }
        }
      }
    }

    const includeConfig = require('./../tide.config')
    const includes = includeConfig.include.publicationPage

    const publicationPagesData = await app.$tide.getContentList('publication_page', filters, includes)
    const sortedPages = ids.map(id => {
      return publicationPagesData.find(page => page.id === id)
    }).filter(s => s)

    const publicationPages = []
    async function addComponents () {
      for (let i = 0; i < sortedPages.length; i++) {
        const page = sortedPages[i]
        const componentMapping = await app.$tideMapping.get(page.field_landing_page_component, 'landingPageComponents')

        // Add child page's contact us into section
        if (page.field_landing_page_show_contact && page.field_landing_page_contact) {
          const contact = await app.$tideMapping.get(page.field_landing_page_contact)
          if (contact) {
            componentMapping.push({
              name: 'rpl-contact',
              data: contact.data
            })
          }
        }

        publicationPages.push({
          title: page.title,
          introText: page.field_landing_page_intro_text,
          componentMapping
        })
      }
    }

    await addComponents()
    return {
      publication,
      publicationPages
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
  $tide-pub-print-divider-margin: $rpl-space * 12 0;
  .tide-pub-print {
    &__page-divider {
      margin: $tide-pub-print-divider-margin;
      @media print {
        page-break-after: always;
      }
    }

    // Downsize the heading of child page one level as they are nested inside one page.
    .tide-wysiwyg,
    .rpl-accordion {
      h2 {
        @include rpl_typography(heading_m)
      }

      h3 {
        @include rpl_typography(heading_s)
      }

      h4 {
        @include rpl_typography(heading_xs)
      }
    }
  }
</style>
