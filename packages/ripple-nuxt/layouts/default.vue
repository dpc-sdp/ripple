<template>
  <rpl-base-layout :class="{ 'tide-preview-mode': preview }">
    <template slot="header" v-if="header">
      <rpl-alert-base class="app-preview" v-if="preview">Draft only and not yet published</rpl-alert-base>
      <client-only>
        <component v-if="alerts" :is="alerts" />
        <rpl-site-header
          :logo="header.logo"
          :links="nav"
          :breakpoint="header.breakpoint"
          :searchTerms="header.searchTerms"
          :sticky="header.sticky"
          :showSearch="true"
        />
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
        :caption="footerCaption"
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
  data () {
    return {
      header: {},
      footer: {},
      nav: []
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/style";

</style>
