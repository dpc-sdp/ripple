import { map as sidebarContactsMapping, includes as sidebarContactsIncludes } from './sidebar-contacts/sidebar-contacts-mapping.js';

export const tidePageBaseMapping = ({
  withSidebar = false
}) => {
  const sidebar = {
    contacts: sidebarContactsMapping
  }

  return {
    title: 'title',
    created: 'created',
    modified: 'modified',
    nid: 'nid',
    sidebar: withSidebar ? sidebar : undefined,
    _src: (src) => (process.env.NODE_ENV === 'development' ? src : undefined)
  }
}

export const tidePageBaseIncludes = ({
  withSidebar = false
}) => {
  const sidebarIncludes = [
    ...sidebarContactsIncludes
  ]

  return [
    ...(withSidebar ? sidebarIncludes : []),
  ]
}
