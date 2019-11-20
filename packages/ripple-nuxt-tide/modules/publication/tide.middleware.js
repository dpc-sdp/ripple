import { logger } from '@dpc-sdp/ripple-nuxt-tide/lib/core'

export default {
  publication: async (context, pageData) => {
    if (pageData.tidePage && ['node--publication', 'node--publication_page'].includes(pageData.tidePage.type)) {
      if (!pageData.tidePage.sidebarComponents || !Array.isArray(pageData.tidePage.sidebarComponents)) {
        pageData.tidePage.sidebarComponents = []
      }

      let downloadLinks = null
      let publicationTitle = null

      if (pageData.tidePage.type === 'node--publication') {
        downloadLinks = context.app.$tideMapping.mappingFilters.fieldNodeDocuments(pageData.tidePage.field_node_documents)
        publicationTitle = pageData.tidePage.title
      } else if (pageData.tidePage.type === 'node--publication_page') {
        // extra request for parent publication for download links
        const parentPublication = await context.app.$tide.getPageByPath(
          pageData.tidePage.publication_navigation_root.meta.url,
          { include: 'field_node_documents.field_media_file' },
          { requestId: pageData.requestId }
        )
        downloadLinks = context.app.$tideMapping.mappingFilters.fieldNodeDocuments(parentPublication.field_node_documents)
        publicationTitle = parentPublication.title
        if (pageData.tidePage.breadcrumbs && pageData.tidePage.breadcrumbs.length > 0) {
          const parentPublicationUrl = parentPublication.path.alias.split('/').filter(i => !i.includes('site-') && i !== '')[0]
          // Add publication root to breadcrumb
          if (!pageData.tidePage.breadcrumbs.includes(crumb => crumb.url === parentPublicationUrl)) {
            pageData.tidePage.breadcrumbs.splice(1, 0, { text: parentPublication.title, url: `/${parentPublicationUrl}` })
          }
        }
      }

      // add meta to page
      if (publicationTitle && typeof pageData.tidePage.head.meta !== 'undefined') {
        pageData.tidePage.head.meta.push({
          name: 'publication-title', content: publicationTitle
        })
      }
      // add download and print to sidebar
      if (downloadLinks) {
        pageData.tidePage.sidebarComponents.push({
          name: 'rpl-publication-download-print',
          order: 1,
          data: {
            printLink: {
              href: `/${context.route.path.split('/')[1]}/print-all`,
              text: 'Print full document'
            },
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
        } else if (pageData.tidePage.type === 'node--publication' && pageData.tidePage.publication_children) {
          // parent page with pages but no chapters
          return pageData.tidePage.publication_children.map(item => {
            const menuItem = item.meta
            return {
              text: menuItem.title,
              url: menuItem.url
            }
          })
        }
      }
      if (pageData.tidePage.field_show_publication_nav) {
        // Define root publication id and title.
        let publicationRootId, publicationRootTitle
        switch (pageData.tidePage.type) {
          case 'node--publication':
            publicationRootId = pageData.tidePage.id
            publicationRootTitle = pageData.tidePage.title
            break
          case 'node--publication_page':
            if (pageData.tidePage.publication_navigation_root) {
              publicationRootId = pageData.tidePage.publication_navigation_root.meta.id
              publicationRootTitle = pageData.tidePage.publication_navigation_root.meta.title
            }
            break
        }

        if (publicationRootId) {
          // Get root publication data.
          try {
            const hierarchyJson = await context.app.$tide.get('node/publication', {}, `${publicationRootId}/hierarchy`)
            const hierarchyData = hierarchyJson.data.meta.hierarchy
            const menu = getMenuFromPublicationHierarchy(hierarchyData.children)

            // Add site section navigation to sidebar.
            if (menu) {
              pageData.tidePage.sidebarComponents.push({
                name: 'rpl-site-section-navigation',
                order: 2,
                data: {
                  title: publicationRootTitle,
                  menu,
                  activeLink: context.route.path
                }
              })
            }
          } catch (error) {
            logger.error('Failed to get publication menu.', { error, label: 'Publication' })
          }
        }
      }
    } // Check tidePage
  }
}
