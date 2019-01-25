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
      :sidebar="true"
      class="main"
      :backgroundGraphic="mock.landingPage.backgroundGraphic"
    >
      <template slot="aboveContent">
        <rpl-hero-banner
          title="Profile Page"
          introText="Test profile page."
          class="rpl-site-constrain--on-all"
        />
      </template>

      <rpl-row row-gutter>
        <rpl-col cols="full">
          <rpl-profile-highlight-honour-roll v-bind="mock.profileHightlightHonourRoll"/>
        </rpl-col>
      </rpl-row>

      <rpl-row row-gutter>
        <rpl-col cols="full">
          <rpl-markup :html="pageBody" />
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
import { RplProfileHighlightHonourRoll } from '@dpc-sdp/ripple-profile'
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
    RplProfileHighlightHonourRoll,
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
      pageBody: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodent tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimum are veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ean pret commodo consequat.</p> <p>This is a hyperlink. And here it is on hover. Unde omnis ist natus error siten voluptatem accusantium doloremque laudantium, totam rement eaque ipsa quae ab illo inventore veritatis et quasi architecto.</p> <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet. </p> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodent tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimum are veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ean pret commodo consequat.</p> <p>This is a hyperlink. And here it is on hover. Unde omnis ist natus error siten voluptatem accusantium doloremque laudantium, totam rement eaque ipsa quae ab illo inventore veritatis et quasi architecto.</p> <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.</p><p><a href="http://www.google.com" class="button">See all inductees</a></p>'
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
