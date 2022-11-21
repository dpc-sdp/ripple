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
  map as sidebarSocialShareMapping,
  includes as sidebarSocialShareIncludes
} from './sidebar-social-share/sidebar-social-share-mapping.js'
import {
  map as sidebarSiteSectionNavMapping,
  includes as sidebarSiteSectionNavIncludes
} from './sidebar-site-section-nav/sidebar-site-section-nav-mapping.js'

export const tidePageBaseMapping = ({
  withTopicTags = false,
  withSidebarContacts = false,
  withSidebarRelatedLinks = false,
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
    topicTags: topicTagsMapping,
    _src: (src) => (process.env.NODE_ENV === 'development' ? src : undefined)
  }
}

export const tidePageBaseIncludes = ({
  withTopicTags = false,
  withSidebarContacts = false,
  withSidebarRelatedLinks = false,
  withSidebarSocialShare = false,
  withSidebarSiteSectionNav = false
} = {}) => {
  return [
    ...(withTopicTags ? topicTagsIncludes : []),
    ...(withSidebarContacts ? sidebarContactsIncludes : []),
    ...(withSidebarRelatedLinks ? sidebarRelatedLinksIncludes : []),
    ...(withSidebarSocialShare ? sidebarSocialShareIncludes : []),
    ...(withSidebarSiteSectionNav ? sidebarSiteSectionNavIncludes : [])
  ]
}
