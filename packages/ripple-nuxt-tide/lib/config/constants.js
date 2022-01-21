// Store reusable constants
export const RPL_HEADER = {
  APP_TYPE: 'X-Sdp-App-Type',
  REQ_LOCATION: 'X-Sdp-Request-Location',
  CACHE_TAGS: 'section-cache-tags'
}

export const RPL_SOCIAL_LINK_MAPPING = [
  {
    provider_name: "Flickr",
    provider_url: "https://www.flickr.com/",
    provider_icon: "external_link",
    matcher_schemes: [
      "https://flickr.com/*",
      "https://*.flickr.com/*",
      "https://flic.kr/*"
    ]
  },
  {
    provider_name: "Twitter",
    provider_url: "http://www.twitter.com/",
    provider_icon: "twitter",
    matcher_schemes: [
      "https://twitter.com/*",
      "https://*.twitter.com/*"
    ]
  },
  {
    provider_name: "YouTube",
    provider_url: "https://www.youtube.com/",
    provider_icon: "youtube_channel",
    matcher_schemes: [
      "https://*.youtube.com/*",
      "https://youtube.com/*",
      "https://youtu.be/*"
    ]
  },
  {
    provider_name: "Email",
    provider_url: "",
    provider_icon: "email_solid",
    matcher_schemes: [
      "mailto:*"
    ]
  },
  {
    provider_name: "Facebook",
    provider_url: "https://www.facebook.com/",
    provider_icon: "facebook",
    matcher_schemes: [
      "https://www.facebook.com/*"
    ]
  },
  {
    provider_name: "Instagram",
    provider_url: "https://www.instagram.com/",
    provider_icon: "instagram",
    matcher_schemes: [
      "https://instagram.com/*",
      "https://www.instagram.com/*",
      "https://instagr.am/*",
      "https://www.instagr.am/*"
    ]
  },
  {
    provider_name: "LinkedIn",
    provider_url: "https://www.linkedin.com/",
    provider_icon: "linkedin",
    matcher_schemes: [
      "https://www.linkedin.com/*",
      "https://linkedin.com/*"
    ]
  },
  {
    provider_name: "Telephone",
    provider_url: "",
    provider_icon: "phone_number",
    matcher_schemes: [
      "tel:*"
    ]
  },
  {
    provider_name: "WhatsApp",
    provider_url: "https://www.whatsapp.com/",
    provider_icon: "whatsapp",
    matcher_schemes: [
      "https://api.whatsapp.com/send*",
      "https://wa.me/*"
    ]
  }
]
