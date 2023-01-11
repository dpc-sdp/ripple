import type { TideApiResponse } from '@dpc-sdp/ripple-tide-api/types'
import type {
  TideAddress,
  TideContact,
  TidePhone,
  TideSocialMediaLink
} from './sidebar-contacts-mapping-types'

const mapAddress = (rawAddress: any): TideAddress | null => {
  if (!rawAddress) {
    return null
  }

  return {
    countryCode: rawAddress.country_code,
    administrativeArea: rawAddress.administrative_area,
    locality: rawAddress.locality,
    postalCode: rawAddress.postal_code,
    addressLine1: rawAddress.address_line1,
    addressLine2: rawAddress.address_line2
  }
}

const mapPhone = (rawPhone: any): TidePhone => {
  return {
    id: rawPhone.id,
    title: rawPhone.field_paragraph_phone_title,
    number: rawPhone.field_paragraph_phone_number
  }
}

const mapSocialMedia = (rawSocial: any): TideSocialMediaLink => {
  return {
    id: rawSocial.id,
    type: rawSocial.field_paragraph_social_list,
    text: rawSocial.field_paragraph_link?.title,
    url: rawSocial.field_paragraph_link?.uri
  }
}

export const map = (src: TideApiResponse): TideContact[] => {
  if (!src.field_landing_page_show_contact || !src.field_landing_page_contact) {
    return []
  }

  return src.field_landing_page_contact.map((rawContact) => {
    return {
      id: rawContact.id,
      contactTitle: rawContact.field_paragraph_title,
      contactName: rawContact.field_paragraph_name,
      department: rawContact.field_paragraph_department_name,
      email: rawContact.field_paragraph_email,
      locationAddress: mapAddress(rawContact.field_paragraph_location),
      postalAddress: mapAddress(rawContact.field_paragraph_postal_address),
      phones: (rawContact.field_paragraph_phones || []).map((phone) =>
        mapPhone(phone)
      ),
      socialMedia: (rawContact.field_paragraph_social_media || []).map(
        (social) => mapSocialMedia(social)
      )
    }
  })
}

export const includes = [
  'field_landing_page_contact',
  'field_landing_page_contact.field_paragraph_phones',
  'field_landing_page_contact.field_paragraph_social_media'
]
