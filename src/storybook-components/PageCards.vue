<template>
  <rpl-base-layout class="demo">

    <template slot="header">
      <rpl-site-header v-bind="mock.header" />
    </template>

    <rpl-page-layout class="main" :backgroundGraphic="mock.landingPage.backgroundGraphic">
      <template slot="aboveContent">
        <rpl-hero-banner
          title="Card"
          introText="Test cards."
          class="rpl-site-constrain--on-all"
        />
      </template>

      <rpl-row row-gutter class="demo-main">
        <rpl-col cols="full" :colsBp="mock.siteLayout.cardCols">
          <rpl-card-cta v-bind="mock.cardCta" />
        </rpl-col>
        <rpl-col cols="full" :colsBp="mock.siteLayout.cardCols">
          <rpl-card-honour-roll v-bind="mock.cardHonourRoll" />
        </rpl-col>
        <rpl-col cols="full" :colsBp="mock.siteLayout.cardCols">
          <rpl-card-keydates v-bind="mock.cardKeydates" />
        </rpl-col>
        <rpl-col cols="full" :colsBp="mock.siteLayout.cardCols">
          <rpl-card-cta v-bind="mock.cardCta" image="" />
        </rpl-col>
        <rpl-col cols="full" :colsBp="mock.siteLayout.cardCols">
          <rpl-card-honour-roll v-bind="mock.cardHonourRoll" image="" />
        </rpl-col>
        <rpl-col cols="full" :colsBp="mock.siteLayout.cardCols">
          <rpl-card-keydates v-bind="mock.cardKeydates" />
        </rpl-col>
        <rpl-col cols="full" :colsBp="mock.siteLayout.cardCols">
          <rpl-card-promotion v-bind="mock.cardPromotion" />
        </rpl-col>
        <rpl-col cols="full" :colsBp="mock.siteLayout.cardCols">
          <rpl-card-promotion v-bind="mock.cardPromotion" image="" />
        </rpl-col>
        <rpl-col cols="full" :colsBp="mock.siteLayout.cardCols">
          <rpl-card-honour-roll v-bind="mock.cardHonourRoll" image="" />
        </rpl-col>
      </rpl-row>

    </rpl-page-layout>

    <template slot="footer">
      <rpl-site-footer v-bind="mock.footer" />
    </template>

  </rpl-base-layout>

</template>

<script>
// This is a page for demo the hero banner graphics for the landing page component.

import { RplBaseLayout, RplPageLayout } from '@dpc-sdp/ripple-layout'
import { RplContainer, RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import RplSiteFooter from '@dpc-sdp/ripple-site-footer'
import RplSiteHeader from '@dpc-sdp/ripple-site-header'
import RplHeroBanner from '@dpc-sdp/ripple-hero-banner'

// Cards
import {
  RplCardImageNavigation,
  RplCardNavigation,
  RplCardNavigationFeatured,
  RplCardPromotion,
  RplCardKeydates,
  RplCardEvent,
  RplCardCta,
  RplCardEmergencyContact,
  RplCardBox,
  RplCardHonourRoll
} from '@dpc-sdp/ripple-card'

export default {
  name: 'SPageCards',
  components: {
    // Layout
    RplBaseLayout,
    RplPageLayout,
    RplContainer,
    RplRow,
    RplCol,
    RplSiteHeader,
    RplSiteFooter,
    RplHeroBanner,

    // Card
    RplCardImageNavigation,
    RplCardNavigation,
    RplCardNavigationFeatured,
    RplCardPromotion,
    RplCardKeydates,
    RplCardEvent,
    RplCardCta,
    RplCardEmergencyContact,
    RplCardBox,
    RplCardHonourRoll
  },
  props: {
    mock: Object
  },
  data () {
    return {}
  }
}
</script>
