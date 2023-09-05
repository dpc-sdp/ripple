import { TideMenuItem } from '../../types'

export const getIconForUrl = (urlString: string) => {
  const trimmedUrl = (urlString || '').trim()

  if (trimmedUrl.startsWith('tel:')) {
    return 'icon-phone'
  }

  if (trimmedUrl.startsWith('mailto:')) {
    return 'icon-mail'
  }

  const url = new URL(trimmedUrl)
  const hostNormalised = url.host.replace('www.', '')

  switch (hostNormalised) {
    case 'facebook.com':
      return 'icon-facebook'
    case 'instagram.com':
    case 'instagr.am':
      return 'icon-instagram'
    case 'linkedin.com':
      return 'icon-linkedin'
    case 'twitter.com':
      return 'icon-twitter'
    case 'youtube.com':
      return 'icon-youtube'
    default:
      return 'icon-link-external-square-filled'
  }
}

interface RawLink {
  uri: string
  title: string
}

const processSiteSocialLinks = (rawLinks: RawLink[]): TideMenuItem[] => {
  return (rawLinks || []).map((link, i) => {
    console.log(getIconForUrl(link.uri))

    return {
      id: `social_link-${i}`,
      text: link.title,
      url: link.uri,
      icon: getIconForUrl(link.uri),
      iconColour: 'currentColor'
    }
  })
}

export default processSiteSocialLinks
