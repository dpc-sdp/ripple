/**
 * Get the site section data
 * @param {string|number} sectionId
 * @param {Object[]} sites - Tide field_node_site data
 * @returns {Object} site section data
 */
const getSiteSectionData = (sectionId, sites) => {
  sectionId = parseInt(sectionId)
  const site = sites.find(site => site.drupal_internal__tid === sectionId)
  if (site) {
    return {
      id: sectionId,
      name: site.name,
      quickexit: site.field_site_show_exit_site || false
    }
  } else {
    return null
  }
}

export { getSiteSectionData }
