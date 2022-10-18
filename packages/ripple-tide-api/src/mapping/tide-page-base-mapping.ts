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

export const tidePageBaseMapping = ({
  withSidebarContacts = false,
  withSidebarRelatedLinks = false,
  withSidebarSocialShare = false
}) => {
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

  return {
    title: 'title',
    created: 'created',
    modified: 'modified',
    nid: 'id',
    sidebar: sidebar,
    _src: (src) => (process.env.NODE_ENV === 'development' ? src : undefined)
  }
}

export const tidePageBaseIncludes = ({
  withSidebarContacts = false,
  withSidebarRelatedLinks = false,
  withSidebarSocialShare = false
}) => {
  return [
    ...(withSidebarContacts ? sidebarContactsIncludes : []),
    ...(withSidebarRelatedLinks ? sidebarRelatedLinksIncludes : []),
    ...(withSidebarSocialShare ? sidebarSocialShareIncludes : [])
  ]
}
