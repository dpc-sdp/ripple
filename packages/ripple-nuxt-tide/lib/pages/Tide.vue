<template>
  <div :class="page.class">
    <rpl-page-layout
      v-if="page && pageType"
      :sidebar="sidebar"
      :backgroundColor="page.field_landing_page_bg_colour"
      :heroBackgroundImage="page.appHeroBgImage"
      :backgroundGraphic="heroBgGraphic"
      :class="{ 'app-home': page.appIsHome }"
      class="app-main"
    >
      <template slot="breadcrumbs">
        <rpl-breadcrumbs v-if="!page.appIsHome" :crumbs="page.breadcrumbs" />
      </template>

      <template slot="aboveContent">
        <component
          :is="heroBanner.component"
          v-if="heroBanner"
          v-bind="heroBanner.data"
          class="rpl-site-constrain--on-all"
        />
        <rpl-acknowledgement v-if="page.field_show_ack_of_country" :text="acknowledgement" theme="standalone" />
      </template>

      <template slot="aboveContentTwo">
        <template v-if="headerComponents">
          <template v-for="headerComponent in headerComponents">
            <component
              :is="headerComponent.component"
              v-bind="headerComponent.data"
              :class="headerComponent.class"
              :key="headerComponent.id"
              v-on="headerComponent.name === 'rpl-search-form' ? { search: ($event) => { return searchFunc($event, headerComponent.data)} } : {}"
              v-if="headerComponent && headerComponent.component"
            ></component>
          </template>
        </template>
        <template v-if="campaignPrimary && campaignPrimary.component">
          <component
            :is="campaignPrimary.component"
            v-bind="campaignPrimary.data"
          ></component>
        </template>
      </template>

      <component :is="pageType" :page="page" :anchor-links="anchorLinks" :sidebar="sidebar"></component>
      <rpl-updated-date v-bind="updatedDate.data"></rpl-updated-date>

      <template slot="sidebar">
        <app-sidebar :sidebarComponents="sidebarComponents"></app-sidebar>
      </template>

      <template slot="belowContent">
        <component class="rpl-site-constrain--on-all" v-if="campaignSecondary" :is="campaignSecondary.component" v-bind="campaignSecondary.data"></component>
        <component :is="contentRating" :siteSectionName="siteSectionName" class="rpl-site-constrain--on-all"></component>
      </template>

    </rpl-page-layout>

    <rpl-page-layout v-else class="app-main">
      <app-error :type="errorType || '404'" />
    </rpl-page-layout>
  </div>
</template>

<script>
// App.
import AppError from '../components/AppError'
import AppSidebar from '../components/AppSidebar'

// Layout.
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import { RplPageLayout } from '@dpc-sdp/ripple-layout'
import RplBreadcrumbs from '@dpc-sdp/ripple-breadcrumbs'
import RplUpdatedDate from '@dpc-sdp/ripple-updated-date'
import { RplHeroBanner, RplIntroBanner } from '@dpc-sdp/ripple-hero-banner'
import { RplAcknowledgement } from '@dpc-sdp/ripple-site-footer'

// Mixin.
import dataLayer from '@dpc-sdp/ripple-nuxt-tide/lib/mixins/data-layer'

import { anchorUtils } from '@dpc-sdp/ripple-nuxt-tide/lib/core/anchorlinks.js'
import { getAnchorLinkName, isExternalUrl } from '@dpc-sdp/ripple-global/utils/helpers.js'

import { searchPageRedirect } from '@dpc-sdp/ripple-nuxt-tide/modules/search/lib/search/helpers'

export default {
  components: {
    AppError,
    AppSidebar,
    RplHeroBanner,
    RplAcknowledgement,
    RplIntroBanner,
    RplUpdatedDate,
    RplBreadcrumbs,
    RplPageLayout,
    RplRow,
    RplCol
  },
  name: 'TidePage',
  mixins: [dataLayer],
  data () {
    return {
      page: null,
      sidebar: false,
      campaignPrimary: null,
      campaignSecondary: null,
      heroBanner: null,
      sidebarComponents: null

    }
  },
  created () {
    if (this.page.appCampaignPrimary) {
      this.campaignPrimary = this.$tide.getDynamicComponent(this.page.appCampaignPrimary, this.page.sidebar)
    }
    if (this.page.appCampaignSecondary) {
      this.campaignSecondary = this.$tide.getDynamicComponent(this.page.appCampaignSecondary, this.page.sidebar)
    }
    if (this.page.appHeroBanner) {
      this.heroBanner = this.$tide.getDynamicComponent(this.page.appHeroBanner)
    }
    if (this.page.sidebarComponents && this.page.sidebarComponents.length > 0) {
      this.sidebarComponents = this.$tide.getDynamicComponents(this.page.sidebarComponents, this.page.sidebar)
    }
    if (this.page.section) {
      this.$store.commit('tideSite/setSiteSection', parseInt(this.page.section, 10))
    }
  },
  methods: {
    searchFunc (searchInput, componentData) {
      const contentType = componentData.type
      let path = ''
      let filters = ''
      let isInternalUrl = true
      let openInNewWindow = false
      switch (contentType) {
        case 'custom':
          path = componentData.searchTarget.replace('[SEARCH-KEYWORDS]', encodeURIComponent(searchInput))
          isInternalUrl = !isExternalUrl(path, this.rplOptions.hostname)
          openInNewWindow = (componentData.linkTarget === true)
          break
        case 'event':
          path = '/whatson'
          break
        case 'news':
          path = '/search'
          filters = { 'type': 'news' }
          break
        default:
          path = '/search'
          break
      }
      if (openInNewWindow) {
        window.open(path, '_blank')
      } else if (isInternalUrl) {
        searchPageRedirect(this.$router, path, searchInput, filters)
      } else {
        window.location.href = path
      }
    }
  },
  computed: {
    anchorLinks () {
      if (this.page.field_show_table_of_content && this.page.appDComponents) {
        const anchors = []
        this.page.appDComponents.forEach(component => {
          if (component && component.name && component.data) {
            switch (component.name) {
              case 'rpl-markup':
                if (component.data.html) {
                  let showSubHeading = false
                  if (this.page.field_node_display_headings && this.page.field_node_display_headings === 'showH2AndH3') {
                    showSubHeading = true
                  }
                  anchors.push(...anchorUtils.getAnchorLinks(component.data.html, showSubHeading))
                }
                break
              case 'rpl-accordion':
                if (component.data.title) {
                  anchors.push({ text: component.data.title, url: `#${getAnchorLinkName(component.data.title)}` })
                }
                break
            }
          }
        })
        return anchors
      }
      return []
    },
    heroBgGraphic () {
      if (this.page.field_graphical_image && this.page.field_graphical_image.field_media_image) {
        return this.page.field_graphical_image.field_media_image.url
      } else {
        return '/img/header-pattern-shape.png'
      }
    },
    acknowledgement () {
      return this.$store.state.tide.siteData.field_prominence_ack_to_country ? this.$store.state.tide.siteData.field_prominence_ack_to_country : null
    },
    updatedDate () {
      return {
        data: {
          date: this.page.changed.toString() || this.page.created.toString()
        }
      }
    },
    headerComponents () {
      if (this.page.appHeaderComponents && this.page.appHeaderComponents.length > 0) {
        return this.$tide.getDynamicComponents(this.page.appHeaderComponents, this.page.sidebar)
      }
      return []
    },
    pageType () {
      if (this.page.type) {
        return this.$tide.getPageTypeTemplate(this.page.type)
      } else {
        return false
      }
    },
    contentRating () {
      if (this.page.field_show_content_rating && this.$tide.isModuleEnabled('webform')) {
        return () => import('@dpc-sdp/ripple-nuxt-tide/modules/webform/components/TideContentRating')
      }
      return false
    },
    siteSectionName () {
      return this.page.appSection?.name
    }
  },
  async asyncData (context) {
    const pageData = await context.app.$tide.callMiddleware(context)

    return {
      errorType: pageData.tideErrorType,
      page: pageData.tidePage,
      sidebar: pageData.tideLayout ? pageData.tideLayout.sidebar : false
    }
  }
}
</script>
