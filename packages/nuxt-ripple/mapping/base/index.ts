import {
  map as topicTagsMapping,
  includes as topicTagsIncludes
} from './topic-tags/topic-tags-mapping.js'
import {
  map as sidebarContactsMapping,
  includes as sidebarContactsIncludes
} from './sidebar-contacts/sidebar-contacts-mapping.js'
import {
  map as sidebarRelatedLinksMapping,
  includes as sidebarRelatedLinksIncludes
} from './sidebar-related-links/sidebar-related-links-mapping.js'
import {
  map as sidebarWhatsNextMapping,
  includes as sidebarWhatsNextIncludes
} from './sidebar-whats-next/sidebar-whats-next-mapping.js'
import {
  map as sidebarSocialShareMapping,
  includes as sidebarSocialShareIncludes
} from './sidebar-social-share/sidebar-social-share-mapping.js'
import {
  map as sidebarSiteSectionNavMapping,
  includes as sidebarSiteSectionNavIncludes
} from './sidebar-site-section-nav/sidebar-site-section-nav-mapping.js'
import TidePageMeta from './page-meta.js'
import { TidePageApi, getSiteSection } from '@dpc-sdp/ripple-tide-api'

export const tidePageBaseMapping = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  withTopicTags = false,
  withSidebarContacts = false,
  withSidebarRelatedLinks = false,
  withSidebarWhatsNext = false,
  withSidebarSocialShare = false,
  withSidebarSiteSectionNav = false
} = {}) => {
  const sidebar: any = {}

  if (withSidebarContacts) {
    sidebar.contacts = sidebarContactsMapping
  }

  if (withSidebarRelatedLinks) {
    sidebar.relatedLinks = sidebarRelatedLinksMapping
  }

  if (withSidebarWhatsNext) {
    sidebar.whatsNext = sidebarWhatsNextMapping
  }

  if (withSidebarSocialShare) {
    sidebar.socialShareNetworks = sidebarSocialShareMapping
  }

  if (withSidebarSiteSectionNav) {
    sidebar.siteSectionNav = sidebarSiteSectionNavMapping
  }

  return {
    title: 'title',
    created: 'created',
    changed: 'changed',
    nid: 'id',
    sidebar: sidebar,
    status: 'moderation_state',
    topicTags: topicTagsMapping,
    siteSection: async (src, tidePageApi: TidePageApi) => {
      // With the correct site/section id, we can now choose the correct site data from 'field_node_site'
      const siteData = getSiteSection(tidePageApi.sectionId, src)

      if (!siteData) {
        return null
      }

      return {
        id: siteData.drupal_internal__tid,
        name: siteData.name
      }
    },
    ...TidePageMeta,
    showContentRating: 'field_show_content_rating',
    _src: (src: any) =>
      process.env.NODE_ENV === 'development' ? src : undefined
  }
}

export const tidePageBaseIncludes = ({
  withTopicTags = false,
  withSidebarContacts = false,
  withSidebarRelatedLinks = false,
  withSidebarWhatsNext = false,
  withSidebarSocialShare = false,
  withSidebarSiteSectionNav = false
} = {}) => {
  return [
    ...(withTopicTags ? topicTagsIncludes : []),
    ...(withSidebarContacts ? sidebarContactsIncludes : []),
    ...(withSidebarRelatedLinks ? sidebarRelatedLinksIncludes : []),
    ...(withSidebarWhatsNext ? sidebarWhatsNextIncludes : []),
    ...(withSidebarSocialShare ? sidebarSocialShareIncludes : []),
    ...(withSidebarSiteSectionNav ? sidebarSiteSectionNavIncludes : [])
  ]
}

export default {
  includes: tidePageBaseIncludes(),
  mapping: tidePageBaseMapping()
}
