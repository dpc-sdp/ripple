export default {
  publication: async (context, results) => {
    if (results.tidePage && ['node--publication', 'node--publication_page'].includes(results.tidePage.type)) {
      if (!results.tidePage.sidebarComponents || !Array.isArray(results.tidePage.sidebarComponents)) {
        results.tidePage.sidebarComponents = []
      }

      let downloadLinks = null
      let publicationTitle = null
      if (results.tidePage.type === 'node--publication') {
        downloadLinks = context.app.$tideMapping.mappingFilters.fieldNodeDocuments(results.tidePage.field_node_documents)
        publicationTitle = results.tidePage.title
      } else if (results.tidePage.type === 'node--publication_page') {
        // extra request for parent publication for download links
        const parentPublication = await context.app.$tide.getPageByPath(results.tidePage.publication_navigation_root.meta.url, { include: 'field_node_documents.field_media_file' })
        downloadLinks = context.app.$tideMapping.mappingFilters.fieldNodeDocuments(parentPublication.field_node_documents)
        publicationTitle = parentPublication.title
        if (results.tidePage.breadcrumbs && results.tidePage.breadcrumbs.length > 0) {
          const parentPublicationUrl = parentPublication.path.alias.split('/').filter(i => !i.includes('site-') && i !== '')[0]
          // Add publication root to breadcrumb
          if (!results.tidePage.breadcrumbs.includes(crumb => crumb.url === parentPublicationUrl)) {
            results.tidePage.breadcrumbs.splice(1, 0, { text: parentPublication.title, url: `/${parentPublicationUrl}` })
          }
        }
      }

      // add meta to page
      if (publicationTitle && typeof results.tidePage.head.meta !== 'undefined') {
        results.tidePage.head.meta.push({
          name: 'publication-title', content: publicationTitle
        })
      }

      // add download and print to sidebar
      if (downloadLinks) {
        results.tidePage.sidebarComponents.push({
          name: 'rpl-publication-download-print',
          order: 1,
          data: {
            showPrint: true,
            links: downloadLinks
          }
        })
      }

      // Publication menu.
      // Generate menu for Site Section Navigation component.
      const getMenuFromPublicationHierarchy = (menu) => {
        if (menu && menu.length > 0) {
          return menu.map(menuItem => {
            const elem = {
              text: menuItem.title,
              url: menuItem.url
            }
            if (menuItem.children) {
              elem.children = getMenuFromPublicationHierarchy(menuItem.children)
            }
            return elem
          })
        } else if (results.tidePage.type === 'node--publication' && results.tidePage.publication_children) {
          // parent page with pages but no chapters
          return results.tidePage.publication_children.map(item => {
            const menuItem = item.meta
            return {
              text: menuItem.title,
              url: menuItem.url
            }
          })
        }
      }
      if (results.tidePage.field_show_publication_nav) {
        // Define root publication id and title.
        let publicationRootId, publicationRootTitle
        switch (results.tidePage.type) {
          case 'node--publication':
            publicationRootId = results.tidePage.id
            publicationRootTitle = results.tidePage.title
            break
          case 'node--publication_page':
            if (results.tidePage.publication_navigation_root) {
              publicationRootId = results.tidePage.publication_navigation_root.meta.id
              publicationRootTitle = results.tidePage.publication_navigation_root.meta.title
            }
            break
        }

        if (publicationRootId) {
          // Get root publication data.
          const hierarchyJson = await context.app.$tide.get('node/publication', {}, `${publicationRootId}/hierarchy`)
          const hierarchyData = hierarchyJson.data.meta.hierarchy
          const menu = getMenuFromPublicationHierarchy(hierarchyData.children)

          // Add site section navigation to sidebar.
          if (menu) {
            results.tidePage.sidebarComponents.push({
              name: 'rpl-site-section-navigation',
              order: 2,
              data: {
                title: publicationRootTitle,
                menu,
                activeLink: context.route.path
              }
            })
          }
        }
      }
    } // Check tidePage

    return results
  }
}
