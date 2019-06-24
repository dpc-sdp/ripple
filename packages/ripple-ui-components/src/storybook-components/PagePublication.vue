<template>
  <rpl-base-layout class="demo">

    <template slot="header">
      <rpl-site-header v-bind="mock.header" />
    </template>

    <rpl-page-layout :sidebar="true" class="main" :backgroundGraphic="mock.landingPage.backgroundGraphic">

      <template slot="breadcrumbs">
        <rpl-breadcrumbs v-bind="mock.breadcrumbs" />
      </template>

      <template slot="aboveContent">
        <rpl-hero-banner
          title="Publication Page"
          class="rpl-site-constrain--on-all"
        />
      </template>

      <rpl-row row-gutter>
        <rpl-col cols="full"><rpl-anchor-links v-bind="mock.anchorLinks" /></rpl-col>
        <rpl-col cols="full"><rpl-markup :html="pageBody" /></rpl-col>
        <rpl-col cols="full"><rpl-publication-image v-bind="mock.publicationImage" /></rpl-col>
        <rpl-col cols="full"><rpl-markup :html="pageBodyBelow" /></rpl-col>
        <rpl-col cols="full"><rpl-publication-pagination v-bind="mock.publicationPagination" /></rpl-col>
        <!-- Add publication references component-->
        <rpl-col cols="full"><rpl-updated-date v-bind="mock.updatedDate" /></rpl-col>
      </rpl-row>

      <template slot="sidebar">
        <rpl-publication-download-print v-bind="mock.publicationDownloadPrint" class="rpl-component-gutter"/>
        <rpl-site-section-navigation v-bind="mock.siteSectionNavigation" activeLink="" class="rpl-component-gutter"/>
        <rpl-contact v-bind="mock.contact" class="rpl-component-gutter"/>
        <rpl-share-this v-bind="mock.shareThis" class="rpl-component-gutter" />
      </template>

    </rpl-page-layout>

    <template slot="footer">
      <rpl-site-footer v-bind="mock.footer" />
    </template>

  </rpl-base-layout>

</template>

<script>
import { RplBaseLayout, RplPageLayout } from '@dpc-sdp/ripple-layout'
import { RplContainer, RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import RplSiteFooter from '@dpc-sdp/ripple-site-footer'
import RplSiteHeader from '@dpc-sdp/ripple-site-header'
import RplBreadcrumbs from '@dpc-sdp/ripple-breadcrumbs'
import RplAnchorLinks from '@dpc-sdp/ripple-anchor-links'
import RplUpdatedDate from '@dpc-sdp/ripple-updated-date'

// Publication Content
import RplMarkup from '@dpc-sdp/ripple-markup'
import { RplPublicationPagination, RplPublicationDownloadPrint, RplPublicationImage } from '@dpc-sdp/ripple-publication'

// Sidebar
import RplSiteSectionNavigation from '@dpc-sdp/ripple-site-section-navigation'
import RplContact from '@dpc-sdp/ripple-contact'
import RplShareThis from '@dpc-sdp/ripple-share-this'

// Banner
import RplHeroBanner from '@dpc-sdp/ripple-hero-banner'
import RplButton from '@dpc-sdp/ripple-button'

export default {
  name: 'SPagePublication',
  components: {
    // Layout
    RplBaseLayout,
    RplPageLayout,
    RplContainer,
    RplRow,
    RplCol,
    RplSiteHeader,
    RplBreadcrumbs,
    RplAnchorLinks,
    RplUpdatedDate,
    RplSiteFooter,

    // Publication
    RplPublicationPagination,
    RplPublicationDownloadPrint,
    RplPublicationImage,
    RplMarkup,

    // Sidebar
    RplSiteSectionNavigation,
    RplContact,
    RplShareThis,

    // Banner
    RplHeroBanner,
    RplButton
  },
  props: {
    mock: Object
  },
  data () {
    return {
      pageBody: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodent tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimum are veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ean pret commodo consequat.</p> <p>This is a hyperlink. And here it is on hover. Unde omnis ist natus error siten voluptatem accusantium doloremque laudantium, totam rement eaque ipsa quae ab illo inventore veritatis et quasi architecto.</p> <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet. </p> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodent tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimum are veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ean pret commodo consequat.</p> <p>This is a hyperlink. And here it is on hover. Unde omnis ist natus error siten voluptatem accusantium doloremque laudantium, totam rement eaque ipsa quae ab illo inventore veritatis et quasi architecto.</p> <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.</p>',
      pageBodyBelow: '<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.</p>'
    }
  },
  methods: {
    // Methods for site header.
    searchFunc: function (value) {
      alert('Search for: "' + value + '"')
    }
  }
}
</script>
