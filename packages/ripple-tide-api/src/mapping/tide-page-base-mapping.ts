import {
  map as sidebarContactsMapping,
  includes as sidebarContactsIncludes
} from './sidebar-contacts/sidebar-contacts-mapping.js'
import {
  map as sidebarRelatedLinksMapping,
  includes as sidebarRelatedLinksIncludes
} from './sidebar-related-links/sidebar-related-links-mapping.js'

export const tidePageBaseMapping = ({
  withSidebarContacts = false,
  withSidebarRelatedLinks = false
}) => {
  const sidebar: any = {}

  if (withSidebarContacts) {
    sidebar.contacts = sidebarContactsMapping
  }

  if (withSidebarRelatedLinks) {
    sidebar.relatedLinks = sidebarRelatedLinksMapping
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
  withSidebarRelatedLinks = false
}) => {
  return [
    ...(withSidebarContacts ? sidebarContactsIncludes : []),
    ...(withSidebarRelatedLinks ? sidebarRelatedLinksIncludes : [])
  ]
}
