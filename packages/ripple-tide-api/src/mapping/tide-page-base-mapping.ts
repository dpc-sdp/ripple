import {
  map as sidebarContactsMapping,
  includes as sidebarContactsIncludes
} from './sidebar-contacts/sidebar-contacts-mapping.js'
import {
  map as sidebarRelatedLinksMapping,
  includes as sidebarRelatedLinksIncludes
} from './sidebar-related-links/sidebar-related-links-mapping.js'

export const tidePageBaseMapping = ({ withSidebar = false }) => {
  const sidebar = {
    contacts: sidebarContactsMapping,
    relatedLinks: sidebarRelatedLinksMapping
  }

  return {
    title: 'title',
    created: 'created',
    modified: 'modified',
    nid: 'id',
    sidebar: withSidebar ? sidebar : undefined,
    _src: (src) => (process.env.NODE_ENV === 'development' ? src : undefined)
  }
}

export const tidePageBaseIncludes = ({ withSidebar = false }) => {
  const sidebarIncludes = [
    ...sidebarContactsIncludes,
    ...sidebarRelatedLinksIncludes
  ]

  return [...(withSidebar ? sidebarIncludes : [])]
}
