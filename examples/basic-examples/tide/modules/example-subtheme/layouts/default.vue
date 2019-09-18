<template>
  <rpl-base-layout>
    <template slot="header">
      <rpl-alert-base class="app-preview" v-if="preview">Draft only and not yet published</rpl-alert-base>
      <no-ssr>
        <component v-if="alerts" :is="alerts" />
        <my-site-header
          :logo="header.logo"
          :links="nav"
          :breakpoint="header.breakpoint"
          :searchTerms="header.searchTerms"
          :sticky="header.sticky"
          :showSearch="true"
          :showLogout="showLogout"
          @logout="logoutFunc"
          @search="searchFunc"
        />
        <template slot="placeholder">
        <!-- [SDPA-2405] this is only SSR and replaced with component above client side -->
          <my-site-header
            :logo="header.logo"
            :breakpoint="header.breakpoint"
            :sticky="header.sticky"
            :showSearch="false"
            :showLogout="false"
          />
        </template>
      </no-ssr>
    </template>

    <nuxt/>

    <template slot="footer">
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
import DefaultLayout from '@dpc-sdp/ripple-nuxt-tide/lib/layouts/default.vue'
import { RplAlertBase } from '@dpc-sdp/ripple-alert'
import { RplBaseLayout } from '@dpc-sdp/ripple-layout'
import RplSiteFooter from '@dpc-sdp/ripple-site-footer'
import MySiteHeader from '~/tide/modules/example-subtheme/components/SiteHeader'

export default {
  extends: DefaultLayout,
  components: {
    RplAlertBase,
    RplBaseLayout,
    RplSiteFooter,
    MySiteHeader
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/style";
@import "~@dpc-sdp/ripple-nuxt-tide/lib/components/scss/wysiwyg/_embedded-entity-video.scss";
@import "~@dpc-sdp/ripple-nuxt-tide/lib/components/scss/wysiwyg/_embedded-entity.scss";
.rpl-above-content {
  background-size: 0;
}
</style>
