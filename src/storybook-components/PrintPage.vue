<template>
  <rpl-base-layout class="demo">

    <template slot="header">
      <rpl-alert v-bind="mock.alert" />
      <rpl-site-header v-bind="mock.header" />
    </template>

    <rpl-page-layout :sidebar="true" class="main" :backgroundGraphic="mock.landingPage.backgroundGraphic">

      <template slot="breadcrumbs">
        <rpl-breadcrumbs v-bind="mock.breadcrumbs" />
      </template>

      <template slot="aboveContent">
        <rpl-hero-banner v-bind="mock.heroBanner" class="rpl-site-constrain--on-all" />
        <rpl-hero-banner-cta v-bind="mock.heroBannerCta" />
      </template>

      <template slot="aboveContentTwo">
        <rpl-campaign-primary v-bind="mock.campaignPrimary" class="rpl-site-constrain--on-all" />
        <rpl-intro-banner v-bind="mock.introBanner" class="rpl-site-constrain--on-all" />
        <rpl-search-form v-bind="mock.searchForm" class="rpl-site-constrain--on-all" />
      </template>

      <rpl-row row-gutter>
        <rpl-col cols="full"><rpl-card-navigation-featured v-bind="mock.cardNavigationFeatured" /></rpl-col>
        <rpl-col cols="full"><rpl-card-navigation v-bind="mock.cardNavigation" /></rpl-col>
        <rpl-col cols="full"><rpl-profile-highlight-honour-roll v-bind="mock.profileHighlightHonourRoll" /></rpl-col>
        <rpl-col cols="full"><rpl-anchor-links v-bind="mock.anchorLinks" /></rpl-col>
        <rpl-col cols="full"><rpl-markup v-bind="mock.markup" /></rpl-col>
        <rpl-col cols="full"><rpl-embedded-video v-bind="mock.embeddedVideo" /></rpl-col>
        <rpl-col cols="full"><rpl-news-listing v-bind="mock.newsListing" /></rpl-col>
        <rpl-col cols="full"><rpl-featured-news v-bind="mock.featuredNews" /></rpl-col>
        <rpl-col cols="full"><rpl-image-gallery v-bind="mock.imageGallery" /></rpl-col>
        <rpl-col cols="full"><rpl-timeline v-bind="mock.timeline" /></rpl-col>
        <rpl-col cols="full"><rpl-document-link v-bind="mock.documentLink"></rpl-document-link></rpl-col>
        <rpl-col cols="full"><rpl-grants-overview v-bind="mock.grantsOverview" /></rpl-col>
        <rpl-col cols="full"><rpl-grants-list-item v-bind="mock.grantSearchResultItems[0]" /></rpl-col>
        <rpl-col cols="full"><rpl-figure v-bind="mock.figure" /></rpl-col>
        <rpl-col cols="full"><rpl-publish-date-and-author v-bind="mock.publishDateAndAuthor" /></rpl-col>
        <rpl-col cols="full"><rpl-pagination v-bind="mock.pagination" /></rpl-col>
        <rpl-col cols="full"><rpl-call-to-action v-bind="mock.callToAction" /></rpl-col>
        <rpl-col cols="full"><rpl-form v-bind="mock.form" /></rpl-col>
        <rpl-col cols="full"><rpl-publication-pagination v-bind="mock.publicationPagination" /></rpl-col>
      </rpl-row>

      <template slot="sidebar">
        <rpl-site-section-navigation v-bind="mock.siteSectionNavigation" class="rpl-component-gutter"/>
        <rpl-related-links v-bind="mock.relatedLinks" class="rpl-component-gutter"/>
        <rpl-whats-next v-bind="mock.whatsNext" class="rpl-component-gutter" />
        <rpl-contact v-bind="mock.contact" class="rpl-component-gutter" />
        <rpl-share-this v-bind="mock.shareThis" class="rpl-component-gutter" />
      </template>

      <template slot="belowContent">
        <!-- Card Grid -->
        <div class="rpl-site-constrain--on-all">
          <rpl-row row-gutter>
            <rpl-col cols="full" :colsBp="mock.siteLayout.cardCols"><rpl-card-promotion v-bind="mock.cardPromotion" /></rpl-col>
            <rpl-col cols="full" :colsBp="mock.siteLayout.cardCols"><rpl-card-keydates v-bind="mock.cardKeydates" /></rpl-col>
            <rpl-col cols="full" :colsBp="mock.siteLayout.cardCols"><rpl-card-event v-bind="mock.cardEvent" /></rpl-col>
          </rpl-row>
          <rpl-row row-gutter>
            <rpl-col cols="full" :colsBp="mock.siteLayout.cardCols"><rpl-card-cta v-bind="mock.cardCta" /></rpl-col>
            <rpl-col cols="full" :colsBp="mock.siteLayout.cardCols"><rpl-card-honour-roll v-bind="mock.cardHonourRoll" /></rpl-col>
          </rpl-row>
        </div>
        <div class="rpl-component-gutter">
          <rpl-card-box v-bind="mock.cardBox" class="rpl-site-constrain--on-all"/>
        </div>
        <div class="rpl-site-constrain--on-all">
          <rpl-card-image-navigation v-bind="mock.cardImageNavigation" />
        </div>
        <div class="rpl-site-constrain--on-all">
          <rpl-card-carousel v-bind="mock.cardCarousel" />
        </div>
        <div class="rpl-site-constrain--on-all">
          <rpl-campaign-secondary v-bind="mock.campaignSecondary" />
        </div>
        <div class="rpl-site-constrain--on-all">
          <rpl-latest-events v-bind="mock.latestEvents" />
        </div>
        <div class="rpl-site-constrain--on-all">
          <rpl-sitemap v-bind="mock.sitemap" />
        </div>
        <div class="rpl-site-constrain--on-all">
          <rpl-updated-date v-bind="mock.updatedDate" />
        </div>
      </template>

    </rpl-page-layout>

    <template slot="footer">
      <rpl-site-footer v-bind="mock.footer" />
    </template>

  </rpl-base-layout>

</template>

<script>
import RplButton from '@dpc-sdp/ripple-button'
import { RplDivider } from '@dpc-sdp/ripple-global'
import { RplContainer, RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import { RplIcon, RplTextIcon } from '@dpc-sdp/ripple-icon'
import { RplLink, RplTextLink } from '@dpc-sdp/ripple-link'
import RplMetaTag from '@dpc-sdp/ripple-meta-tag'
import { RplAlert, RplAlertBase } from '@dpc-sdp/ripple-alert'
import RplAnchorLinks from '@dpc-sdp/ripple-anchor-links'
import RplBreadcrumbs from '@dpc-sdp/ripple-breadcrumbs'
import { RplCardImageNavigation, RplCardNavigation, RplCardNavigationFeatured, RplCardPromotion, RplCardKeydates, RplCardEvent, RplCardCta, RplCardEmergencyContact, RplCardBox, RplCardHonourRoll } from '@dpc-sdp/ripple-card'
import { RplCardCarousel } from '@dpc-sdp/ripple-card/no-ssr'
import RplContact from '@dpc-sdp/ripple-contact'
import { RplDocumentLink } from '@dpc-sdp/ripple-document-link'
import RplEmbeddedVideo from '@dpc-sdp/ripple-embedded-video'
import RplFigure from '@dpc-sdp/ripple-figure'
import RplForm from '@dpc-sdp/ripple-form'
import { RplBaseLayout, RplPageLayout } from '@dpc-sdp/ripple-layout'
import RplList from '@dpc-sdp/ripple-list'
import RplPagination from '@dpc-sdp/ripple-pagination'
import RplPublishDateAndAuthor from '@dpc-sdp/ripple-publish-date-and-author'
import RplRelatedLinks from '@dpc-sdp/ripple-related-links'
import { RplSearchForm } from '@dpc-sdp/ripple-search'
import RplShareThis from '@dpc-sdp/ripple-share-this'
import RplSitemap from '@dpc-sdp/ripple-sitemap'
import { RplTimeline } from '@dpc-sdp/ripple-timeline'
import RplWhatsNext from '@dpc-sdp/ripple-whats-next'
import RplCallToAction from '@dpc-sdp/ripple-call-to-action'
import RplCampaignPrimary from '@dpc-sdp/ripple-campaign-primary'
import RplCampaignSecondary from '@dpc-sdp/ripple-campaign-secondary'
import { RplLatestEvents } from '@dpc-sdp/ripple-event'
import { RplGrantsOverview, RplGrantsListItem } from '@dpc-sdp/ripple-grants'
import { RplHeroBanner, RplIntroBanner, RplHeroBannerCta } from '@dpc-sdp/ripple-hero-banner'
import { RplImageGallery } from '@dpc-sdp/ripple-image-gallery'
import { RplMarkup } from '@dpc-sdp/ripple-markup'
import { RplFeaturedNews, RplNewsListing } from '@dpc-sdp/ripple-news'
import { RplProfileHighlight, RplProfileHighlightHonourRoll } from '@dpc-sdp/ripple-profile'
import { RplPublicationPagination } from '@dpc-sdp/ripple-publication'
import RplSiteFooter from '@dpc-sdp/ripple-site-footer'
import RplSiteHeader from '@dpc-sdp/ripple-site-header'
import RplSiteSectionNavigation from '@dpc-sdp/ripple-site-section-navigation'
import RplUpdatedDate from '@dpc-sdp/ripple-updated-date'

export default {
  name: 'SPrintPage',
  components: {
    RplButton,
    RplDivider,
    RplContainer,
    RplRow,
    RplCol,
    RplIcon,
    RplTextIcon,
    RplLink,
    RplTextLink,
    RplMetaTag,
    RplAlert,
    RplAlertBase,
    RplAnchorLinks,
    RplBreadcrumbs,
    RplCardImageNavigation,
    RplCardNavigation,
    RplCardNavigationFeatured,
    RplCardPromotion,
    RplCardKeydates,
    RplCardEvent,
    RplCardCta,
    RplCardEmergencyContact,
    RplCardBox,
    RplCardHonourRoll,
    RplCardCarousel,
    RplContact,
    RplDocumentLink,
    RplEmbeddedVideo,
    RplFigure,
    RplForm,
    RplBaseLayout,
    RplPageLayout,
    RplList,
    RplPagination,
    RplPublishDateAndAuthor,
    RplRelatedLinks,
    RplSearchForm,
    RplShareThis,
    RplSitemap,
    RplTimeline,
    RplWhatsNext,
    RplCallToAction,
    RplCampaignPrimary,
    RplCampaignSecondary,
    RplLatestEvents,
    RplGrantsOverview,
    RplGrantsListItem,
    RplHeroBanner,
    RplIntroBanner,
    RplHeroBannerCta,
    RplImageGallery,
    RplMarkup,
    RplFeaturedNews,
    RplNewsListing,
    RplProfileHighlight,
    RplProfileHighlightHonourRoll,
    RplPublicationPagination,
    RplSiteFooter,
    RplSiteHeader,
    RplSiteSectionNavigation,
    RplUpdatedDate
  },
  props: {
    mock: Object
  },
  data () {
    return {}
  }
}
</script>
