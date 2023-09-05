import { expect, describe, it } from '@jest/globals'
import processSiteSocialLinks, { getIconForUrl } from './processSiteSocialLinks'

// write jest unit tests for the getIconForUrl function
describe('getIconForUrl', () => {
  it('returns icon-phone when passed tel: link', () => {
    expect(getIconForUrl('tel:1234567890')).toBe('icon-phone')
  })

  it('returns icon-mail when passed mailto: link', () => {
    expect(getIconForUrl('mailto:test@test.com')).toBe('icon-mail')
  })

  it('returns icon-facebook when passed facebook.com link', () => {
    expect(getIconForUrl('https://www.facebook.com/')).toBe('icon-facebook')
    expect(getIconForUrl('https://facebook.com/')).toBe('icon-facebook')
  })

  it('returns icon-instagram when passed instagram.com link', () => {
    expect(getIconForUrl('https://www.instagram.com/')).toBe('icon-instagram')
    expect(getIconForUrl('https://instagram.com/')).toBe('icon-instagram')
    expect(getIconForUrl('https://instagr.am/')).toBe('icon-instagram')
  })

  it('returns icon-linkedin when passed linkedin.com link', () => {
    expect(getIconForUrl('https://www.linkedin.com/')).toBe('icon-linkedin')
    expect(getIconForUrl('https://linkedin.com/')).toBe('icon-linkedin')
  })

  it('returns icon-twitter when passed twitter.com link', () => {
    expect(getIconForUrl('https://www.twitter.com/')).toBe('icon-twitter')
    expect(getIconForUrl('https://twitter.com/')).toBe('icon-twitter')
  })

  it('returns icon-youtube when passed youtube.com link', () => {
    expect(getIconForUrl('https://www.youtube.com/')).toBe('icon-youtube')
    expect(getIconForUrl('https://youtube.com/')).toBe('icon-youtube')
  })

  it('returns icon-link-external-square-filled when passed any other link', () => {
    expect(getIconForUrl('https://www.google.com/')).toBe(
      'icon-link-external-square-filled'
    )
  })
})

// write jest unit tests for the processSiteSocialLinks function
describe('processSiteSocialLinks', () => {
  it('returns an array of objects with the correct properties', () => {
    const rawLinks = [
      {
        uri: 'tel:1234567890',
        title: 'Phone'
      },
      {
        uri: 'mailto:test@test.com',
        title: 'Email'
      },
      {
        uri: 'https://www.facebook.com/',
        title: 'Facebook'
      },
      {
        uri: 'https://www.instagram.com/',
        title: 'Instagram'
      },
      {
        uri: 'https://www.linkedin.com/',
        title: 'LinkedIn'
      },
      {
        uri: 'https://www.twitter.com/',
        title: 'Twitter'
      },
      {
        uri: 'https://www.youtube.com/',
        title: 'YouTube'
      },
      {
        uri: 'https://www.google.com/',
        title: 'Google'
      }
    ]

    const expected = [
      {
        id: 'social_link-0',
        text: 'Phone',
        url: 'tel:1234567890',
        icon: 'icon-phone',
        iconColour: 'currentColor'
      },
      {
        id: 'social_link-1',
        text: 'Email',
        url: 'mailto:test@test.com',
        icon: 'icon-mail',
        iconColour: 'currentColor'
      },
      {
        id: 'social_link-2',
        text: 'Facebook',
        url: 'https://www.facebook.com/',
        icon: 'icon-facebook',
        iconColour: 'currentColor'
      },
      {
        id: 'social_link-3',
        text: 'Instagram',
        url: 'https://www.instagram.com/',
        icon: 'icon-instagram',
        iconColour: 'currentColor'
      },
      {
        id: 'social_link-4',
        text: 'LinkedIn',
        url: 'https://www.linkedin.com/',
        icon: 'icon-linkedin',
        iconColour: 'currentColor'
      },
      {
        id: 'social_link-5',
        text: 'Twitter',
        url: 'https://www.twitter.com/',
        icon: 'icon-twitter',
        iconColour: 'currentColor'
      },
      {
        id: 'social_link-6',
        text: 'YouTube',
        url: 'https://www.youtube.com/',
        icon: 'icon-youtube',
        iconColour: 'currentColor'
      },
      {
        id: 'social_link-7',
        text: 'Google',
        url: 'https://www.google.com/',
        icon: 'icon-link-external-square-filled',
        iconColour: 'currentColor'
      }
    ]

    expect(processSiteSocialLinks(rawLinks)).toEqual(expected)
  })
})
