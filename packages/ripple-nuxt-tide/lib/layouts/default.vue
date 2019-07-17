<template>
  <rpl-base-layout>
    <template slot="header">
      <rpl-alert-base class="app-preview" v-if="preview">Draft only and not yet published</rpl-alert-base>
      <no-ssr>
        <component v-if="alert" :is="alert" />
        <rpl-site-header
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
          <rpl-site-header
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
import markupPlugins from '@dpc-sdp/ripple-nuxt-tide/lib/core/markup-plugins-loader'
import { isTokenExpired, getToken, clearToken, isAuthenticated } from '@dpc-sdp/ripple-nuxt-tide/modules/authenticated-content/lib/authenticate'
import { isPreviewPath } from '@dpc-sdp/ripple-nuxt-tide/modules/authenticated-content/lib/preview'

export default {
  components: {
    RplAlertBase,
    RplBaseLayout,
    RplSiteFooter,
    RplSiteHeader
  },
  data () {
    let _store = this.$store
    return {
      nav: _store.state.tide.siteData.hierarchicalMenus.menuMain,
      footer: {
        links: _store.state.tide.siteData.hierarchicalMenus.menuFooter,
        copyright: _store.state.tide.siteData.field_site_footer_text ? _store.state.tide.siteData.field_site_footer_text.processed : null,
        acknowledgement: _store.state.tide.siteData.field_acknowledgement_to_country ? _store.state.tide.siteData.field_acknowledgement_to_country : null,
        logos: this.getFooterLogos(_store.state.tide.siteData)
      },
      header: {
        logo: _store.state.tide.siteData.siteLogo,
        breakpoint: 992,
        links: _store.state.tide.siteData.hierarchicalMenus.menuMain,
        sticky: true
      }
    }
  },
  computed: {
    alert () {
      if (this.$tide.isModuleEnabled('alert')) {
        // return () => import('@dpc-sdp/ripple-nuxt-tide/modules/alert/components/TideAlert.vue')
      }
      return false
    },
    showLogout () {
      if (this.$tide.isModuleEnabled('authenticatedContent')) {
        return isAuthenticated(this.$store)
      }
      return false
    },
    preview () {
      if (this.$tide.isModuleEnabled('authenticatedContent')) {
        if (isAuthenticated(this.$store)) {
          const token = getToken()
          return isPreviewPath(this.$route.path) && token && !isTokenExpired(token)
        }
      }
      return false
    }
  },
  methods: {
    async logoutFunc () {
      if (this.$tide.isModuleEnabled('authenticatedContent')) {
        try {
          await this.$tide.post(`user/logout?_format=json`)
          clearToken(this.$store)
          this.$router.push({ path: '/' })
        } catch (e) {
          console.log(`Tide logout failed`)
        }
      } else {
        console.warn(`Authentication module is disabled - unable to log out`)
      }
    },
    searchFunc (searchInput) {
      // Go to search result page.
      // If already on search result page, rebuild the page from server so we can run async data.
      if (this.$route.path !== '/search') {
        this.$tideSearch.searchPageRedirect('/search', searchInput)
      } else {
        window.location.href = `/search?q=${searchInput}`
      }
    },
    getFooterLogos (siteData) {
      let logos = []
      if (typeof siteData.field_site_footer_logos !== 'undefined') {
        siteData.field_site_footer_logos.map(logo => {
          const logoLink = this.$tideMapping.filter(logo.field_paragraph_cta, ['paragraphCta'])
          logos.push({
            alt: logoLink.text,
            url: logoLink.url,
            src: logo.field_paragraph_media.field_media_image.url
          })
        })
      }

      return logos
    }
  },
  created () {
    // Set ripple quickexit option by tide site settings
    this.rplOptions.quickexit = this.$store.state.tide.siteData.field_site_show_exit_site
    this.rplOptions.origin = this.$store.state.tide.protocol + '//' + this.$store.state.tide.host
    // Set RplMarkup plugins globally
    this.rplOptions.rplMarkup = {
      plugins: markupPlugins
    }
    if (this.$tide.isModuleEnabled('authenticatedContent')) {
      // If logged in and session has expired, logout the user
      if (this.showLogout) {
        if (isTokenExpired(getToken())) {
          this.logoutFunc()
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/style";
@import "~@dpc-sdp/ripple-nuxt-tide/lib/components/scss/wysiwyg/_embedded-entity-video.scss";
@import "~@dpc-sdp/ripple-nuxt-tide/lib/components/scss/wysiwyg/_embedded-entity.scss";
// @import "~assets/_custom.scss";
// TODO : these ~ alias wont work, need a different way
</style>
