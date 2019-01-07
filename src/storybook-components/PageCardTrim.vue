<template>
  <rpl-base-layout class="demo">

    <template slot="header">
      <rpl-site-header
        :logo="mock.header.logo"
        :links="mock.header.links"
        :breakpoint="mock.header.breakpoint"
        :searchTerms="mock.header.searchTerms"
        showSearch
        sticky
        @open="menuOpenFunc"
        @search="searchFunc"
      />
    </template>

    <rpl-page-layout
      class="main"
      :backgroundGraphic="mock.landingPage.backgroundGraphic"
    >
      <template slot="aboveContent">
        <rpl-hero-banner
          title="Card Trimming"
          introText="Test summary trimming on Promotion and Event cards."
          class="rpl-site-constrain--on-all"
        />
      </template>

      <rpl-row row-gutter class="demo-main">
        <rpl-col cols="full">
          <rpl-card-carousel title="Carousel Cards" :cards="carouselCards" />
        </rpl-col>
        <rpl-col cols="full" :colsBp="mock.siteLayout.cardCols">
          <rpl-card-event v-bind="carouselCards[0].data" />
        </rpl-col>
        <rpl-col cols="full" :colsBp="mock.siteLayout.cardCols">
          <rpl-card-promotion v-bind="carouselCards[1].data" />
        </rpl-col>
        <rpl-col cols="full" :colsBp="mock.siteLayout.cardCols">
          <rpl-card-event v-bind="carouselCards[2].data" />
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

// Cards
import { RplCardPromotion, RplCardEvent } from '@dpc-sdp/ripple-card'
import { RplCardCarousel } from '@dpc-sdp/ripple-card/no-ssr'

// Banner
import RplHeroBanner from '@dpc-sdp/ripple-hero-banner'

export default {
  name: 'SPageCardTrim',
  components: {
    // Layout
    RplBaseLayout,
    RplPageLayout,
    RplContainer,
    RplRow,
    RplCol,
    RplSiteHeader,
    RplSiteFooter,

    // Card
    RplCardPromotion,
    RplCardEvent,
    RplCardCarousel,

    // Banner
    RplHeroBanner
  },
  props: {
    mock: Object
  },
  data () {
    return {
      carouselCards: [
        {
          name: 'rpl-card-event',
          data: {
            image: 'https://placehold.it/335x200',
            dateStart: '2018-07-10T09:00:00.000+10:00',
            location: 'South Yarra',
            title: 'This is the headline of an event',
            summary: 'In consequat consectetur consectetur nisi consectetur aliquip voluptate elit consequat ullamco. Id pariatur voluptate sit elit velit mollit ea magna ea nulla ex. Sit qui quis ut esse ullamco tempor voluptate ipsum mollit anim eu sunt minim velit. Sit qui quis ut esse ullamco tempor voluptate ipsum mollit anim eu sunt minim velit.',
            link: { text: 'See event details', url: '#' }
          }
        },
        {
          name: 'rpl-card-promotion',
          data: {
            image: 'https://placehold.it/335x200',
            date: '2018-07-10T09:00:00.000+10:00',
            topic: 'News',
            title: 'This is the headline of an event',
            summary: 'In consequat consectetur consectetur nisi consectetur aliquip voluptate elit consequat ullamco. Id pariatur voluptate sit elit velit mollit ea magna ea nulla ex. Sit qui quis ut esse ullamco tempor voluptate ipsum mollit anim eu sunt minim velit. Sit qui quis ut esse ullamco tempor voluptate ipsum mollit anim eu sunt minim velit.',
            link: { text: 'Read more', url: '#' }
          }
        },
        {
          name: 'rpl-card-event',
          data: {
            image: 'https://placehold.it/335x200',
            dateStart: '2018-07-10T09:00:00.000+10:00',
            location: 'South Yarra',
            title: 'This is the headline of an event',
            summary: 'In consequat consectetur consectetur nisi consectetur aliquip voluptate elit consequat ullamco. Id pariatur voluptate sit elit velit mollit ea magna ea nulla ex. Sit qui quis ut esse ullamco tempor voluptate ipsum mollit anim eu sunt minim velit. Sit qui quis ut esse ullamco tempor voluptate ipsum mollit anim eu sunt minim velit.',
            link: { text: 'See event details', url: '#' }
          }
        }
      ]
    }
  },
  methods: {
    // Methods for site header.
    searchFunc: function (value) {
      alert('Search for: "' + value + '"')
    },

    // Methods for site header.
    menuOpenFunc: function (menuOpenState) {
      document.body.style.overflow = menuOpenState ? 'hidden' : ''
    }
  }
}
</script>
