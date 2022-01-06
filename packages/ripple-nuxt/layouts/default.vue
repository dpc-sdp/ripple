<template>
  <rpl-base-layout :class="{ 'tide-preview-mode': isPreview }">
    <template slot="header" v-if="header">
      <rpl-alert-base class="app-preview" v-if="isPreview">Draft only and not yet published</rpl-alert-base>
      <client-only>
        <component v-if="alerts" :is="alerts" />
        <rpl-site-header v-bind="header" :showSearch="true" />
        <template slot="placeholder">
        <!-- [SDPA-2405] this is only SSR and replaced with component above client side -->
          <rpl-site-header
            :logo="header.logo"
            :breakpoint="header.breakpoint"
            :sticky="header.sticky"
            :showSearch="false"
            :showLogout="false"
          />
        </template>
      </client-only>
    </template>

    <nuxt/>

    <template slot="footer" v-if="footer">
      <rpl-site-footer
        :nav="nav"
        :links="footer.links"
        :copyright="footer.copyright"
        :acknowledgement="footer.acknowledgement"
        :logos="footer.logos"
        />
    </template>

  </rpl-base-layout>
</template>

<script>
import { RplAlertBase } from '@dpc-sdp/ripple-alert'
import { RplBaseLayout } from '@dpc-sdp/ripple-layout'
import RplSiteFooter from '@dpc-sdp/ripple-site-footer'
import RplSiteHeader from '@dpc-sdp/ripple-site-header'
export default {
  components: {
    RplBaseLayout,
    RplAlertBase,
    RplSiteHeader,
    RplSiteFooter
  },
  head () {
    return this.$store.state.page.head
  },
  data () {
    return {
      alerts: [],
      isPreview: false
    }
  },
  created () {
    this.rplOptions.origin = this.$store.state.site?.hostname
    // Set RplMarkup plugins globally
    this.rplOptions.rplMarkup = {
      // plugins: this.$tide.getMarkupPlugins()
    }
  },
  computed: {
    pageType () {
      return this.$store.state.page.type || 'unknown'
    },
    footer () {
      return {
        // acknowledgement: this.$store.state.site.data.acknowledgementToCountry,
        footerLinks: this.$store.state.site?.data?.menus?.menuFooter,
        menu: this.$store.state.site?.data?.menus?.menuMain
      }
    },
    nav () {
      return this.$store.state.site?.data?.menus?.menuMain || []
    },
    header () {
      return {
        logo: this.$store.state.site?.data?.siteLogo,
        breakpoint: 1200,
        links: this.$store.state.site?.data?.menus?.menuMain,
        sticky: true
      }
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/style";

</style>
