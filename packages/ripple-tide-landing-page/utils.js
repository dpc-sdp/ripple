import { fieldMappingUtils } from '@dpc-sdp/ripple-tide-api'
import headerComponentMapping from './mapping/header.js'
import bodyComponentMapping from './mapping/body.js'

const {
  getLinkFromField,
  getField,
  getLandingPageComponents,
  getAddress
} = fieldMappingUtils

export const getBodyComponents = async function (src) {
  return await getLandingPageComponents(
    src,
    'field_landing_page_component',
    bodyComponentMapping,
    this
  )
}

export const getHeaderComponents = async src => {
  const components = []
  const headerComponents = await getLandingPageComponents(
    src,
    'field_landing_page_header',
    headerComponentMapping,
    this
  )
  if (headerComponents.length > 0) {
    components.push(...headerComponents)
  }
  // campaign primary
  if (src.field_landing_page_c_primary) {
    const campaignPrimary = headerComponentMapping[
      'block_content--campaign'
    ]?.call(this, src.field_landing_page_c_primary)
    components.push(campaignPrimary)
  }
  return components
}

export const getSideBarComponents = src => {
  const sidebar = []
  if (src.field_show_related_content) {
    sidebar.push({
      component: 'rpl-related-links',
      props: {
        title: 'Related links',
        links: src.field_related_links?.map(field =>
          getLinkFromField(field, 'field_paragraph_link')
        )
      }
    })
  }
  if (src.field_show_whats_next) {
    sidebar.push({
      component: 'rpl-whats-next',
      props: {
        title: "What's next?",
        links: src.field_whats_next?.map(field =>
          getLinkFromField(field, 'field_paragraph_link')
        )
      }
    })
  }
  if (src.field_landing_page_show_contact) {
    const contact = src.field_landing_page_show_contact?.[0]
    const location = getField(contact, 'field_paragraph_location', {})
    sidebar.push({
      component: 'rpl-contact',
      props: {
        title: getField(contact, 'field_paragraph_title', ''),
        name: getField(contact, 'field_paragraph_name', ''),
        department: getField(contact, 'field_paragraph_department_name', ''),
        postal: location.postal_code,
        address: getAddress(location),
        phone: getField(contact, 'field_paragraph_phones', []).map(
          p => p.number
        )
      }
    })
  }
  if (src.field_show_social_sharing) {
    sidebar.push({
      component: 'rpl-share-this',
      props: {
        title: 'Share this page',
        url: ''
      }
    })
  }

  return sidebar
}
