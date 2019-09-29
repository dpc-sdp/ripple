<template>
  <rpl-page-layout class="app-main" :sidebar="true">
    <template slot="breadcrumbs">
      <rpl-breadcrumbs :crumbs="breadcrumbs" />
    </template>
    <template slot="aboveContent">
      <rpl-hero-banner
        :title="publication.title"
        class="rpl-site-constrain--on-all"
      />
    </template>
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
    <rpl-row row-gutter >
      <rpl-col cols="full">
        <section :id="formatAnchor(page.title)" v-for="(page, index) in pages" :key="`${index}-page`">
          <template v-if="page.components">
            <template  v-for="component in page.components">
              <div v-if="component" :key="component.id" :data-tid="component.id">
                <no-ssr v-if="component.ssr === false">
                  <component :is="component.component" v-bind="component.data" :class="component.class"></component>
                </no-ssr>
                <component v-else :is="component.component" v-bind="component.data" :class="component.class"></component>
              </div>
            </template>
          </template>
          <rpl-divider :key="`${index}-page-divider`" class="app-pub-print__page-divider" />
        </section>
      </rpl-col>
    </rpl-row>
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
import kebabCase from 'lodash.kebabcase'

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
    RplCol
  },
  props: {
    sidebar: Boolean
  },
  head () {
    return {
      title: this.publication.title
    }
  },
  methods: {
    formatAnchor (title) {
      return kebabCase(title)
    }
  },
  mounted () {
    this.$nextTick(function () {
      if (process.client && typeof window !== 'undefined') {
        setTimeout(window.print(), 4000)
      }
    })
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
        const author = this.publication.field_publication_authors && this.publication.field_publication_authors.length > 0 ? this.publication.field_publication_authors.join(', ') : ''
        const date = this.publication.field_publication_date
        const copyright = this.publication.field_license_type ? this.publication.field_license_type.description : ''
        return (author || date || copyright) ? { author, date, copyright } : null
      }
    },
    pages () {
      return this.publicationPages.map(page => {
        return {
          title: page.title,
          components: page.componentMapping.map(cmp => {
            return this.$tide.getDynamicComponent(cmp, true)
          }).filter(c => c)
        }
      })
    }
  },
  async asyncData (context) {
    const publication = await context.app.$tide.getPageByPath('/' + context.route.params.publicationname)
    const hierarchyJson = await context.app.$tide.get('node/publication', {}, `${publication.id}/hierarchy`)
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

    const publicationPagesData = await context.app.$tide.getContentList('publication_page', filters, includes)
    const publicationPages = []
    async function addComponents () {
      for (let i = 0; i < publicationPagesData.length; i++) {
        const page = publicationPagesData[i]
        const componentMapping = await context.app.$tideMapping.get(page.field_landing_page_component, 'landingPageComponents')
        publicationPages.push({
          title: page.title,
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
  $app-pub-print-divider-margin: $rpl-space * 12 0;
  .app-pub-print {
    &__page-divider {
      margin: $app-pub-print-divider-margin;
      @media print {
        page-break-after: always;
      }
    }
  }
</style>
