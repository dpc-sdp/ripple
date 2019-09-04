// Filters for adding extra process on a mapping value
import { getMimeType, getFormattedSize } from './tide-helper'
// Create more filters if need.
export default {
  paragraphKeyJourneyLinks: function (fieldParagraphLinks) {
    if (typeof fieldParagraphLinks !== 'undefined' && fieldParagraphLinks !== null) {
      let rtn = []
      fieldParagraphLinks.forEach(item => {
        rtn.push({
          url: item.url || item.uri,
          text: item.title
        })
      })
      return rtn
    }
  },

  paragraphCta: (fieldParagraphCta) => {
    let link

    if (!fieldParagraphCta) {
      // CTA field is optional in Tide, so it may be null
      link = null
    } else {
      link = {
        text: fieldParagraphCta.title,
        url: fieldParagraphCta.url || fieldParagraphCta.uri
      }
    }

    return link
  },

  paragraphLink: (fieldParagraphLink) => {
    return (fieldParagraphLink === null) ? null : {
      text: fieldParagraphLink.title,
      url: fieldParagraphLink.url || fieldParagraphLink.uri
    }
  },

  fieldMediaImage: (fieldMediaImage) => {
    if (fieldMediaImage && fieldMediaImage.url) {
      const alt = fieldMediaImage.meta && fieldMediaImage.meta.alt.length > 0 ? fieldMediaImage.meta.alt : ''
      return {
        src: fieldMediaImage.url,
        alt
      }
    }
  },

  paragraphLocation: (fieldparagraphLocation) => {
    // Location is optional in Tide, can be null
    if (fieldparagraphLocation === null) {
      return ''
    }

    const l = fieldparagraphLocation
    l.al2 = l.address_line2 ? l.address_line2 + ',' : ''
    const address = `${l.address_line1 ? l.address_line1 + ',' : ''} ${l.al2} ${l.locality}${l.al2 || l.locality ? ', ' : ''}${l.administrative_area} ${l.postal_code}`
    if (address.length > 3) {
      return address
    }
    return ''
  },

  embeddedVideo: (fieldBlockEmbeddedVideo) => {
    if (fieldBlockEmbeddedVideo === null) {
      return null
    }

    return {
      src: fieldBlockEmbeddedVideo.field_media_video_embed_field,
      mediaLink: fieldBlockEmbeddedVideo.field_media_transcript ? {
        text: fieldBlockEmbeddedVideo.field_media_link,
        url: `/media/${fieldBlockEmbeddedVideo.drupal_internal__mid}`
      } : null
    }
  },

  paragraphPhones: (fieldparagraphPhones) => {
    // Phone is optional in Tide, can be null.
    if (fieldparagraphPhones === null) {
      return []
    }
    return fieldparagraphPhones.map(p => ({
      title: p.field_paragraph_phone_title,
      number: p.field_paragraph_phone_number
    }))
  },
  paragraphSocial: (fieldparagraphSocials) => {
    // Social links are optional in Tide.
    if (fieldparagraphSocials === null) {
      return ''
    }

    const ss = fieldparagraphSocials
    const socials = []
    for (let s of ss) {
      // If no social service, link or a single link value is set return.
      if (s.field_paragraph_social_list && s.field_paragraph_link) {
        if (!s.field_paragraph_link.title || !s.field_paragraph_link.uri) {
          continue
        } else {
          const service = {
            icon: s.field_paragraph_social_list,
            title: s.field_paragraph_link.title,
            url: s.field_paragraph_link.uri
          }
          socials.push(service)
        }
      }
    }
    return socials
  },
  fieldNodeDocuments: (fieldNodeDocuments) => {
    if (!fieldNodeDocuments) {
      return false
    }
    return fieldNodeDocuments.map(doc => {
      return {
        name: doc.name,
        url: doc.field_media_file.url || doc.field_media_file.uri,
        extension: getMimeType(doc.field_media_file.filemime),
        filesize: getFormattedSize(doc.field_media_file.filesize),
        id: doc.id
      }
    })
  },
  campaignCaption: (fieldCampaign) => {
    const hasImage = fieldCampaign.field_block_image
    const hasCaption = fieldCampaign.field_show_c_primary_caption
    return (hasCaption && hasImage) ? fieldCampaign.field_block_image.field_media_caption : null
  }
}
