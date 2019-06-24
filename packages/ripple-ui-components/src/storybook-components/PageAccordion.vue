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
        @search="searchFunc"
      />
    </template>

    <rpl-page-layout
      :sidebar="true"
      class="main"
      :backgroundGraphic="mock.landingPage.backgroundGraphic"
    >
      <template slot="aboveContent">
        <rpl-hero-banner
          title="Accordion Page"
          introText="Test accordion page."
          class="rpl-site-constrain--on-all"
        />
      </template>

      <rpl-row row-gutter>
        <rpl-col cols="full">
          <rpl-accordion v-bind="mock.accordion"/>
        </rpl-col>
      </rpl-row>

      <rpl-row row-gutter>
        <rpl-col cols="full">
          <rpl-markup :html="pageBody" />
        </rpl-col>
      </rpl-row>

      <rpl-row row-gutter>
        <rpl-col cols="full">
          <rpl-accordion v-bind="mock.accordion"/>
        </rpl-col>
      </rpl-row>

      <rpl-row row-gutter>
        <rpl-col cols="full">
          <rpl-accordion v-bind="mock.accordion"/>
        </rpl-col>
      </rpl-row>

      <template slot="sidebar">
        <rpl-contact v-bind="mock.contact" class="rpl-component-gutter"/>
      </template>

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

// Form
import RplAccordion from '@dpc-sdp/ripple-accordion'
import RplMarkup from '@dpc-sdp/ripple-markup'

// Sidebar
import RplContact from '@dpc-sdp/ripple-contact'

// Banner
import RplHeroBanner from '@dpc-sdp/ripple-hero-banner'
import RplButton from '@dpc-sdp/ripple-button'

export default {
  name: 'SPageProfile',
  components: {
    // Layout
    RplBaseLayout,
    RplPageLayout,
    RplContainer,
    RplRow,
    RplCol,
    RplSiteHeader,
    RplSiteFooter,

    // Profile
    RplAccordion,
    RplMarkup,

    // Sidebar
    RplContact,

    // Banner
    RplHeroBanner,
    RplButton
  },
  props: {
    mock: Object
  },
  data () {
    return {
      pageBody: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodent tempor incididunt ut labore et dolore magna aliqua.</p> <p>Unde omnis ist natus error siten voluptatem accusantium doloremque laudantium, totam rement eaque ipsa quae ab illo inventore veritatis et quasi architecto.</p> <p><a href="http://www.google.com" class="button">This is a link</a></p>'
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
