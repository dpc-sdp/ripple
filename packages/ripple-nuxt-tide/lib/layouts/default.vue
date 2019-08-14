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
import { clientClearToken, isAuthenticated, isPreview } from '@dpc-sdp/ripple-nuxt-tide/modules/authenticated-content/lib/authenticate'

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
        return () => import('@dpc-sdp/ripple-nuxt-tide/modules/alert/components/TideAlert.vue')
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
        return isPreview(this.$store)
      }
      return false
    }
  },
  mounted () {
    // https://github.com/nuxt/nuxt.js/issues/183#issuecomment-276528719
    // Seems like nuxt doesn't pass url hash to vue router in SSR.
    // That means anchor link url like "/ndis-quality-and-safeguards#ndis-worker-screening" won't work in SSR.
    // Here is a workaround inspired by https://forum.vuejs.org/t/how-to-handle-anchors-bookmarks-with-vue-router/14563/5
    if (this.$route.hash) {
      this.anchorScrollFix(this.$route.hash)
    }
  },
  methods: {
    anchorScrollFix (hashbang) {
      const elmnt = document.querySelector(hashbang)
      elmnt.scrollIntoView()
    },
    async logoutFunc () {
      if (this.$tide.isModuleEnabled('authenticatedContent')) {
        try {
          await this.$tide.post(`user/logout?_format=json`)
          clientClearToken(this.$store)
          this.$router.push({ path: '/' })
        } catch (e) {
          // TODO: we should display error to user instead of log here.
          console.log(`Tide logout failed`)
        }
      } else {
        // TODO: we should display error to user instead of log here.
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
      plugins: this.$tide.getMarkupPlugins()
    }
    if (this.$tide.isModuleEnabled('authenticatedContent')) {
      // If logged in and session has expired, logout the user
      if (this.showLogout) {
        if (!isAuthenticated(this.$store)) {
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
</style>
