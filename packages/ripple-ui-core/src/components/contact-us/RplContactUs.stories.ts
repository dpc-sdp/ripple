import type { Meta, StoryObj } from '@storybook/vue3'
import RplContactUs from './RplContactUs.vue'

export default {
  title: 'Core/Containers/Contact us',
  component: RplContactUs
} satisfies Meta<typeof RplContactUs>

type Story = StoryObj<typeof RplContactUs>

export const ContactUs: Story = {
  args: {
    address: {
      name: 'First Name Last Name',
      department: 'Department Name',
      street: 'Address Line, Suburb, 3019'
    },
    items: [
      {
        text: '99 Street St, Suburb VIC 3000',
        url: 'googlemaps',
        icon: 'icon-pin'
      },
      { text: '03 9999 9999', url: 'tel:0399999999', icon: 'icon-phone' },
      { text: '0400 000 000', url: 'tel:0400000000', icon: 'icon-phone' },
      { text: 'email@vic.gov.au', url: 'mailto:email', icon: 'icon-mail' },
      {
        text: '@facebookhandle',
        url: 'https://www.facebook.com/',
        icon: 'icon-facebook'
      },
      { text: '@xhandle', url: 'https://x.com/', icon: 'icon-x' },
      {
        text: '@linkedinhandle',
        url: 'https://au.linkedin.com/',
        icon: 'icon-linkedin'
      },
      {
        text: '@instagramhandle',
        url: 'https://www.instagram.com/',
        icon: 'icon-instagram'
      },
      {
        text: '@legacytwitterhandle',
        url: 'https://twitter.com',
        icon: 'icon-twitter'
      },
      { text: '', url: '', icon: 'icon-browser' }
    ]
  }
}

export const ContactUsWithSlot: Story = {
  name: 'Contact us/With slot',
  args: {
    default: 'This is extra content added in the default slot.',
    address: {
      department: 'Department Name',
      street: 'Address Line, Suburb, 3019'
    },
    items: [
      {
        text: '99 Street St, Suburb VIC 3000',
        url: 'googlemaps',
        icon: 'icon-pin'
      },
      { text: '03 9999 9999', url: 'tel:0399999999', icon: 'icon-phone' },
      { text: 'email@vic.gov.au', url: 'mailto:email', icon: 'icon-mail' }
    ]
  }
}
