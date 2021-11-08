export default {
  sideBarLinks: async (context, pageData) => {
    if (pageData.tidePage && pageData.tidePage.field_side_bar_links) {
      const sideBarLinks = pageData.tidePage.field_side_bar_links

      if (sideBarLinks && sideBarLinks.length > 0) {
        for (let linkBlock of sideBarLinks) {
          if (linkBlock && linkBlock.field_paragraph_reference_links &&
            linkBlock.field_paragraph_reference_links.length > 0) {
            const links = linkBlock.field_paragraph_reference_links.filter(
              link => link.field_paragraph_link && link.field_paragraph_link.title).map(link => {
              return {
                text: link.field_paragraph_link.title,
                url: link.field_paragraph_link.url ? link.field_paragraph_link.url : link.field_paragraph_link.uri,
                desc: link.field_paragraph_short_desc
              }
            })

            if (links && links.length > 0) {
              if (!pageData.tidePage.sidebarComponents) {
                pageData.tidePage.sidebarComponents = []
              }
              pageData.tidePage.sidebarComponents.push({
                name: 'side-bar-links',
                order: 101,
                data: {
                  title: linkBlock.field_paragraph_title,
                  bgColour: linkBlock.field_paragraph_bg_colour,
                  links
                }
              })
            }
          }
        }
      }
    }
  }
}
