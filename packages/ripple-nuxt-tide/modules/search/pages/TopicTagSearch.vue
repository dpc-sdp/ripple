<template>
 <rpl-page-layout class="app-main" :sidebar="sidebar">

    <template slot="aboveContent" >
      <rpl-hero-banner :title="title" class="rpl-site-constrain--on-all"/>
    </template>

    <rpl-search-results
      :searchResults="searchResults"
      :pager="searchResults.length === 0 ? undefined : pager"
      :responseSize="searchResults.length === 0 ? 0 : searchOptions.responseSize"
      :count="searchResults.length === 0 ? 0 : count"
      :errorMsg="errorMsg"
      :noResultsMsg="noResultsCopy"
      :childColsBp="sidebar ? cardColBp.narrow : cardColBp.wide"
      @pager-change="changed"
      :type="searchComponent"
    />

  </rpl-page-layout>
</template>

<script>
import RplBreadcrumbs from '@dpc-sdp/ripple-breadcrumbs'
import RplHeroBanner from '@dpc-sdp/ripple-hero-banner'
import { RplSearchForm, RplSearchResults } from '@dpc-sdp/ripple-search'
import { RplDivider } from '@dpc-sdp/ripple-global'

// Layout.
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import { RplPageLayout } from '@dpc-sdp/ripple-layout'
import searchMixin from './../lib/searchmixin.js'

export default {
  name: 'TideTopicTagSearch',
  components: {
    RplDivider,
    RplHeroBanner,
    RplBreadcrumbs,
    RplSearchForm,
    RplSearchResults,

    // Layout.
    RplPageLayout,
    RplRow,
    RplCol
  },
  mixins: [searchMixin],
  async asyncData ({ app, route, store }) {
    const topicTagData = await app.$tide.getPageByPath(route.path)
    const title = topicTagData.name
    const type = topicTagData.type ? topicTagData.type.replace('taxonomy_term--', '') : ''
    await store.dispatch('tide/setPageHead', { title: `${type.charAt(0).toUpperCase() + type.slice(1)} - ${title}` })
    return {
      sidebar: false,
      searchComponent: 'default',
      title: title,
      type: type,
      setPageTitleOnResults: false,
      searchForm: {
        filterForm: {
          tideId: 'tide_search_form',
          model: {},
          schema: {
            fields: []
          },
          formOptions: {
            validateAfterLoad: false,
            validateAfterChanged: false
          },
          formState: {}
        }
      },
      searchOptions: {
        currentSiteOnly: true,
        defaultHits: false,
        responseSize: 10,
        isMatchAll: false,
        filterFromURI: ['*'],
        qFields: [
          'body',
          'field_landing_page_summary',
          'field_page_intro_text',
          'field_paragraph_body',
          'field_paragraph_summary',
          'summary_processed',
          'title'
        ],
        sFields: [
          'changed',
          'created',
          'field_landing_page_summary',
          'field_node_primary_site',
          'field_page_intro_text',
          'field_tags_name',
          'field_topic_name',
          'summary_processed',
          'title',
          'type',
          'url'
        ]
      }
    }
  },
  computed: {
    fields () {
      switch (this.type) {
        case 'tags':
          return [
            {
              type: 'rplchecklist',
              model: 'field_tags_name',
              values: [this.title],
              filter: {
                type: 'term',
                operator: ''
              }
            }
          ]
        case 'topic':
          return [
            {
              type: 'rplchecklist',
              model: 'field_topic_name',
              values: [this.title],
              filter: {
                type: 'term',
                operator: ''
              }
            }
          ]
        default:
          return []
      }
    },
    contentRating () {
      if (this.$tide.isModuleEnabled('webform')) {
        return () => import('@dpc-sdp/ripple-nuxt-tide/modules/webform/components/TideContentRating')
      }
      return false
    }
  },
  methods: {
    getComputedFilters () {
      switch (this.type) {
        case 'tags':
          return {
            field_tags_name: {
              type: 'term',
              values: [this.title],
              fields: 'field_tags_name'
            }
          }
        case 'topic':
          return {
            field_topic_name: {
              type: 'term',
              values: [this.title],
              fields: 'field_topic_name'
            }
          }
        default:
          return {}
      }
    },
    validDate: (date) => {
      return typeof date === 'string'
    },
    getDescription: (source) => {
      const type = source.type[0]
      let summary = null
      if (type === 'news' || type === 'page') {
        summary = typeof source.summary_processed !== 'undefined' ? source.summary_processed[0] : (typeof source.field_page_intro_text !== 'undefined' ? source.field_page_intro_text[0] : '')
      } else {
        summary = typeof source.field_landing_page_summary !== 'undefined' ? source.field_landing_page_summary[0] : ''
      }
      return summary
    },
    mapSearchResults (source) {
      const site = this.$store.state.tide.siteData.drupal_internal__tid
      let date = source.changed ? source.changed[0] : source.created[0]
      return {
        title: source.title ? source.title[0] : '',
        link: this.getLink(source.url, site, source.field_node_primary_site, this.$store.state.tideSite.sitesDomainMap, { text: 'linkText', url: 'linkUrl' }),
        date: this.validDate(date) ? date : '',
        description: this.getDescription(source),
        tags: []
      }
    }
  }
}
</script>
